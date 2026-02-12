type WalletEmailShellOptions = {
  content: string;
  title?: string;
  includeSupportSection?: boolean;
};

const ASSET_BASE_URL = 'https://my.blazewallet.io';

export function generateWalletStyleEmailShell({
  content,
  title,
  includeSupportSection = true,
}: WalletEmailShellOptions): string {
  const logoUrl = `${ASSET_BASE_URL}/icons/icon-512x512.png`;
  const currentYear = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title || 'BLAZE Wallet'}</title>
  <!--[if mso]>
    <style type="text/css">
      body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
      img {border: 0 !important; outline: none !important; text-decoration: none !important;}
    </style>
  <![endif]-->
  <style>
    body, table, td {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    h1 {
      margin: 0 0 24px;
      font-size: 38px;
      font-weight: 700;
      color: #111827;
      line-height: 1.2;
      letter-spacing: -0.02em;
    }
    h2 {
      margin: 0 0 16px;
      font-size: 28px;
      font-weight: 700;
      color: #111827;
      letter-spacing: -0.01em;
    }
    h3 {
      margin: 0 0 12px;
      font-size: 21px;
      font-weight: 700;
      color: #111827;
      letter-spacing: -0.01em;
    }
    p {
      margin: 0 0 16px;
      font-size: 17px;
      line-height: 1.7;
      color: #374151;
    }
    ul, ol {
      margin: 0 0 16px;
      padding-left: 24px;
      color: #4b5563;
      font-size: 16px;
      line-height: 1.8;
    }
    li {
      margin-bottom: 8px;
    }
    .highlight {
      background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
      border-left: 4px solid #f97316;
      border-radius: 10px;
      padding: 20px;
      margin: 24px 0;
    }
    .stat-box {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 24px;
      margin: 24px 0;
      text-align: center;
    }
    .stat-number {
      font-size: 42px;
      font-weight: 700;
      color: #111827;
      line-height: 1.1;
    }
    .stat-label {
      margin-top: 8px;
      color: #6b7280;
      font-size: 14px;
      line-height: 1.5;
    }
    .referral-box {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 24px;
      margin: 24px 0;
      text-align: center;
    }
    .referral-code {
      display: inline-block;
      background: white;
      border: 2px dashed #f97316;
      color: #111827;
      border-radius: 8px;
      padding: 12px 20px;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: 1px;
      margin: 8px 0;
    }
    .referral-link {
      margin: 8px 0 0;
      color: #6b7280;
      font-size: 14px;
      word-break: break-all;
      line-height: 1.6;
    }
    .text-muted {
      color: #6b7280;
      font-size: 14px;
    }
    .text-success {
      color: #059669;
      font-weight: 600;
    }
    .text-danger {
      color: #b91c1c;
      font-weight: 600;
    }
    .text-warning {
      color: #d97706;
      font-weight: 600;
    }
    .text-right {
      text-align: right;
    }
    .font-semibold {
      font-weight: 600;
    }
    .mb-0 {
      margin-bottom: 0;
    }
    .mt-8 {
      margin-top: 8px;
    }
    .mt-12 {
      margin-top: 12px;
    }
    .mt-16 {
      margin-top: 16px;
    }
    .list-compact {
      margin: 0;
    }
    .pricing-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 12px;
      font-size: 15px;
      color: #374151;
    }
    .pricing-table tr + tr {
      border-top: 1px solid #fed7aa;
    }
    .pricing-table td {
      padding: 8px 0;
    }
    .btn {
      display: inline-block;
      background: #111827;
      border-radius: 10px;
      color: white !important;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      padding: 14px 28px;
      margin: 8px 0;
    }
    .btn-secondary {
      background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
      color: white !important;
    }
    .tier-badge {
      display: inline-block;
      background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
      border-radius: 999px;
      padding: 8px 14px;
      color: white;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.01em;
      text-transform: uppercase;
    }
    .price-tag {
      font-size: 34px;
      font-weight: 700;
      color: #111827;
      line-height: 1.2;
    }
    .urgency {
      background: #fff7ed;
      border-left: 4px solid #f97316;
      border-radius: 10px;
      padding: 16px;
      margin: 24px 0;
    }
    .divider {
      border-top: 1px solid #e5e7eb;
      margin: 24px 0;
    }
    a {
      color: #f97316;
      text-decoration: none;
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="640" cellpadding="0" cellspacing="0" border="0" style="max-width: 640px; background: white; box-shadow: 0 2px 24px rgba(0,0,0,0.08);">
          <tr>
            <td style="padding: 48px 48px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-bottom: 24px; border-bottom: 2px solid #f97316;">
                    <img src="${logoUrl}" alt="BLAZE Wallet" width="56" height="56" style="display: block; border-radius: 12px;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 48px 48px;">
              ${content}
            </td>
          </tr>

          ${
            includeSupportSection
              ? `
          <tr>
            <td style="background: #fafafa; padding: 40px 48px; text-align: center;">
              <p style="margin: 0 0 8px; font-size: 17px; line-height: 1.7; color: #374151;">
                Questions? Our support team is available 24/7
              </p>
              <a href="mailto:support@blazewallet.io" style="font-size: 17px; font-weight: 600; color: #f97316; text-decoration: none;">
                support@blazewallet.io
              </a>
            </td>
          </tr>
          `
              : ''
          }

          <tr>
            <td style="background: #111827; padding: 32px 48px; text-align: center;">
              <div style="margin-bottom: 20px;">
                <div style="font-size: 14px; font-weight: 600; color: white; margin-bottom: 6px; letter-spacing: 0.5px;">
                  BLAZE WALLET
                </div>
                <div style="font-size: 13px; color: #9ca3af;">
                  The future of multi-chain crypto management
                </div>
              </div>

              <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto 20px;">
                <tr>
                  <td style="padding: 0 10px;"><a href="https://my.blazewallet.io/wallet" style="color: #9ca3af; text-decoration: none; font-size: 13px; font-weight: 500;">Wallet</a></td>
                  <td style="padding: 0 10px;"><a href="https://my.blazewallet.io/about" style="color: #9ca3af; text-decoration: none; font-size: 13px; font-weight: 500;">About</a></td>
                  <td style="padding: 0 10px;"><a href="https://my.blazewallet.io/security" style="color: #9ca3af; text-decoration: none; font-size: 13px; font-weight: 500;">Security</a></td>
                  <td style="padding: 0 10px;"><a href="https://my.blazewallet.io/support" style="color: #9ca3af; text-decoration: none; font-size: 13px; font-weight: 500;">Support</a></td>
                  <td style="padding: 0 10px;"><a href="https://my.blazewallet.io/privacy" style="color: #9ca3af; text-decoration: none; font-size: 13px; font-weight: 500;">Privacy policy</a></td>
                </tr>
              </table>

              <div style="font-size: 12px; color: #6b7280; line-height: 1.6;">
                © ${currentYear} BLAZE Wallet. All rights reserved.<br />
                This email was sent because you created an account at my.blazewallet.io
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

