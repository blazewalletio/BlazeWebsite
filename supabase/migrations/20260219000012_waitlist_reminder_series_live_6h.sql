-- Set waitlist reminder series start to 6 hours from now so the first email is sent automatically in 6 hours.
-- Run this migration when you want to go live; the cron (every 15 min) will send slot 0 in the first 20 min window after that time.
INSERT INTO site_settings (key, value)
VALUES (
  'waitlist_reminder_series_start',
  to_jsonb(to_char((NOW() + INTERVAL '6 hours') AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'))
)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
