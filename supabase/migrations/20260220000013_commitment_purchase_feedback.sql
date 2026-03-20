-- Why users with intent have not yet bought: one-click survey from email + optional note.

BEGIN;

CREATE TABLE IF NOT EXISTS commitment_purchase_feedback (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  commitment_id TEXT NOT NULL,
  email TEXT NOT NULL,
  reason_key TEXT NOT NULL,
  reason_label TEXT NOT NULL,
  campaign_key TEXT NOT NULL DEFAULT 'not_purchased_survey_v1',
  extra_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- One response per commitment per campaign (latest click wins on update).
CREATE UNIQUE INDEX IF NOT EXISTS idx_commitment_purchase_feedback_campaign
  ON commitment_purchase_feedback (commitment_id, campaign_key);

CREATE INDEX IF NOT EXISTS idx_commitment_purchase_feedback_reason
  ON commitment_purchase_feedback (reason_key);

CREATE INDEX IF NOT EXISTS idx_commitment_purchase_feedback_created
  ON commitment_purchase_feedback (created_at DESC);

ALTER TABLE commitment_purchase_feedback ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated can view commitment_purchase_feedback" ON commitment_purchase_feedback;
CREATE POLICY "Authenticated can view commitment_purchase_feedback" ON commitment_purchase_feedback
  FOR SELECT TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Service role full access commitment_purchase_feedback" ON commitment_purchase_feedback;
CREATE POLICY "Service role full access commitment_purchase_feedback" ON commitment_purchase_feedback
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

COMMIT;
