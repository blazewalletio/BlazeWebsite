import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import { buildBlazeSystemPrompt, type PricingTierForChat } from '@/lib/chat-context';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Lazy initialization to avoid build errors
let openai: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!openai) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openai;
}

function createServiceRoleClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function parsePresaleDateFromSettings(value: unknown) {
  if (typeof value !== 'string') return null;
  let raw = value;
  try {
    const parsed = JSON.parse(value);
    if (typeof parsed === 'string') raw = parsed;
  } catch {
    // ignore
  }
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

async function getChatDynamicContext() {
  try {
    const supabase = createServiceRoleClient();

    const [{ data: settingsRow }, { data: tiers }, { count: buyerCount }] = await Promise.all([
      supabase.from('site_settings').select('value').eq('key', 'presale_date').maybeSingle(),
      supabase.from('pricing_tiers').select('*').order('tier_number'),
      supabase
        .from('presale_buyers')
        .select('*', { count: 'exact', head: true })
        .in('status', ['confirmed', 'completed']),
    ]);

    return {
      presaleDateIso: parsePresaleDateFromSettings(settingsRow?.value),
      pricingTiers: (tiers || []) as PricingTierForChat[],
      buyerCount: buyerCount ?? null,
    };
  } catch {
    return { presaleDateIso: null, pricingTiers: null, buyerCount: null };
  }
}

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 10;

  const record = rateLimitMap.get(ip);
  
  if (!record || now - record.timestamp > windowMs) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }
  
  if (record.count >= maxRequests) {
    return false;
  }
  
  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment and try again.' },
        { status: 429 }
      );
    }

    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages are required' },
        { status: 400 }
      );
    }

    // Limit conversation history to last 10 messages
    const recentMessages = messages.slice(-10);

    const dynamicContext = await getChatDynamicContext();
    const systemPrompt = buildBlazeSystemPrompt(dynamicContext);

    // Create completion with streaming
    const response = await getOpenAI().chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...recentMessages,
      ],
      max_tokens: 500,
      temperature: 0.7,
      stream: true,
    });

    // Create a streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: any) {
    console.error('Chat API error:', JSON.stringify(error, null, 2));
    
    const errorMessage = error?.error?.message || error?.message || 'Unknown error';
    const errorCode = error?.error?.code || error?.code || '';
    
    // Check if API key is missing
    if (errorMessage.includes('API key')) {
      return NextResponse.json(
        { error: 'Chat service not configured.' },
        { status: 503 }
      );
    }
    
    // Handle insufficient quota (no credits)
    if (errorCode === 'insufficient_quota' || errorMessage.includes('quota')) {
      return NextResponse.json(
        { error: 'Chat service temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    // Handle rate limit
    if (error?.status === 429 || errorCode === 'rate_limit_exceeded') {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

