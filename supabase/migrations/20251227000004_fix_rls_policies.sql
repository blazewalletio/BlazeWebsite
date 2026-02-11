-- Fix RLS policies for admin access

-- Drop existing policies that might be blocking
DROP POLICY IF EXISTS "Public can view pricing tiers" ON pricing_tiers;
DROP POLICY IF EXISTS "Public can view leaderboard rewards" ON leaderboard_rewards;
DROP POLICY IF EXISTS "Service role full access to pricing_tiers" ON pricing_tiers;
DROP POLICY IF EXISTS "Service role full access to commitments" ON commitments;
DROP POLICY IF EXISTS "Service role full access to email_campaigns" ON email_campaigns;
DROP POLICY IF EXISTS "Service role full access to email_sends" ON email_sends;
DROP POLICY IF EXISTS "Service role full access to leaderboard_rewards" ON leaderboard_rewards;
DROP POLICY IF EXISTS "Service role full access to presale_buyers" ON presale_buyers;

-- Authenticated users can read all data (for admin panel)
CREATE POLICY "Authenticated can view pricing_tiers" ON pricing_tiers
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated can view commitments" ON commitments
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated can update commitments" ON commitments
    FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated can view email_campaigns" ON email_campaigns
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated can update email_campaigns" ON email_campaigns
    FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated can view email_sends" ON email_sends
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated can view leaderboard_rewards" ON leaderboard_rewards
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated can view presale_buyers" ON presale_buyers
    FOR SELECT TO authenticated USING (true);

-- Public can view pricing tiers and leaderboard rewards (for frontend)
CREATE POLICY "Public can view pricing tiers" ON pricing_tiers
    FOR SELECT TO anon USING (is_active = true);

CREATE POLICY "Public can view leaderboard rewards" ON leaderboard_rewards
    FOR SELECT TO anon USING (is_active = true);

-- Service role has full access (for API routes using admin client)
CREATE POLICY "Service role full access to pricing_tiers" ON pricing_tiers
    FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access to commitments" ON commitments
    FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access to email_campaigns" ON email_campaigns
    FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access to email_sends" ON email_sends
    FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access to leaderboard_rewards" ON leaderboard_rewards
    FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access to presale_buyers" ON presale_buyers
    FOR ALL TO service_role USING (true) WITH CHECK (true);


