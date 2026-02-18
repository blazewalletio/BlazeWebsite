-- Remove specific test/demo signups from waitlist and commitments.
-- Important: this migration deletes ONLY the listed emails (case-insensitive, trimmed).

BEGIN;

-- Commitments (presale intents)
DELETE FROM commitments
WHERE email IS NOT NULL
  AND lower(trim(email)) IN (
    'test@test2.nl',
    'testietest@test.nl',
    'donske@test.nl',
    'donevan@live.nl',
    'h.schlimback@gmail.com'
  );

-- Waitlist
DELETE FROM waitlist
WHERE email IS NOT NULL
  AND lower(trim(email)) IN (
    'test@test2.nl',
    'testietest@test.nl',
    'donske@test.nl',
    'donevan@live.nl',
    'h.schlimback@gmail.com'
  );

COMMIT;


