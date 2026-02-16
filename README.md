# 🔥 BLAZE Wallet - Marketing Website

Spectaculaire marketing website voor BLAZE Wallet crypto wallet.

## 🚀 Features

- **Hero sectie** met live presale countdown en CTA
- **Features showcase** met alle wallet functionaliteit
- **Live demo** met iframe naar de wallet app
- **Tokenomics** met interactieve charts en distributie
- **Whitepaper** sectie met download options
- **Roadmap** met timeline en milestones
- **Team sectie** met founders en advisors
- **Footer** met social media links en documentatie

## 🎨 Design

- Modern glassmorphism design
- Smooth animations met Framer Motion
- Gradient effects en glow animations
- Fully responsive (mobile-first)
- Dark mode optimized

## 🛠 Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Recharts** - Charts voor tokenomics

## 🏃‍♂️ Running

```bash
# Install dependencies
npm install

# Start dev server (port 3001)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## ⚙️ Environment

For the wallet release feed on `/updates`, you can configure the source repo, display label, and branch:

```bash
WALLET_RELEASE_REPO=blazewalletio/BlazeWallet21-10
WALLET_RELEASE_REPO_LABEL=BlazeWallet-Github
WALLET_RELEASE_BRANCH=main
NEXT_PUBLIC_X_PIXEL_ID=your_x_pixel_id
# NOTE: We only use standard X pixel events (e.g. Lead, SignUp). No custom "event id" is required.
WALLET_SIGNUP_TRACKING_SECRET=choose_a_long_random_secret
```

If omitted, defaults are:
- `WALLET_RELEASE_REPO=blazewalletio/BlazeWallet21-10`
- `WALLET_RELEASE_REPO_LABEL=BlazeWallet-Github`
- `WALLET_RELEASE_BRANCH=main`

### Wallet signup conversion webhook

To track real wallet account creations (after users click through from the website), let the wallet app call:

- `POST /api/analytics/wallet-signup`
- Body:

```json
{
  "secret": "WALLET_SIGNUP_TRACKING_SECRET",
  "visitorId": "bw_vid_from_query",
  "walletUserId": "optional-wallet-user-id",
  "walletAddress": "optional-wallet-address",
  "emailHash": "optional-sha256-email",
  "source": "wallet_app_signup"
}
```

This logs a `wallet_account_created` marketing event linked to the original website visitor id.

## 📝 Content

Alle content is gebaseerd op echte data van:
- BLAZE Wallet repository - De wallet app
- `contracts/` - Smart contracts
- Token economics en presale details

## 🔗 Links

- **Website:** http://localhost:3001 (dev)
- **Wallet App:** https://my.blazewallet.io
- **Presale:** Live op BSC Testnet

## 📱 Sections

1. **Hero** - Presale countdown en CTA
2. **Features** - 12 key features van de wallet
3. **Demo** - Live iframe van de wallet
4. **Tokenomics** - Token distributie en utility
5. **Whitepaper** - Download en inhoudsopgave
6. **Roadmap** - Q4 2024 - Q4 2025 planning
7. **Team** - Founders en core team

## 🎯 SEO Optimized

- Metadata configured
- OpenGraph tags
- Keywords voor crypto/DeFi
- Semantic HTML

## 🔥 BLAZE it up!

Built with ❤️ by the BLAZE team.



