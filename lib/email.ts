import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNewSignupNotification(email: string, source: string, referralCode?: string) {
  try {
    await resend.emails.send({
      from: 'BLAZE Wallet <info@blazewallet.io>',
      to: 'info@blazewallet.io',
      subject: '🔥 New Waitlist Signup!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 500px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f97316, #eab308); padding: 20px; border-radius: 12px 12px 0 0; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 24px; }
            .content { background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px; }
            .field { margin-bottom: 16px; }
            .label { font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
            .value { font-size: 16px; font-weight: 600; color: #1e293b; margin-top: 4px; }
            .badge { display: inline-block; padding: 4px 12px; background: #f1f5f9; border-radius: 20px; font-size: 14px; color: #475569; }
            .footer { text-align: center; margin-top: 20px; color: #94a3b8; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔥 New Signup!</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Email</div>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <div class="label">Source</div>
                <div class="value"><span class="badge">${source}</span></div>
              </div>
              ${referralCode ? `
              <div class="field">
                <div class="label">Referred by</div>
                <div class="value"><span class="badge">🎁 ${referralCode}</span></div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Time</div>
                <div class="value">${new Date().toLocaleString('en-US', { timeZone: 'Europe/Amsterdam' })}</div>
              </div>
            </div>
            <div class="footer">
              View all signups at <a href="https://www.blazewallet.io/admin/waitlist">Admin Dashboard</a>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send notification email:', error);
    return { success: false, error };
  }
}

export async function sendWelcomeEmail(email: string, referralCode: string) {
  try {
    console.log(`[Welcome Email] Attempting to send to: ${email}`);
    const result = await resend.emails.send({
      from: 'BLAZE Wallet <info@blazewallet.io>',
      to: email,
      subject: '🔥 Welcome to the BLAZE Waitlist!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
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
            .highlight h3 { color: #c2410c; margin: 0 0 8px; }
            .referral-box { background: #f8fafc; padding: 24px; border-radius: 12px; text-align: center; margin: 24px 0; }
            .referral-code { font-size: 24px; font-weight: bold; color: #f97316; letter-spacing: 2px; padding: 12px 24px; background: white; border: 2px dashed #f97316; border-radius: 8px; display: inline-block; }
            .referral-link { font-size: 14px; color: #64748b; word-break: break-all; margin-top: 12px; }
            .btn { display: inline-block; background: linear-gradient(135deg, #f97316, #eab308); color: white; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; margin: 16px 0; }
            .footer { text-align: center; padding: 24px; color: #94a3b8; font-size: 12px; }
            .social { margin: 16px 0; }
            .social a { color: #64748b; text-decoration: none; margin: 0 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🔥 <span>BLAZE</span></div>
            </div>
            <div class="content">
              <h1>You're on the list! 🎉</h1>
              <p>Thanks for joining the BLAZE Wallet waitlist. You'll be among the first to know when our presale goes live in Q1 2026.</p>
              
              <div class="highlight">
                <h3>What you'll get:</h3>
                <p style="margin:0;">✨ Early access to the presale at <strong>$0.00417</strong> (58% off public price)<br>
                🔔 Exclusive updates and announcements<br>
                🎁 Special bonuses for early supporters</p>
              </div>

              <div class="referral-box">
                <p style="margin:0 0 12px; color: #1e293b; font-weight: 600;">Share & earn rewards!</p>
                <div class="referral-code">${referralCode}</div>
                <p class="referral-link">Your link: https://www.blazewallet.io?ref=${referralCode}</p>
                <p style="font-size: 14px; color: #64748b; margin-top: 12px;">Invite friends and climb the waitlist. Top referrers get bonus tokens!</p>
              </div>

              <center>
                <a href="https://www.blazewallet.io" class="btn">Visit BLAZE Wallet</a>
              </center>
            </div>
            <div class="footer">
              <div class="social">
                <a href="https://twitter.com/blazewallet_io">Twitter</a> •
                <a href="https://t.me/blazewallet_io">Telegram</a>
              </div>
              <p>© 2025 BLAZE Wallet. Stavangerweg 13, Groningen, Netherlands</p>
              <p>KvK: 88929280</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    console.log(`[Welcome Email] Successfully sent to: ${email}`, result);
    return { success: true, data: result };
  } catch (error: any) {
    console.error('[Welcome Email] Failed to send:', {
      to: email,
      error: error?.message || error,
      statusCode: error?.statusCode,
      name: error?.name,
    });
    return { success: false, error: error?.message || 'Unknown error' };
  }
}

