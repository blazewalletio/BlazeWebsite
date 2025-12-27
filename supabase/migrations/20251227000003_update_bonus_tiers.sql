-- Update pricing tiers with new bonus structure
-- Presale price is fixed at $0.00417, bonuses are percentage extra tokens

UPDATE pricing_tiers SET 
    price_usd = 0.00417,
    bonus_percentage = 100
WHERE tier_number = 1;

UPDATE pricing_tiers SET 
    price_usd = 0.00417,
    bonus_percentage = 75
WHERE tier_number = 2;

UPDATE pricing_tiers SET 
    price_usd = 0.00417,
    bonus_percentage = 50
WHERE tier_number = 3;

UPDATE pricing_tiers SET 
    price_usd = 0.00417,
    bonus_percentage = 30
WHERE tier_number = 4;

UPDATE pricing_tiers SET 
    price_usd = 0.00417,
    bonus_percentage = 15
WHERE tier_number = 5;

UPDATE pricing_tiers SET 
    price_usd = 0.00417,
    bonus_percentage = 0
WHERE tier_number = 6;

-- Update email_sends to allow commitment_reminder emails (remove unique constraint on waitlist_id)
-- First, create a new index that includes template_key for faster lookups
CREATE INDEX IF NOT EXISTS idx_email_sends_email_template ON email_sends(email, template_key);

