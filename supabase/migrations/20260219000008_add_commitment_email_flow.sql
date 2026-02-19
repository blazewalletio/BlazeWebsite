-- Commitment (presale intent) email flow support.
-- Creates send log table and (optionally) adds pause/last_email_sent fields on commitments.

BEGIN;

CREATE TABLE IF NOT EXISTS commitment_email_sends (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  commitment_id TEXT NOT NULL,
  email TEXT NOT NULL,
  template_key TEXT NOT NULL,
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'failed')),
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_commitment_email_sends_unique
  ON commitment_email_sends(commitment_id, template_key);

CREATE INDEX IF NOT EXISTS idx_commitment_email_sends_email_template
  ON commitment_email_sends(email, template_key);

CREATE INDEX IF NOT EXISTS idx_commitment_email_sends_created_at
  ON commitment_email_sends(created_at DESC);

ALTER TABLE commitment_email_sends ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated can view commitment_email_sends" ON commitment_email_sends;
CREATE POLICY "Authenticated can view commitment_email_sends" ON commitment_email_sends
  FOR SELECT TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Service role full access to commitment_email_sends" ON commitment_email_sends;
CREATE POLICY "Service role full access to commitment_email_sends" ON commitment_email_sends
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- Optional: commitments table may already exist outside migrations. Add email pause fields safely.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'commitments'
  ) THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'commitments' AND column_name = 'email_paused'
    ) THEN
      ALTER TABLE commitments ADD COLUMN email_paused BOOLEAN DEFAULT FALSE;
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'commitments' AND column_name = 'last_email_sent'
    ) THEN
      ALTER TABLE commitments ADD COLUMN last_email_sent TEXT;
    END IF;
  END IF;
END $$;

COMMIT;


