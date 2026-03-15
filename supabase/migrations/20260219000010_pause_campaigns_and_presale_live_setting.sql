-- Pause all drip (waitlist) email campaigns so only the presale tomorrow + presale live emails are sent.
UPDATE email_campaigns
SET is_active = false
WHERE campaign_type = 'drip';

-- When true, commitment cron only sends the "presale live" email at 12:00 UTC (presale_date);
-- no day-based or countdown emails are sent.
INSERT INTO site_settings (key, value)
VALUES ('commitment_campaign_only_live', 'true')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
