-- Store signup country on waitlist + commitments so admin can segment by geo.
-- Uses ISO 3166-1 alpha-2 codes (e.g. "NL", "DE").

BEGIN;

-- waitlist.country_code
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'waitlist'
  ) THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'waitlist' AND column_name = 'country_code'
    ) THEN
      ALTER TABLE waitlist ADD COLUMN country_code TEXT;
    END IF;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_waitlist_country_code ON waitlist(country_code);

-- commitments.country_code
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'commitments'
  ) THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'commitments' AND column_name = 'country_code'
    ) THEN
      ALTER TABLE commitments ADD COLUMN country_code TEXT;
    END IF;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_commitments_country_code ON commitments(country_code);

COMMIT;


