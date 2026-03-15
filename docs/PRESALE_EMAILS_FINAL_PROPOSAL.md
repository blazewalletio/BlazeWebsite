# Finaal voorstel: campagnes pauzeren + twee presale-mails

## 1. Campagnes pauzeren

- **Drip (waitlist):** Alle rijen in `email_campaigns` met `campaign_type = 'drip'` op `is_active = false` gezet via migratie. Geen why_blaze, social_proof, fomo_pricing, exclusive_bonus, presale_countdown meer tot je ze weer aanzet.
- **Commitment-cron:** Nieuwe site-setting `commitment_campaign_only_live` (true). Zolang die true is:
  - Geen dag-mails (day 2, 5, 7, 10, 13, 18).
  - Geen countdown-mails (T-48h, T-24h, …).
  - Alleen om **12:00 UTC** (presale-datum uit `site_settings.presale_date`): één mail naar alle commitment-e-mailadressen: “Presale is live” met volledige handelingen en tiers.

## 2. Mail 1 – Presale morgen (nu handmatig versturen)

- **Doel:** Aankondiging dat de presale morgen (maandag 16 maart 2026) om 12:00 UTC live gaat.
- **Ontvangers:** Iedereen op de waitlist (broadcast via Admin → Campaigns → template “Presale tomorrow” → Broadcast).
- **Moment:** Nu, handmatig, wanneer jij op Broadcast klikt.
- **Styling:** Zelfde als bestaande mails (zelfde shell, highlight/stat-box/btn).
- **Inhoud (conversie):**
  - Subject: duidelijk en urgent (bijv. “Morgen 12:00 UTC: de BLAZE presale gaat live”).
  - Headline: na al het wachten gaat de presale morgen live – maandag 16 maart 2026, 12:00 UTC.
  - Korte herinnering: prijs $0.008333, 58% korting, 48h early access voor wie intent heeft.
  - Wat nu doen: BLAZE Wallet klaarzetten (my.blazewallet.io), morgen 12:00 UTC op de presale/wallet zijn.
  - Eén duidelijke CTA: “Open presale” / “Bekijk presale” → https://www.blazewallet.io/presale.
  - Optioneel: korte veiligheidsregel (alleen officiële links).
- **Template-key:** `presale_tomorrow`. In API en admin beschikbaar voor test + broadcast.

## 3. Mail 2 – Presale is live (automatisch om 12:00 UTC naar commitmentlist)

- **Doel:** Zeggen dat de presale nu live is + alle handelingen en info om BLAZE tokens te kopen.
- **Ontvangers:** Alle e-mailadressen in de commitmentlist (`commitments`, `email_paused = false`).
- **Moment:** Automatisch wanneer de commitment-cron draait op het tijdstip van de presale (12:00 UTC, uit `site_settings.presale_date`). Cron moet dan wel draaien (bijv. elke 15 min).
- **Styling:** Exact dezelfde als de rest (zelfde shell, highlight, stat-box, tier-badge, btn).
- **Inhoud (conversie):**
  - Subject: duidelijk live (bijv. “De BLAZE presale is live – koop nu je tokens”).
  - Headline: presale is nu live, je kunt BLAZE tokens kopen.
  - Stappen:
    1. Log in op BLAZE Wallet (my.blazewallet.io).
    2. Ga naar de presale / token purchase.
    3. Kies je bedrag/tier (min $100, max $10.000).
    4. Betaal met ETH, BTC, USDT of via BSC (zoals eerder gecommuniceerd).
  - Overzicht tiers: Founders (+100%), Early Birds (+75%), Pioneers (+50%), Adopters (+30%), Supporters (+15%), prijs $0.008333, launch $0.02.
  - Officiële links: website, wallet, Telegram, X.
  - Eén duidelijke primaire CTA: “Open BLAZE Wallet en koop” → my.blazewallet.io.
  - Korte veiligheidsreminder (geen seed phrase, alleen officiële links).
- **Template-key:** `commitment_presale_live`. Wordt alleen door de cron gebruikt (bij T=0); in admin eventueel beschikbaar voor test-mail.

## 4. Technische aanpassingen

| Onderdeel | Actie |
|-----------|--------|
| Migratie | Nieuwe migratie: `email_campaigns.is_active = false` voor drip; `site_settings` insert `commitment_campaign_only_live` = true. |
| `lib/email.ts` | Nieuwe functie `sendPresaleTomorrowEmail` (mail 1). Nieuwe functie `sendCommitmentPresaleLiveEmail` (mail 2, met stappen + tiers). |
| `app/api/email/send/route.ts` | Case `presale_tomorrow` toevoegen (broadcast toegestaan). Case `commitment_presale_live` voor test (geen broadcast). |
| Commitment-cron | Als `commitment_campaign_only_live` true: dag- en countdown-loops overslaan; alleen bij T=0 `sendCommitmentPresaleLiveEmail` aanroepen i.p.v. `sendCommitmentLiveEmail`. |
| Admin Campaigns | Template “Presale tomorrow” en “Commitment: Presale live” in dropdown + beschrijvingen. |

## 5. Samenvatting

- **Nu:** Drip gepauzeerd; commitment-cron stuurt alleen nog de live-mail om 12:00 UTC.
- **Jij doet nu:** Admin → Send emails → template “Presale tomorrow” → Broadcast (mail 1 naar waitlist).
- **Morgen 12:00 UTC:** Cron stuurt automatisch mail 2 (“Presale is live”) naar alle commitment-e-mailadressen, in dezelfde stijl en met alle handelingen en tiers voor maximale conversie.
