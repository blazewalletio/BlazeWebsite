import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { Resend } from 'resend';
import { generateWalletStyleEmailShell } from '@/lib/email-shell';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = 'BLAZE Wallet <info@blazewallet.io>';

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
      html: generateWalletStyleEmailShell({
        title: 'BLAZE Wallet',
        content: `
        <h1>Don't Miss Your Spot! ⏰</h1>
        <p>Hi there! We noticed you registered your interest to purchase BLAZE tokens. We wanted to remind you that your spot is reserved, but the presale is approaching fast!</p>
        
        <div class="stat-box">
          <div class="tier-badge">${tierName} Tier</div>
          <div class="stat-number mt-16">$${commitment.intended_amount_usd?.toLocaleString()}</div>
          <div class="stat-label">Your registered investment intent</div>
        </div>

        <div class="highlight">
          <h3>Your Reserved Allocation:</h3>
          <p class="mb-0">
            <strong>${Math.round(commitment.intended_amount_tokens || 0).toLocaleString()} BLAZE</strong> tokens<br>
            <span class="text-success">Including ${bonusPercentage}% bonus!</span>
          </p>
        </div>

        <div class="urgency">
          <p class="mb-0 text-danger">
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

        <p class="text-muted">
          Need to update your commitment? Simply visit the presale page and submit a new intent - it will automatically update your existing registration.
        </p>
      `,
      }),
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


