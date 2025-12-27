import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = 'BLAZE Wallet <info@blazewallet.io>';

// Base email template
function baseTemplate(content: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #0f172a, #1e293b); padding: 40px 20px; text-align: center; }
        .logo { font-size: 32px; font-weight: bold; color: white; }
        .logo span { background: linear-gradient(135deg, #f97316, #eab308); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .content { background: white; padding: 40px; }
        h1 { color: #1e293b; font-size: 28px; margin: 0 0 16px; }
        p { color: #475569; font-size: 16px; margin: 0 0 16px; }
        .highlight { background: linear-gradient(135deg, #fff7ed, #fef3c7); padding: 24px; border-radius: 12px; margin: 24px 0; border-left: 4px solid #f97316; }
        .stat-box { background: #f8fafc; padding: 24px; border-radius: 12px; text-align: center; margin: 24px 0; }
        .stat-number { font-size: 48px; font-weight: bold; color: #f97316; }
        .stat-label { font-size: 14px; color: #64748b; margin-top: 8px; }
        .btn { display: inline-block; background: linear-gradient(135deg, #f97316, #eab308); color: white; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; margin: 16px 0; }
        .tier-badge { display: inline-block; padding: 8px 16px; background: linear-gradient(135deg, #f97316, #eab308); color: white; border-radius: 20px; font-weight: 600; font-size: 14px; }
        .urgency { background: #fef2f2; padding: 16px; border-radius: 12px; border-left: 4px solid #ef4444; margin: 24px 0; }
        .footer { text-align: center; padding: 24px; color: #94a3b8; font-size: 12px; }
        .divider { border-top: 1px solid #e2e8f0; margin: 24px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🔥 <span>BLAZE</span></div>
        </div>
        <div class="content">
          ${content}
        </div>
        <div class="footer">
          <p>© 2025 BLAZE Wallet. Stavangerweg 13, Groningen, Netherlands</p>
          <p>KvK: 88929280</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

const TIER_NAMES: Record<number, string> = {
  1: 'Founders',
  2: 'Early Birds',
  3: 'Pioneers',
  4: 'Adopters',
  5: 'Supporters',
  6: 'Public',
};

const TIER_BONUSES: Record<number, number> = {
  1: 100,
  2: 75,
  3: 50,
  4: 30,
  5: 15,
  6: 0,
};

// POST: Send reminder email to a specific commitment
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { commitmentId } = body;

    if (!commitmentId) {
      return NextResponse.json({ error: 'Commitment ID is required' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Get commitment details
    const { data: commitment, error: commitmentError } = await supabase
      .from('commitments')
      .select('*')
      .eq('id', commitmentId)
      .single();

    if (commitmentError || !commitment) {
      return NextResponse.json({ error: 'Commitment not found' }, { status: 404 });
    }

    // Get current commitment count to determine current tier status
    const { count: currentCommitmentCount } = await supabase
      .from('commitments')
      .select('*', { count: 'exact', head: true });

    const tierName = TIER_NAMES[commitment.commitment_tier] || 'Early Bird';
    const bonusPercentage = TIER_BONUSES[commitment.commitment_tier] || 0;

    // Send reminder email
    await resend.emails.send({
      from: FROM_EMAIL,
      to: commitment.email,
      subject: '⏰ Reminder: Your BLAZE Purchase Intent',
      html: baseTemplate(`
        <h1>Don't Miss Your Spot! ⏰</h1>
        <p>Hi there! We noticed you registered your interest to purchase BLAZE tokens. We wanted to remind you that your spot is reserved, but the presale is approaching fast!</p>
        
        <div class="stat-box">
          <div class="tier-badge">${tierName} Tier</div>
          <div class="stat-number" style="margin-top: 16px;">$${commitment.intended_amount_usd?.toLocaleString()}</div>
          <div class="stat-label">Your registered investment intent</div>
        </div>

        <div class="highlight">
          <h3>Your Reserved Allocation:</h3>
          <p style="margin: 0;">
            <strong>${Math.round(commitment.intended_amount_tokens || 0).toLocaleString()} BLAZE</strong> tokens<br>
            <span style="color: #059669;">Including ${bonusPercentage}% bonus!</span>
          </p>
        </div>

        <div class="urgency">
          <p style="margin: 0; color: #b91c1c;">
            <strong>⚠️ Current tier status:</strong> ${currentCommitmentCount} commitments registered. 
            Early tiers are filling up fast!
          </p>
        </div>

        <p>Remember, this is just a commitment - you only pay when the presale goes live. But registering your intent ensures you get:</p>
        <ul>
          <li>✅ Priority access when presale opens</li>
          <li>✅ Reserved allocation at your tier</li>
          <li>✅ 48-hour advance notification</li>
          <li>✅ Payment instructions sent directly</li>
        </ul>

        <center>
          <a href="https://www.blazewallet.io/presale" class="btn">View Your Commitment</a>
        </center>

        <div class="divider"></div>

        <p style="font-size: 14px; color: #64748b;">
          Need to update your commitment? Simply visit the presale page and submit a new intent - it will automatically update your existing registration.
        </p>
      `),
    });

    // Update reminder_sent flag
    await supabase
      .from('commitments')
      .update({ reminder_sent: true })
      .eq('id', commitmentId);

    // Log the email send
    await supabase.from('email_sends').insert({
      email: commitment.email,
      template_key: 'commitment_reminder',
      status: 'sent',
    });

    return NextResponse.json({ success: true, email: commitment.email });
  } catch (error) {
    console.error('Error sending reminder:', error);
    return NextResponse.json({ error: 'Failed to send reminder' }, { status: 500 });
  }
}

