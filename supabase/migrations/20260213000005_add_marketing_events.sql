-- Marketing/ads attribution event store
CREATE TABLE IF NOT EXISTS marketing_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_name TEXT NOT NULL,
  x_event_name TEXT,
  event_value NUMERIC,
  currency TEXT,
  visitor_id TEXT,
  source_page TEXT,
  page_url TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  twclid TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_marketing_events_name ON marketing_events(event_name);
CREATE INDEX IF NOT EXISTS idx_marketing_events_created_at ON marketing_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_marketing_events_visitor ON marketing_events(visitor_id);
CREATE INDEX IF NOT EXISTS idx_marketing_events_utm_campaign ON marketing_events(utm_campaign);

ALTER TABLE marketing_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow inserts for marketing events" ON marketing_events;
CREATE POLICY "Allow inserts for marketing events" ON marketing_events
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow selects for authenticated users" ON marketing_events;
CREATE POLICY "Allow selects for authenticated users" ON marketing_events
  FOR SELECT TO authenticated
  USING (true);


