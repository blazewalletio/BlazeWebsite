import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

// GET: Fetch top referrers leaderboard
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const email = searchParams.get('email'); // Optional: get specific user's stats
    
    const supabase = createAdminClient();

    // Get top referrers with their referral counts
    const { data: referrers, error: referrersError } = await supabase
      .from('waitlist')
      .select(`
        id,
        email,
        referral_code,
        total_referral_count,
        created_at
      `)
      .gt('total_referral_count', 0)
      .order('total_referral_count', { ascending: false })
      .order('created_at', { ascending: true })
      .limit(limit);

    if (referrersError) {
      console.error('Error fetching referrers:', referrersError);
      return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
    }

    // Get leaderboard rewards
    const { data: rewards, error: rewardsError } = await supabase
      .from('leaderboard_rewards')
      .select('*')
      .eq('is_active', true)
      .order('rank_start');

    if (rewardsError) {
      console.error('Error fetching rewards:', rewardsError);
    }

    // Map referrers with their rewards
    const leaderboard = referrers?.map((referrer, index) => {
      const rank = index + 1;
      const reward = rewards?.find(r => rank >= r.rank_start && rank <= r.rank_end);
      
      // Mask email for privacy (show first 3 chars + domain)
      const emailParts = referrer.email.split('@');
      const maskedEmail = emailParts[0].substring(0, 3) + '***@' + emailParts[1];
      
      return {
        rank,
        email: maskedEmail,
        referralCode: referrer.referral_code,
        referralCount: referrer.total_referral_count,
        badge: reward ? {
          name: reward.badge_name,
          color: reward.badge_color,
        } : null,
        bonusTokens: reward?.bonus_tokens || 0,
        bonusPercentage: reward?.bonus_percentage || 0,
      };
    }) || [];

    // If email is provided, get their specific stats
    let userStats = null;
    if (email) {
      const { data: userData, error: userError } = await supabase
        .from('waitlist')
        .select('id, email, referral_code, total_referral_count, created_at')
        .eq('email', email)
        .single();

      if (!userError && userData) {
        // Find user's rank
        const { count: higherCount } = await supabase
          .from('waitlist')
          .select('*', { count: 'exact', head: true })
          .gt('total_referral_count', userData.total_referral_count || 0);

        const { count: sameCount } = await supabase
          .from('waitlist')
          .select('*', { count: 'exact', head: true })
          .eq('total_referral_count', userData.total_referral_count || 0)
          .lt('created_at', userData.created_at);

        const userRank = (higherCount || 0) + (sameCount || 0) + 1;
        const userReward = rewards?.find(r => userRank >= r.rank_start && userRank <= r.rank_end);

        // Calculate referrals needed for next rank
        let referralsToNextRank = 0;
        if (userRank > 1) {
          const { data: nextRanker } = await supabase
            .from('waitlist')
            .select('total_referral_count')
            .gt('total_referral_count', userData.total_referral_count || 0)
            .order('total_referral_count', { ascending: true })
            .limit(1)
            .single();
          
          referralsToNextRank = nextRanker 
            ? (nextRanker.total_referral_count - (userData.total_referral_count || 0) + 1)
            : 1;
        }

        userStats = {
          rank: userRank,
          referralCode: userData.referral_code,
          referralCount: userData.total_referral_count || 0,
          badge: userReward ? {
            name: userReward.badge_name,
            color: userReward.badge_color,
          } : null,
          bonusTokens: userReward?.bonus_tokens || 0,
          bonusPercentage: userReward?.bonus_percentage || 0,
          referralsToNextRank,
          referralLink: `https://www.blazewallet.io?ref=${userData.referral_code}`,
        };
      }
    }

    // Get total waitlist count for context
    const { count: totalWaitlist } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({
      leaderboard,
      rewards: rewards || [],
      totalParticipants: totalWaitlist || 0,
      userStats,
    });
  } catch (error) {
    console.error('Error in leaderboard API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


