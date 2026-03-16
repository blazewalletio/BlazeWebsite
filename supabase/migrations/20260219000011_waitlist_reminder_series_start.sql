-- Waitlist reminder series: every 6 hours for 48 hours, first send at 18:00 UTC.
-- Cron checks this; when now is within 20 min of 18:00, 00:00, 06:00, 12:00 (UTC) starting from this date, it sends to all waitlist.
INSERT INTO site_settings (key, value)
VALUES ('waitlist_reminder_series_start', '"2026-03-16T18:00:00Z"')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
