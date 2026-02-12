import { Resend } from 'resend';
import { generateWalletStyleEmailShell } from '@/lib/email-shell';

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
            ✨ Early access at <strong>$0.008333</strong> (58% off $0.02 launch price) + bonus tokens<br>
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
      subject: '✅ Your BLAZE Purchase Intent is Registered!',
      html: baseTemplate(`
        <h1>Intent Registered! 🎯</h1>
        <p>Great news! We've recorded your purchase intent for the BLAZE presale.</p>
        
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

        <p>This is not a payment - it's your commitment to participate. When the presale opens, you'll receive priority access and a reminder email with payment instructions.</p>

        <div class="divider"></div>

        <h2>What happens next?</h2>
        <ul>
          <li>📧 You'll receive regular updates about the presale</li>
          <li>⏰ We'll notify you 48 hours before the presale opens</li>
          <li>🎯 Your commitment helps us plan - but you can adjust anytime</li>
          <li>💰 Payment is only required when the presale goes live</li>
        </ul>

        <center>
          <a href="https://www.blazewallet.io" class="btn">View Presale Details</a>
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
          <li><strong>Non-Custodial:</strong> Your keys, your crypto - always</li>
          <li><strong>Multi-Chain:</strong> ETH, SOL, BNB, Polygon - all in one wallet</li>
        </ul>

        <div class="stat-box">
          <div class="stat-number">18+</div>
          <div class="stat-label">Blockchains supported by BLAZE</div>
        </div>

        <p>We're building the wallet we always wanted - one that makes crypto as easy as using Apple Pay.</p>

        <center>
          <a href="https://www.blazewallet.io/#quickpay" class="btn">See QuickPay in Action</a>
        </center>

        <div class="divider"></div>

        <div class="referral-box">
          <p class="text-muted">Don't forget - share your referral link:</p>
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

        <p>The BLAZE community is growing fast! Every day, more people are joining the waitlist for early access to the presale.</p>
        
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
        <p>We wanted to give you a heads up - the current pricing tier won't last forever.</p>
        
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

        <p><strong>Pro tip:</strong> Lock in your intent now at the current price. You're not committing to anything - just letting us know you're interested.</p>

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
            <li><strong>Priority Access:</strong> First in line when presale opens</li>
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
          <li><strong>Register your purchase intent</strong> - Lock in current tier pricing</li>
          <li><strong>Share your referral link</strong> - Earn bonus tokens per referral</li>
          <li><strong>Climb the leaderboard</strong> - Top referrers get massive bonuses</li>
          <li><strong>Join our Telegram</strong> - Get exclusive updates and tips</li>
        </ol>

        <center>
          <a href="https://www.blazewallet.io/#commitment" class="btn">Lock In Your Bonus</a>
          <br>
          <a href="https://t.me/blazewallet_io" class="btn btn-secondary mt-8">Join Telegram</a>
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
            <li>✅ <strong>Join the waitlist</strong> - Done!</li>
            <li>☐ <strong>Register your purchase intent</strong> - Lock in your spot</li>
            <li>☐ <strong>Prepare your wallet</strong> - Keep your preferred wallet and gas-ready network set up</li>
            <li>☐ <strong>Set up a wallet</strong> - MetaMask, Trust Wallet, etc.</li>
          </ul>
        </div>

        <h2>What to Expect:</h2>
        <ul>
          <li>📧 <strong>48 hours before:</strong> You'll receive detailed instructions</li>
          <li>🚀 <strong>At launch:</strong> Priority access for waitlist members</li>
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
