import { Resend } from 'resend';
import { generateWalletStyleEmailShell } from '@/lib/email-shell';
import { PRESALE_CONSTANTS } from '@/lib/presale-constants';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = 'BLAZE Wallet <info@blazewallet.io>';

function baseTemplate(content: string) {
  return generateWalletStyleEmailShell({
    content,
    title: 'BLAZE Wallet',
  });
}

// Admin notification for new signup
export async function sendNewSignupNotification(email: string, source: string, referralCode?: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: 'info@blazewallet.io',
      subject: '🔥 New Waitlist Signup!',
      html: baseTemplate(`
        <h1>New Signup! 🎉</h1>
        <div class="highlight">
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Source:</strong> ${source}</p>
          ${referralCode ? `<p><strong>Referred by:</strong> ${referralCode}</p>` : ''}
          <p><strong>Time:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'Europe/Amsterdam' })}</p>
        </div>
        <center>
          <a href="https://www.blazewallet.io/admin/waitlist" class="btn">View in Admin</a>
        </center>
      `),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send notification email:', error);
    return { success: false, error };
  }
}

// Welcome email for new waitlist signups
export async function sendWelcomeEmail(email: string, referralCode: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: '🔥 Welcome to the BLAZE Waitlist!',
      html: baseTemplate(`
        <h1>You're on the list! 🎉</h1>
        <p>Thanks for joining the BLAZE Wallet waitlist. You'll be among the first to know when our presale goes live.</p>
        
        <div class="highlight">
          <h3>What you'll get:</h3>
          <p class="mb-0">
            ✨ Presale opportunity at <strong>$0.008333</strong> (58% off $0.02 launch price) + bonus tokens<br>
            ⚡ Registering intent unlocks a <strong>48-hour early-access window</strong> before public launch<br>
            🔔 Exclusive updates and announcements<br>
            🎁 Special bonuses for early supporters
          </p>
        </div>

        <div class="referral-box">
          <p class="font-semibold">Share & earn rewards!</p>
          <div class="referral-code">${referralCode}</div>
          <p class="referral-link">Your link: https://www.blazewallet.io?ref=${referralCode}</p>
          <p class="text-muted mt-12">
            Invite friends and climb the leaderboard. Top referrers get up to 100,000 bonus tokens!
          </p>
        </div>

        <center>
          <a href="https://www.blazewallet.io" class="btn">Visit BLAZE Wallet</a>
        </center>
      `),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return { success: false, error };
  }
}

// Commitment confirmation email
export async function sendCommitmentConfirmation({
  email,
  amountUsd,
  estimatedTokens,
  bonusPercentage,
  tierName,
}: {
  email: string;
  amountUsd: number;
  estimatedTokens: number;
  bonusPercentage: number;
  tierName: string;
}) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: '✅ Your BLAZE Presale Intent is Confirmed',
      html: baseTemplate(`
        <h1>Intent Registered! 🎯</h1>
        <p>Great news! We've recorded your presale intent for BLAZE.</p>

        <div class="highlight">
          <h3>Important next step</h3>
          <p class="mb-0">
            To participate when the presale opens, please make sure you have a BLAZE Wallet account ready:
            <br>
            <a href="https://my.blazewallet.io" target="_blank" rel="noopener noreferrer">my.blazewallet.io</a>
          </p>
        </div>
        
        <div class="stat-box">
          <div class="tier-badge">${tierName} Tier</div>
          <div class="stat-number mt-16">$${amountUsd.toLocaleString()}</div>
          <div class="stat-label">Your intended investment</div>
        </div>

        <div class="highlight">
          <h3>Estimated Token Allocation:</h3>
          <p class="mb-0">
            <strong>${estimatedTokens.toLocaleString()} BLAZE</strong> tokens<br>
            <span class="text-success">Including ${bonusPercentage}% early bird bonus!</span>
          </p>
        </div>

        <p>This is not a payment. It is your commitment to participate. You&apos;ll get a 48-hour early-access window before public launch, plus reminder emails with payment instructions.</p>

        <div class="divider"></div>

        <h2>What happens next?</h2>
        <ul>
          <li>📧 You'll receive a short follow-up sequence to help you prepare</li>
          <li>⏰ We'll send reminders as we get closer to launch (48h, 24h, and more)</li>
          <li>👛 Make sure you can log into your BLAZE Wallet account (my.blazewallet.io)</li>
          <li>💰 Payment is only required when the presale goes live</li>
        </ul>

        <center>
          <a href="https://www.blazewallet.io" class="btn">View Presale Details</a>
          <br>
          <a href="https://t.me/ai4ldMZv0KgyN2Y8" class="btn btn-secondary mt-8">Join Telegram for updates</a>
        </center>
      `),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send commitment confirmation:', error);
    return { success: false, error };
  }
}

// =====================================================
// COMMITMENT (INTENT) FOLLOW-UP FLOW
// =====================================================

export async function sendCommitmentDay2ReadinessEmail(email: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Your 3-minute presale readiness checklist',
      html: baseTemplate(`
        <h1>Get Ready for Presale ✅</h1>
        <p>Quick checklist so you can move fast when your 48-hour early-access window opens.</p>

        <div class="highlight">
          <h3>1) Create your BLAZE Wallet account</h3>
          <p class="mb-0">
            You&apos;ll need a BLAZE Wallet account to participate:
            <br>
            <a href="https://my.blazewallet.io" target="_blank" rel="noopener noreferrer">my.blazewallet.io</a>
          </p>
        </div>

        <div class="highlight">
          <h3>2) Save the official links</h3>
          <p class="mb-0">
            Website: <a href="https://www.blazewallet.io" target="_blank" rel="noopener noreferrer">blazewallet.io</a><br>
            App: <a href="https://my.blazewallet.io" target="_blank" rel="noopener noreferrer">my.blazewallet.io</a>
          </p>
        </div>

        <div class="highlight">
          <h3>3) Security reminder</h3>
          <p class="mb-0">
            We will never ask for your seed phrase. Be careful with fake links and impersonators.
          </p>
        </div>

        <center>
          <a href="https://my.blazewallet.io" class="btn">Open BLAZE Wallet</a>
          <br>
          <a href="https://t.me/ai4ldMZv0KgyN2Y8" class="btn btn-secondary mt-8">Join Telegram</a>
        </center>
      `),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send commitment day2 readiness email:', error);
    return { success: false, error };
  }
}

export async function sendCommitmentDay5WhyBlazeEmail(email: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Why BLAZE? A quick overview of what you’re backing',
      html: baseTemplate(`
        <h1>Why BLAZE 🔥</h1>
        <p>You registered a presale intent because you see potential. Here&apos;s the short version of what we&apos;re building.</p>

        <div class="highlight">
          <h3>What makes BLAZE different</h3>
          <ul class="list-compact">
            <li><strong>QuickPay:</strong> fast payments by scanning a QR code</li>
            <li><strong>AI scam protection:</strong> warnings before you sign risky transactions</li>
            <li><strong>Multi-chain:</strong> manage assets across major networks</li>
            <li><strong>Non-custodial:</strong> your keys stay yours</li>
          </ul>
        </div>

        <p>We&apos;ll send clear instructions before your 48-hour early-access window opens so you can participate without stress.</p>

        <center>
          <a href="https://www.blazewallet.io/whitepaper" class="btn">Read the Whitepaper</a>
        </center>
      `),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send commitment day5 why blaze email:', error);
    return { success: false, error };
  }
}

export async function sendCommitmentDay7SecurityEmail(email: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Stay safe: official links and presale security tips',
      html: baseTemplate(`
        <h1>Presale Security Checklist 🔒</h1>
        <p>Presales attract impersonators. Here&apos;s how to stay safe.</p>

        <div class="highlight">
          <h3>Golden rules</h3>
          <ul class="list-compact">
            <li>We will never DM you first.</li>
            <li>We will never ask for your seed phrase or private keys.</li>
            <li>Only use official links.</li>
          </ul>
        </div>

        <div class="highlight">
          <h3>Official links</h3>
          <p class="mb-0">
            Website: <a href="https://www.blazewallet.io" target="_blank" rel="noopener noreferrer">https://www.blazewallet.io</a><br>
            Wallet: <a href="https://my.blazewallet.io" target="_blank" rel="noopener noreferrer">https://my.blazewallet.io</a><br>
            Telegram: <a href="https://t.me/ai4ldMZv0KgyN2Y8" target="_blank" rel="noopener noreferrer">https://t.me/ai4ldMZv0KgyN2Y8</a><br>
            X: <a href="https://x.com/blazewallet_io" target="_blank" rel="noopener noreferrer">https://x.com/blazewallet_io</a>
          </p>
        </div>

        <center>
          <a href="https://t.me/ai4ldMZv0KgyN2Y8" class="btn btn-secondary">Join Telegram</a>
        </center>
      `),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send commitment day7 security email:', error);
    return { success: false, error };
  }
}

export async function sendCommitmentDay10TierEmail(email: string, details: { tierNumber: number; amountUsd: number; estimatedTokens: number }) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Your intent details: tier and estimated allocation (clear breakdown)',
      html: baseTemplate(`
        <h1>Your Presale Intent Details 🎯</h1>
        <p>Here&apos;s a clear summary of what you registered, so you can keep it for reference.</p>

        <div class="stat-box">
          <div class="tier-badge">Tier ${details.tierNumber}</div>
          <div class="stat-number mt-16">$${details.amountUsd.toLocaleString()}</div>
          <div class="stat-label">Intended amount</div>
        </div>

        <div class="highlight">
          <h3>Estimated allocation</h3>
          <p class="mb-0"><strong>${details.estimatedTokens.toLocaleString()} BLAZE</strong> (estimate)</p>
        </div>

        <center>
          <a href="https://www.blazewallet.io/#tokenomics" class="btn">Review Tokenomics</a>
        </center>
      `),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send commitment day10 tier email:', error);
    return { success: false, error };
  }
}

export async function sendCommitmentDay13PaymentPrepEmail(email: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Quick prep: make launch day stress-free',
      html: baseTemplate(`
        <h1>Launch Day Prep ⚡</h1>
        <p>A little preparation now makes it much easier to participate when your 48-hour early-access window opens.</p>

        <div class="highlight">
          <h3>Make sure you can sign in</h3>
          <p class="mb-0">
            Confirm you can log into your BLAZE Wallet account:
            <br>
            <a href="https://my.blazewallet.io" target="_blank" rel="noopener noreferrer">my.blazewallet.io</a>
          </p>
        </div>

        <div class="highlight">
          <h3>Have your preferred payment ready</h3>
          <p class="mb-0">
            We&apos;ll share final step-by-step instructions closer to launch. Being prepared helps you move quickly.
          </p>
        </div>

        <center>
          <a href="https://my.blazewallet.io" class="btn">Open BLAZE Wallet</a>
        </center>
      `),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send commitment day13 payment prep email:', error);
    return { success: false, error };
  }
}

export async function sendCommitmentDay18HowPresaleWorksEmail(email: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'How the presale will work (simple explanation)',
      html: baseTemplate(`
        <h1>How the Presale Works 📘</h1>
        <p>Here&apos;s a simple overview of how you&apos;ll participate during your 48-hour early-access window.</p>

        <div class="highlight">
          <h3>Step 1: Have a BLAZE Wallet account</h3>
          <p class="mb-0">
            The presale will be executed through your BLAZE Wallet account.
            Please make sure your account is ready at:
            <br>
            <a href="https://my.blazewallet.io" target="_blank" rel="noopener noreferrer">my.blazewallet.io</a>
          </p>
        </div>

        <div class="highlight">
          <h3>Step 2: Purchase in your early-access window</h3>
          <p class="mb-0">
            During your 48-hour early-access window, you&apos;ll be able to purchase BLAZE tokens using ETH, BTC, USDT, and via BSC.
            You&apos;ll receive clear step-by-step instructions in the final countdown emails.
          </p>
        </div>

        <div class="highlight">
          <h3>Safety reminder</h3>
          <p class="mb-0">
            We will never ask for your seed phrase. Only use official links and announcements.
          </p>
        </div>

        <center>
          <a href="https://my.blazewallet.io" class="btn">Open BLAZE Wallet</a>
          <br>
          <a href="https://t.me/ai4ldMZv0KgyN2Y8" class="btn btn-secondary mt-8">Join Telegram for updates</a>
        </center>
      `),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send commitment day18 how presale works email:', error);
    return { success: false, error };
  }
}

export async function sendCommitmentCountdownEmail(
  email: string,
  hoursLabel: string,
  primaryCtaLabel: string
) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `⏰ Presale reminder: ${hoursLabel}`,
      html: baseTemplate(`
        <h1>Presale Reminder ⏰</h1>
        <p>${hoursLabel} until your early-access window opens.</p>

        <div class="highlight">
          <h3>Be ready</h3>
          <ul class="list-compact">
            <li>Log into your BLAZE Wallet account</li>
            <li>Use only official links</li>
            <li>Watch Telegram for status updates</li>
          </ul>
        </div>

        <center>
          <a href="https://my.blazewallet.io" class="btn">${primaryCtaLabel}</a>
          <br>
          <a href="https://t.me/ai4ldMZv0KgyN2Y8" class="btn btn-secondary mt-8">Join Telegram</a>
        </center>
      `),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send commitment countdown email:', error);
    return { success: false, error };
  }
}

export async function sendCommitmentLiveEmail(email: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: '🚀 Your early-access window is LIVE: open BLAZE Wallet to purchase',
      html: baseTemplate(`
        <h1>Your Early Access is LIVE 🚀</h1>
        <p>Your intent is recorded. You can now participate before the public presale opens.</p>

        <div class="highlight">
          <h3>Open BLAZE Wallet</h3>
          <p class="mb-0">
            Use your BLAZE Wallet account to purchase.
            <br>
            <a href="https://my.blazewallet.io" target="_blank" rel="noopener noreferrer">my.blazewallet.io</a>
          </p>
        </div>

        <center>
          <a href="https://my.blazewallet.io" class="btn">Open BLAZE Wallet</a>
          <br>
          <a href="https://t.me/ai4ldMZv0KgyN2Y8" class="btn btn-secondary mt-8">Telegram status updates</a>
        </center>
      `),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send commitment live email:', error);
    return { success: false, error };
  }
}

// Presale tomorrow announcement – send now to waitlist (broadcast). Same style as other emails.
export async function sendPresaleTomorrowEmail(
  email: string,
  referralCode: string,
  presaleDate: Date
) {
  const dateLabel = presaleDate.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: '🚀 Tomorrow 12:00 UTC: The BLAZE presale goes live',
      html: baseTemplate(`
        <h1>It's almost time 🔥</h1>
        <p>After all the waiting, the BLAZE presale goes live tomorrow.</p>

        <div class="stat-box">
          <div class="tier-badge">Presale start</div>
          <div class="stat-number mt-16">${dateLabel}</div>
          <div class="stat-label">12:00 UTC</div>
        </div>

        <div class="highlight">
          <h3>What you get</h3>
          <p class="mb-0">
            <strong>$${PRESALE_CONSTANTS.presalePrice.toFixed(6)}</strong> per BLAZE token (${PRESALE_CONSTANTS.presaleDiscount}% off the $0.02 launch price).<br>
            If you registered your intent, you have <strong>48-hour early access</strong> before the public launch.
          </p>
        </div>

        <h2>Get ready now</h2>
        <ul>
          <li>Make sure you can log into your BLAZE Wallet: <a href="https://my.blazewallet.io">my.blazewallet.io</a></li>
          <li>Add funds to your BLAZE Wallet now (ETH, BTC, USDT or via BSC) so you're ready to buy as soon as the presale goes live tomorrow.</li>
          <li>Tomorrow at 12:00 UTC, open the presale and complete your purchase</li>
          <li>We only use official links. We will never ask for your seed phrase.</li>
        </ul>

        <center>
          <a href="https://www.blazewallet.io/presale" class="btn">Open presale page</a>
          <br>
          <a href="https://my.blazewallet.io" class="btn btn-secondary mt-8">Open BLAZE Wallet</a>
          <br>
          <a href="https://t.me/ai4ldMZv0KgyN2Y8" class="btn btn-secondary mt-8">Join Telegram for updates</a>
        </center>

        ${referralCode ? `
        <div class="divider"></div>
        <div class="referral-box">
          <p class="text-muted">Share with friends:</p>
          <p class="mb-0"><a href="https://www.blazewallet.io?ref=${referralCode}">blazewallet.io?ref=${referralCode}</a></p>
        </div>
        ` : ''}
      `),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send presale tomorrow email:', error);
    return { success: false, error };
  }
}

// Waitlist reminder series: every 6h for 48h, starting at 18:00 UTC. slotIndex 0..8.
export async function sendWaitlistPresaleReminderEmail(
  email: string,
  referralCode: string,
  slotIndex: number
) {
  const hoursUntilPublic = (8 - slotIndex) * 6; // 48, 42, 36, 30, 24, 18, 12, 6, 0
  const isLastSlot = slotIndex === 8;
  const subject = isLastSlot
    ? '🚀 BLAZE presale is now open for everyone – buy in the wallet'
    : `⏰ ${hoursUntilPublic} hours until BLAZE presale opens for everyone`;
  const headline = isLastSlot
    ? 'Presale open for everyone 🚀'
    : `${hoursUntilPublic} hours until presale opens for everyone`;
  const bodyParagraph = isLastSlot
    ? 'Early access has ended. The BLAZE presale is now open for everyone. Create your account at my.blazewallet.io, add funds, and buy $BLAZE in the presale card.'
    : `The presale is live for early supporters. In <strong>${hoursUntilPublic} hours</strong> it opens for everyone (18 March 2026, 12:00 UTC). Get ready: create your BLAZE Wallet account and add funds so you can buy as soon as you want.`;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject,
      html: baseTemplate(`
        <h1>${headline}</h1>
        <p>${bodyParagraph}</p>

        <div class="highlight">
          <h3>How to buy BLAZE</h3>
          <ol class="list-compact">
            <li>Create an account at <a href="https://my.blazewallet.io">my.blazewallet.io</a></li>
            <li>Add funds (ETH, BTC, USDT or BSC) to your wallet</li>
            <li>Open the presale card in the app and complete your purchase (min $100, max $10,000)</li>
          </ol>
        </div>

        <div class="stat-box">
          <div class="price-tag mt-16">$${PRESALE_CONSTANTS.presalePrice.toFixed(6)}</div>
          <div class="stat-label">Per BLAZE token (${PRESALE_CONSTANTS.presaleDiscount}% off launch)</div>
        </div>

        <center>
          <a href="https://my.blazewallet.io" class="btn">Open BLAZE Wallet and buy</a>
          <br>
          <a href="https://www.blazewallet.io/presale" class="btn btn-secondary mt-8">Presale info</a>
          <br>
          <a href="https://t.me/ai4ldMZv0KgyN2Y8" class="btn btn-secondary mt-8">Join Telegram</a>
        </center>

        ${referralCode ? `
        <div class="divider"></div>
        <div class="referral-box">
          <p class="text-muted">Share with friends:</p>
          <p class="mb-0"><a href="https://www.blazewallet.io?ref=${referralCode}">blazewallet.io?ref=${referralCode}</a></p>
        </div>
        ` : ''}
      `),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send waitlist presale reminder email:', error);
    return { success: false, error };
  }
}

// Full "presale is live" email for commitment list – sent at 12:00 UTC. Steps + tiers, same style.
export async function sendCommitmentPresaleLiveEmail(email: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: '🚀 The BLAZE presale is live – buy your tokens now',
      html: baseTemplate(`
        <h1>The presale is LIVE 🚀</h1>
        <p>Your early-access window is open. You can now buy BLAZE tokens.</p>

        <div class="highlight">
          <h3>Do this now</h3>
          <ol class="list-compact">
            <li><strong>Log in</strong> to your BLAZE Wallet: <a href="https://my.blazewallet.io">my.blazewallet.io</a></li>
            <li><strong>Go to the presale</strong> / token purchase section in the app</li>
            <li><strong>Choose your amount</strong> (min $100, max $10,000 per wallet)</li>
            <li><strong>Pay</strong> with ETH, BTC, USDT or via BSC – as communicated in our earlier emails</li>
          </ol>
        </div>

        <div class="stat-box">
          <div class="price-tag mt-16">$${PRESALE_CONSTANTS.presalePrice.toFixed(6)}</div>
          <div class="stat-label">Per BLAZE token (${PRESALE_CONSTANTS.presaleDiscount}% off $0.02 launch price)</div>
        </div>

        <h2>Bonus tiers</h2>
        <p>Early supporters get extra tokens. First-come, first-served per tier:</p>
        <table class="pricing-table">
          <tr><td><strong>Founders</strong> (1–100)</td><td class="text-right">+100% bonus</td></tr>
          <tr><td><strong>Early Birds</strong> (101–250)</td><td class="text-right">+75% bonus</td></tr>
          <tr><td><strong>Pioneers</strong> (251–500)</td><td class="text-right">+50% bonus</td></tr>
          <tr><td><strong>Adopters</strong> (501–1000)</td><td class="text-right">+30% bonus</td></tr>
          <tr><td><strong>Supporters</strong> (1001–2000)</td><td class="text-right">+15% bonus</td></tr>
          <tr><td><strong>Public</strong></td><td class="text-right">No bonus</td></tr>
        </table>

        <div class="highlight">
          <h3>Official links only</h3>
          <p class="mb-0">
            Website: <a href="https://www.blazewallet.io">blazewallet.io</a><br>
            Wallet: <a href="https://my.blazewallet.io">my.blazewallet.io</a><br>
            Telegram: <a href="https://t.me/ai4ldMZv0KgyN2Y8">t.me</a> · X: <a href="https://x.com/blazewallet_io">@blazewallet_io</a><br>
            We never ask for your seed phrase. Only use the links above.
          </p>
        </div>

        <center>
          <a href="https://my.blazewallet.io" class="btn">Open BLAZE Wallet and buy</a>
          <br>
          <a href="https://t.me/ai4ldMZv0KgyN2Y8" class="btn btn-secondary mt-8">Telegram status updates</a>
        </center>
      `),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send commitment presale live email:', error);
    return { success: false, error };
  }
}

export async function sendCommitmentApologyEmail(email: string, presaleDateIso: string) {
  try {
    const d = new Date(presaleDateIso);
    const readableDate = Number.isNaN(d.getTime())
      ? 'March 16, 2026'
      : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Quick update: presale reminder emails sent by mistake',
      html: baseTemplate(`
        <h1>Sorry about that 🙏</h1>
        <p>
          We had a small issue in our email system that caused multiple presale countdown reminders to be sent
          to some users by mistake.
        </p>

        <div class="highlight">
          <h3>Status</h3>
          <p class="mb-0">
            The issue has been fixed. Your inbox should now stay calm again.
          </p>
        </div>

        <div class="stat-box">
          <div class="tier-badge">Presale date</div>
          <div class="stat-number mt-16">${readableDate}</div>
          <div class="stat-label">Still planned as scheduled</div>
        </div>

        <div class="highlight">
          <h3>Important reminder</h3>
          <p class="mb-0">
            To participate when the presale opens, please make sure you have a BLAZE Wallet account ready:
            <br>
            <a href="https://my.blazewallet.io" target="_blank" rel="noopener noreferrer">my.blazewallet.io</a>
          </p>
        </div>

        <p>
          If you want real-time updates (and to double-check official links), you can also join our Telegram community.
        </p>

        <center>
          <a href="https://my.blazewallet.io" class="btn">Open BLAZE Wallet</a>
          <br>
          <a href="https://t.me/ai4ldMZv0KgyN2Y8" class="btn btn-secondary mt-8">Join Telegram</a>
        </center>

        <div class="divider"></div>

        <p class="text-muted">
          Thank you for your support and patience. We&apos;re building BLAZE with care, and we appreciate you being early.
        </p>
      `),
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send commitment apology email:', error);
    return { success: false, error };
  }
}

// =====================================================
// DRIP CAMPAIGN EMAILS
// =====================================================

// Day 3: Why BLAZE?
export async function sendWhyBlazeEmail(email: string, referralCode: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: '💡 Why BLAZE? The Future of Crypto Payments',
      html: baseTemplate(`
        <h1>Why We Built BLAZE 🔥</h1>
        <p>Hi there! We wanted to share why BLAZE is different from every other crypto wallet out there.</p>
        
        <div class="highlight">
          <h3>The Problem:</h3>
          <p class="mb-0">Crypto is complicated. Sending payments takes too long. Scammers are everywhere. And using crypto in daily life? Nearly impossible.</p>
        </div>

        <h2>BLAZE solves this with:</h2>
        <ul>
          <li><strong>QuickPay:</strong> Pay at any store by scanning a QR code</li>
          <li><strong>AI Scam Protection:</strong> Our AI detects and blocks scams before you lose money</li>
          <li><strong>Non-Custodial:</strong> Your keys, your crypto, always</li>
          <li><strong>Multi-Chain:</strong> ETH, SOL, BNB, and Polygon, all in one wallet</li>
        </ul>

        <div class="stat-box">
          <div class="stat-number">18+</div>
          <div class="stat-label">Blockchains supported by BLAZE</div>
        </div>

        <p>We're building the wallet we always wanted, one that makes crypto as easy as using Apple Pay.</p>

        <center>
          <a href="https://www.blazewallet.io/#quickpay" class="btn">See QuickPay in Action</a>
        </center>

        <div class="divider"></div>

        <div class="referral-box">
          <p class="text-muted">Don't forget to share your referral link:</p>
          <p class="mb-0"><a href="https://www.blazewallet.io?ref=${referralCode}">blazewallet.io?ref=${referralCode}</a></p>
        </div>
      `),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send Why BLAZE email:', error);
    return { success: false, error };
  }
}

// Day 7: Social Proof
export async function sendSocialProofEmail(email: string, referralCode: string, waitlistCount: number) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `🚀 ${waitlistCount.toLocaleString()} People Are Already Waiting!`,
      html: baseTemplate(`
        <h1>You're Part of Something Big 🚀</h1>
        
        <div class="stat-box">
          <div class="stat-number">${waitlistCount.toLocaleString()}</div>
          <div class="stat-label">People on the BLAZE waitlist</div>
        </div>

        <p>The BLAZE community is growing fast! Every day, more people are joining the waitlist for updates and registering intent for 48-hour early access.</p>
        
        <div class="highlight">
          <h3>Why are people excited?</h3>
          <ul class="list-compact">
            <li>Up to <strong>70% discount</strong> on token price for early supporters</li>
            <li>Revolutionary <strong>QuickPay</strong> technology</li>
            <li>First wallet with <strong>AI scam protection</strong></li>
            <li>Real utility from day one</li>
          </ul>
        </div>

        <h2>Move up the waitlist!</h2>
        <p>The more friends you invite, the higher you climb on the leaderboard. Top referrers get:</p>
        <ul>
          <li>🥇 #1: 100,000 bonus BLAZE tokens</li>
          <li>🥈 #2: 50,000 bonus BLAZE tokens</li>
          <li>🥉 #3: 25,000 bonus BLAZE tokens</li>
          <li>🏅 Top 10: 10,000 bonus tokens each</li>
        </ul>

        <div class="referral-box">
          <p class="font-semibold">Your referral link:</p>
          <div class="referral-code">${referralCode}</div>
          <p class="referral-link">https://www.blazewallet.io?ref=${referralCode}</p>
        </div>

        <center>
          <a href="https://www.blazewallet.io/leaderboard" class="btn">Check the Leaderboard</a>
        </center>
      `),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send social proof email:', error);
    return { success: false, error };
  }
}

// Day 14: FOMO Pricing
export async function sendFomoPricingEmail(email: string, referralCode: string, currentTier: { name: string; price: number; spotsLeft: number }) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: '⏰ Early Bird Pricing Won\'t Last Forever',
      html: baseTemplate(`
        <h1>Price Increases Are Coming ⏰</h1>
        <p>We wanted to give you a heads up: the current pricing tier won't last forever.</p>
        
        <div class="stat-box">
          <div class="tier-badge">${currentTier.name} Tier</div>
          <div class="price-tag mt-16">$${currentTier.price.toFixed(4)}</div>
          <div class="stat-label">Current price per BLAZE token</div>
          <p class="text-danger mt-12">
            Only ${currentTier.spotsLeft} spots remaining!
          </p>
        </div>

        <div class="highlight">
          <h3>Pricing Tiers:</h3>
          <table class="pricing-table">
            <tr>
              <td><strong>Founders (1-100)</strong></td>
              <td class="text-right">$0.008333 <span class="text-warning">+100% (2x!)</span></td>
            </tr>
            <tr>
              <td><strong>Early Birds (101-250)</strong></td>
              <td class="text-right">$0.008333 <span class="text-warning">+75% bonus</span></td>
            </tr>
            <tr>
              <td><strong>Pioneers (251-500)</strong></td>
              <td class="text-right">$0.008333 <span class="text-warning">+50% bonus</span></td>
            </tr>
            <tr>
              <td><strong>Adopters (501-1000)</strong></td>
              <td class="text-right">$0.008333 <span class="text-warning">+30% bonus</span></td>
            </tr>
            <tr>
              <td><strong>Supporters (1001-2000)</strong></td>
              <td class="text-right">$0.008333 <span class="text-warning">+15% bonus</span></td>
            </tr>
            <tr>
              <td><strong>Launch price</strong></td>
              <td class="text-right">$0.02 <span class="text-muted">no bonus</span></td>
            </tr>
          </table>
        </div>

        <p><strong>Pro tip:</strong> Lock in your intent now at the current price. You're not committing to anything. You're just letting us know you're interested.</p>

        <center>
          <a href="https://www.blazewallet.io/#commitment" class="btn">Reserve Your Spot</a>
        </center>

        <div class="divider"></div>

        <div class="referral-box">
          <p class="text-muted">Share with friends:</p>
          <p class="mb-0"><a href="https://www.blazewallet.io?ref=${referralCode}">blazewallet.io?ref=${referralCode}</a></p>
        </div>
      `),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send FOMO pricing email:', error);
    return { success: false, error };
  }
}

// Day 21: Exclusive Bonus
export async function sendExclusiveBonusEmail(email: string, referralCode: string, referralCount: number) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: '🎁 Exclusive Bonus for Early Supporters',
      html: baseTemplate(`
        <h1>Special Offer Just for You 🎁</h1>
        <p>As one of our earliest supporters, we want to reward your trust in BLAZE.</p>
        
        <div class="highlight">
          <h3>Your Exclusive Bonuses:</h3>
          <ul class="list-compact">
            <li><strong>Early Bird Bonus:</strong> Up to 50% extra tokens on your purchase</li>
            <li><strong>Referral Rewards:</strong> Bonus tokens for every friend who joins</li>
            <li><strong>48-hour Early Access:</strong> Intent registrations get access before public launch</li>
            <li><strong>VIP Support:</strong> Direct access to our founding team</li>
          </ul>
        </div>

        ${referralCount > 0 ? `
        <div class="stat-box">
          <div class="stat-number">${referralCount}</div>
          <div class="stat-label">Friends you've referred</div>
          <p class="text-success mt-12">
            Keep going! Every referral boosts your rewards.
          </p>
        </div>
        ` : `
        <div class="stat-box">
          <p class="text-muted mb-0">You haven't referred anyone yet.</p>
          <p class="text-muted mt-8">Share your link to start earning bonus tokens!</p>
        </div>
        `}

        <h2>How to Maximize Your Rewards:</h2>
        <ol>
          <li><strong>Register your purchase intent</strong>: Lock in current tier pricing</li>
          <li><strong>Share your referral link</strong>: Earn bonus tokens per referral</li>
          <li><strong>Climb the leaderboard</strong>: Top referrers get massive bonuses</li>
          <li><strong>Join our Telegram</strong>: Get exclusive updates and tips</li>
        </ol>

        <center>
          <a href="https://www.blazewallet.io/#commitment" class="btn">Lock In Your Bonus</a>
          <br>
          <a href="https://t.me/ai4ldMZv0KgyN2Y8" class="btn btn-secondary mt-8">Join Telegram</a>
        </center>

        <div class="divider"></div>

        <div class="referral-box">
          <p class="font-semibold">Your referral link:</p>
          <div class="referral-code">${referralCode}</div>
          <p class="referral-link">https://www.blazewallet.io?ref=${referralCode}</p>
        </div>
      `),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send exclusive bonus email:', error);
    return { success: false, error };
  }
}

// Day 28: Presale Countdown
export async function sendPresaleCountdownEmail(email: string, referralCode: string, daysUntilPresale: number) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: '📅 Presale Countdown: Get Ready!',
      html: baseTemplate(`
        <h1>The Presale is Coming! 📅</h1>
        
        <div class="stat-box">
          <div class="stat-number">${daysUntilPresale > 0 ? daysUntilPresale : 'Soon'}</div>
          <div class="stat-label">${daysUntilPresale > 0 ? 'Days until presale' : 'Presale launching soon!'}</div>
        </div>

        <p>We're almost ready to launch the BLAZE presale! Here's what you need to know:</p>

        <div class="highlight">
          <h3>Presale Checklist:</h3>
          <ul class="list-compact">
            <li>✅ <strong>Join the waitlist</strong>: Done!</li>
            <li>☐ <strong>Register your purchase intent</strong>: Lock in your spot and unlock 48-hour early access</li>
            <li>☐ <strong>Prepare your wallet</strong>: Keep your preferred wallet and gas-ready network set up</li>
            <li>☐ <strong>Set up a wallet</strong>: MetaMask, Trust Wallet, etc.</li>
          </ul>
        </div>

        <h2>What to Expect:</h2>
        <ul>
          <li>📧 <strong>48 hours before public launch:</strong> Intent participants receive detailed instructions</li>
          <li>🚀 <strong>At launch:</strong> Public presale opens for everyone</li>
          <li>⚡ <strong>During presale:</strong> First-come, first-served per tier</li>
          <li>🔒 <strong>After purchase:</strong> Tokens locked until TGE</li>
        </ul>

        <p><strong>Important:</strong> Make sure you're ready when the presale opens. Early tiers fill up fast!</p>

        <center>
          <a href="https://www.blazewallet.io/#commitment" class="btn">Register Intent Now</a>
        </center>

        <div class="divider"></div>

        <h2>Last Chance for Referral Bonuses!</h2>
        <p>The leaderboard freezes when the presale starts. Share your link now to secure your bonus tokens!</p>

        <div class="referral-box">
          <p class="font-semibold">Your referral link:</p>
          <div class="referral-code">${referralCode}</div>
          <p class="referral-link">https://www.blazewallet.io?ref=${referralCode}</p>
        </div>
      `),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send presale countdown email:', error);
    return { success: false, error };
  }
}

// Admin notification for new commitment
export async function sendCommitmentNotification({
  email,
  amountUsd,
  estimatedTokens,
  tierName,
}: {
  email: string;
  amountUsd: number;
  estimatedTokens: number;
  tierName: string;
}) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: 'info@blazewallet.io',
      subject: '💰 New Purchase Intent Registered!',
      html: baseTemplate(`
        <h1>New Commitment! 🎯</h1>
        <div class="stat-box">
          <div class="stat-number">$${amountUsd.toLocaleString()}</div>
          <div class="stat-label">Purchase Intent</div>
        </div>
        <div class="highlight">
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Tier:</strong> ${tierName}</p>
          <p><strong>Est. Tokens:</strong> ${estimatedTokens.toLocaleString()} BLAZE</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'Europe/Amsterdam' })}</p>
        </div>
        <center>
          <a href="https://www.blazewallet.io/admin/commitments" class="btn">View in Admin</a>
        </center>
      `),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send commitment notification:', error);
    return { success: false, error };
  }
}
