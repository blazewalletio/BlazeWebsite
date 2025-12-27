-- =====================================================
-- BLAZE CONVERSION FEATURES DATABASE SCHEMA
-- Email Drip Campaigns, Tiered Pricing, Commitments, Leaderboard
-- =====================================================

-- 1. PRICING TIERS TABLE
-- Stores the tiered pricing structure for presale
-- =====================================================
CREATE TABLE IF NOT EXISTS pricing_tiers (
    id SERIAL PRIMARY KEY,
    tier_number INT NOT NULL UNIQUE,
    tier_name VARCHAR(100) NOT NULL,
    min_buyers INT NOT NULL,
    max_buyers INT NOT NULL,
    price_usd DECIMAL(10, 6) NOT NULL,
    bonus_percentage INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert the pricing tiers
INSERT INTO pricing_tiers (tier_number, tier_name, min_buyers, max_buyers, price_usd, bonus_percentage) VALUES
(1, 'Founders', 1, 100, 0.0015, 50),
(2, 'Early Birds', 101, 250, 0.00225, 35),
(3, 'Pioneers', 251, 500, 0.003, 25),
(4, 'Adopters', 501, 1000, 0.0035, 15),
(5, 'Supporters', 1001, 2000, 0.00425, 10),
(6, 'Public', 2001, 999999, 0.005, 0)
ON CONFLICT (tier_number) DO UPDATE SET
    tier_name = EXCLUDED.tier_name,
    min_buyers = EXCLUDED.min_buyers,
    max_buyers = EXCLUDED.max_buyers,
    price_usd = EXCLUDED.price_usd,
    bonus_percentage = EXCLUDED.bonus_percentage;

-- 2. COMMITMENTS TABLE
-- Stores user purchase intentions (skin in the game)
-- =====================================================
CREATE TABLE IF NOT EXISTS commitments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    waitlist_id UUID REFERENCES waitlist(id) ON DELETE SET NULL,
    intended_amount_usd DECIMAL(12, 2) NOT NULL,
    intended_amount_tokens DECIMAL(18, 2),
    commitment_tier INT,
    notes TEXT,
    reminder_sent BOOLEAN DEFAULT false,
    converted BOOLEAN DEFAULT false,
    converted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(email)
);

-- 3. EMAIL CAMPAIGNS TABLE
-- Defines drip campaign sequences
-- =====================================================
CREATE TABLE IF NOT EXISTS email_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_name VARCHAR(100) NOT NULL,
    campaign_type VARCHAR(50) NOT NULL DEFAULT 'drip',
    sequence_order INT NOT NULL,
    subject VARCHAR(255) NOT NULL,
    template_key VARCHAR(100) NOT NULL UNIQUE,
    days_after_signup INT NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert drip campaign sequence
INSERT INTO email_campaigns (campaign_name, campaign_type, sequence_order, subject, template_key, days_after_signup) VALUES
('Waitlist Drip', 'drip', 0, '🔥 Welcome to the BLAZE Waitlist!', 'welcome', 0),
('Waitlist Drip', 'drip', 1, '💡 Why BLAZE? The Future of Crypto Payments', 'why_blaze', 3),
('Waitlist Drip', 'drip', 2, '🚀 {{count}} People Are Already Waiting!', 'social_proof', 7),
('Waitlist Drip', 'drip', 3, '⏰ Early Bird Pricing Won''t Last Forever', 'fomo_pricing', 14),
('Waitlist Drip', 'drip', 4, '🎁 Exclusive Bonus for Early Supporters', 'exclusive_bonus', 21),
('Waitlist Drip', 'drip', 5, '📅 Presale Countdown: Get Ready!', 'presale_countdown', 28)
ON CONFLICT (template_key) DO NOTHING;

-- 4. EMAIL SENDS TABLE
-- Tracks which emails have been sent to which users
-- =====================================================
CREATE TABLE IF NOT EXISTS email_sends (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    waitlist_id UUID REFERENCES waitlist(id) ON DELETE CASCADE,
    campaign_id UUID REFERENCES email_campaigns(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    template_key VARCHAR(100) NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    opened_at TIMESTAMP WITH TIME ZONE,
    clicked_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'sent',
    UNIQUE(waitlist_id, template_key)
);

-- 5. LEADERBOARD REWARDS TABLE
-- Defines rewards for top referrers
-- =====================================================
CREATE TABLE IF NOT EXISTS leaderboard_rewards (
    id SERIAL PRIMARY KEY,
    rank_start INT NOT NULL,
    rank_end INT NOT NULL,
    reward_description VARCHAR(255) NOT NULL,
    bonus_tokens INT DEFAULT 0,
    bonus_percentage INT DEFAULT 0,
    badge_name VARCHAR(100),
    badge_color VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert leaderboard rewards
INSERT INTO leaderboard_rewards (rank_start, rank_end, reward_description, bonus_tokens, bonus_percentage, badge_name, badge_color) VALUES
(1, 1, '🥇 #1 Referrer: 100,000 Bonus BLAZE Tokens', 100000, 100, 'Champion', '#FFD700'),
(2, 2, '🥈 #2 Referrer: 50,000 Bonus BLAZE Tokens', 50000, 75, 'Elite', '#C0C0C0'),
(3, 3, '🥉 #3 Referrer: 25,000 Bonus BLAZE Tokens', 25000, 50, 'Pro', '#CD7F32'),
(4, 10, '🏅 Top 10: 10,000 Bonus BLAZE Tokens', 10000, 25, 'Star', '#FF6B35'),
(11, 25, '⭐ Top 25: 5,000 Bonus BLAZE Tokens', 5000, 15, 'Rising', '#F97316'),
(26, 50, '✨ Top 50: 2,500 Bonus BLAZE Tokens', 2500, 10, 'Supporter', '#EAB308'),
(51, 100, '🌟 Top 100: 1,000 Bonus BLAZE Tokens', 1000, 5, 'Member', '#22C55E')
ON CONFLICT DO NOTHING;

-- 6. ADD COLUMNS TO WAITLIST TABLE
-- =====================================================
ALTER TABLE waitlist 
ADD COLUMN IF NOT EXISTS last_email_sent VARCHAR(100),
ADD COLUMN IF NOT EXISTS next_email_due TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS email_paused BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS leaderboard_rank INT,
ADD COLUMN IF NOT EXISTS total_referral_count INT DEFAULT 0;

-- 7. PRESALE BUYERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS presale_buyers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    waitlist_id UUID REFERENCES waitlist(id) ON DELETE SET NULL,
    wallet_address VARCHAR(255),
    amount_usd DECIMAL(12, 2) NOT NULL,
    amount_tokens DECIMAL(18, 2) NOT NULL,
    price_per_token DECIMAL(10, 6) NOT NULL,
    tier_at_purchase INT,
    bonus_tokens DECIMAL(18, 2) DEFAULT 0,
    payment_method VARCHAR(50),
    transaction_hash VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending',
    purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    confirmed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. CREATE FUNCTIONS FOR STATISTICS
-- =====================================================

-- Drop existing functions first to allow signature changes
DROP FUNCTION IF EXISTS get_current_tier();
DROP FUNCTION IF EXISTS get_top_referrers(INT);
DROP FUNCTION IF EXISTS get_top_referrers();
DROP FUNCTION IF EXISTS get_user_referral_stats(VARCHAR);

-- Function to get current pricing tier based on buyer count
CREATE OR REPLACE FUNCTION get_current_tier()
RETURNS TABLE (
    tier_number INT,
    tier_name VARCHAR(100),
    price_usd DECIMAL(10, 6),
    bonus_percentage INT,
    spots_remaining INT,
    total_buyers INT
) AS $$
DECLARE
    buyer_count INT;
BEGIN
    SELECT COUNT(*) INTO buyer_count FROM presale_buyers WHERE status IN ('confirmed', 'completed');
    
    RETURN QUERY
    SELECT 
        pt.tier_number,
        pt.tier_name,
        pt.price_usd,
        pt.bonus_percentage,
        (pt.max_buyers - buyer_count)::INT as spots_remaining,
        buyer_count as total_buyers
    FROM pricing_tiers pt
    WHERE pt.is_active = true
    AND buyer_count >= pt.min_buyers - 1
    AND buyer_count < pt.max_buyers
    ORDER BY pt.tier_number
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Function to get top referrers for leaderboard
CREATE OR REPLACE FUNCTION get_top_referrers(limit_count INT DEFAULT 50)
RETURNS TABLE (
    referrer_rank BIGINT,
    referrer_email VARCHAR(255),
    referrer_code VARCHAR(50),
    referrer_count BIGINT,
    referrer_badge_name VARCHAR(100),
    referrer_badge_color VARCHAR(50),
    referrer_bonus_tokens INT
) AS $$
BEGIN
    RETURN QUERY
    WITH ranked_referrers AS (
        SELECT 
            ROW_NUMBER() OVER (ORDER BY COUNT(w2.id) DESC, w.created_at ASC) as rrank,
            w.email as remail,
            w.referral_code as rcode,
            COUNT(w2.id) as rcount
        FROM waitlist w
        LEFT JOIN waitlist w2 ON w2.referred_by = w.referral_code
        WHERE w.referral_code IS NOT NULL
        GROUP BY w.id, w.email, w.referral_code, w.created_at
        HAVING COUNT(w2.id) > 0
    )
    SELECT 
        rr.rrank,
        rr.remail,
        rr.rcode,
        rr.rcount,
        lr.badge_name,
        lr.badge_color,
        lr.bonus_tokens
    FROM ranked_referrers rr
    LEFT JOIN leaderboard_rewards lr ON rr.rrank >= lr.rank_start AND rr.rrank <= lr.rank_end
    ORDER BY rr.rrank
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Function to get user's referral stats
CREATE OR REPLACE FUNCTION get_user_referral_stats(user_email VARCHAR(255))
RETURNS TABLE (
    user_referral_code VARCHAR(50),
    user_referral_count BIGINT,
    user_current_rank BIGINT,
    user_badge_name VARCHAR(100),
    user_badge_color VARCHAR(50),
    user_bonus_tokens INT,
    user_referrals_to_next INT
) AS $$
DECLARE
    v_user_rank BIGINT;
    v_user_count BIGINT;
    v_next_rank_count BIGINT;
BEGIN
    -- Get user's rank and count
    WITH ranked AS (
        SELECT 
            w.email,
            w.referral_code,
            COUNT(w2.id) as ref_count,
            ROW_NUMBER() OVER (ORDER BY COUNT(w2.id) DESC, w.created_at ASC) as urank
        FROM waitlist w
        LEFT JOIN waitlist w2 ON w2.referred_by = w.referral_code
        WHERE w.referral_code IS NOT NULL
        GROUP BY w.id, w.email, w.referral_code, w.created_at
    )
    SELECT urank, ref_count INTO v_user_rank, v_user_count
    FROM ranked
    WHERE email = user_email;
    
    -- Calculate referrals needed for next rank
    IF v_user_rank > 1 THEN
        WITH ranked AS (
            SELECT 
                COUNT(w2.id) as ref_count,
                ROW_NUMBER() OVER (ORDER BY COUNT(w2.id) DESC, w.created_at ASC) as urank
            FROM waitlist w
            LEFT JOIN waitlist w2 ON w2.referred_by = w.referral_code
            WHERE w.referral_code IS NOT NULL
            GROUP BY w.id, w.created_at
        )
        SELECT ref_count INTO v_next_rank_count
        FROM ranked
        WHERE urank = v_user_rank - 1;
    ELSE
        v_next_rank_count := v_user_count;
    END IF;
    
    RETURN QUERY
    SELECT 
        w.referral_code,
        COALESCE(v_user_count, 0::BIGINT),
        COALESCE(v_user_rank, 0::BIGINT),
        lr.badge_name,
        lr.badge_color,
        lr.bonus_tokens,
        (COALESCE(v_next_rank_count, 0) - COALESCE(v_user_count, 0) + 1)::INT
    FROM waitlist w
    LEFT JOIN leaderboard_rewards lr ON COALESCE(v_user_rank, 999) >= lr.rank_start AND COALESCE(v_user_rank, 999) <= lr.rank_end
    WHERE w.email = user_email;
END;
$$ LANGUAGE plpgsql;

-- 9. ROW LEVEL SECURITY POLICIES
-- =====================================================

-- Enable RLS on new tables
ALTER TABLE pricing_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE commitments ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_sends ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE presale_buyers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view pricing tiers" ON pricing_tiers;
DROP POLICY IF EXISTS "Public can view leaderboard rewards" ON leaderboard_rewards;
DROP POLICY IF EXISTS "Service role full access to pricing_tiers" ON pricing_tiers;
DROP POLICY IF EXISTS "Service role full access to commitments" ON commitments;
DROP POLICY IF EXISTS "Service role full access to email_campaigns" ON email_campaigns;
DROP POLICY IF EXISTS "Service role full access to email_sends" ON email_sends;
DROP POLICY IF EXISTS "Service role full access to leaderboard_rewards" ON leaderboard_rewards;
DROP POLICY IF EXISTS "Service role full access to presale_buyers" ON presale_buyers;

-- Public read access for pricing tiers and leaderboard rewards
CREATE POLICY "Public can view pricing tiers" ON pricing_tiers
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view leaderboard rewards" ON leaderboard_rewards
    FOR SELECT USING (is_active = true);

-- Service role has full access (for API routes)
CREATE POLICY "Service role full access to pricing_tiers" ON pricing_tiers
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access to commitments" ON commitments
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access to email_campaigns" ON email_campaigns
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access to email_sends" ON email_sends
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access to leaderboard_rewards" ON leaderboard_rewards
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access to presale_buyers" ON presale_buyers
    FOR ALL USING (auth.role() = 'service_role');

-- 10. INDEXES FOR PERFORMANCE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_commitments_email ON commitments(email);
CREATE INDEX IF NOT EXISTS idx_email_sends_waitlist ON email_sends(waitlist_id);
CREATE INDEX IF NOT EXISTS idx_email_sends_template ON email_sends(template_key);
CREATE INDEX IF NOT EXISTS idx_presale_buyers_email ON presale_buyers(email);
CREATE INDEX IF NOT EXISTS idx_presale_buyers_status ON presale_buyers(status);
CREATE INDEX IF NOT EXISTS idx_waitlist_referred_by ON waitlist(referred_by);
CREATE INDEX IF NOT EXISTS idx_waitlist_referral_code ON waitlist(referral_code);

-- 11. TRIGGER TO UPDATE REFERRAL COUNTS
-- =====================================================
CREATE OR REPLACE FUNCTION update_referral_count()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.referred_by IS NOT NULL THEN
        UPDATE waitlist 
        SET total_referral_count = (
            SELECT COUNT(*) FROM waitlist WHERE referred_by = NEW.referred_by
        )
        WHERE referral_code = NEW.referred_by;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_referral_count ON waitlist;
CREATE TRIGGER trigger_update_referral_count
    AFTER INSERT ON waitlist
    FOR EACH ROW
    EXECUTE FUNCTION update_referral_count();

