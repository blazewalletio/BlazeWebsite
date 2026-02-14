-- Enforce one presale intent per email (case-insensitive).
-- Cleanup keeps the most recently updated record when duplicates already exist.
DELETE FROM commitments c
USING (
  SELECT ctid
  FROM (
    SELECT
      ctid,
      ROW_NUMBER() OVER (
        PARTITION BY lower(trim(email))
        ORDER BY updated_at DESC NULLS LAST, ctid DESC
      ) AS rn
    FROM commitments
    WHERE email IS NOT NULL
      AND trim(email) <> ''
  ) dedupe
  WHERE dedupe.rn > 1
) duplicates
WHERE c.ctid = duplicates.ctid;

CREATE UNIQUE INDEX IF NOT EXISTS commitments_email_ci_unique
  ON commitments ((lower(trim(email))));

