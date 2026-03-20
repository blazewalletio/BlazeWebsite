/**
 * One-click reasons in the "haven't bought yet" survey (commitment list email).
 * Keys are stable for analytics; labels are human-readable in admin.
 */

export type CommitmentFeedbackReasonKey =
  | 'wallet_confused'
  | 'not_ready_timing'
  | 'budget_price'
  | 'need_trust_info'
  | 'technical_issue'
  | 'prefers_human_help'
  | 'other';

export interface CommitmentFeedbackReason {
  key: CommitmentFeedbackReasonKey;
  /** Short line for the email link (clickable) */
  emailLabel: string;
  /** Full label for admin / DB */
  adminLabel: string;
}

export const COMMITMENT_FEEDBACK_REASONS: CommitmentFeedbackReason[] = [
  {
    key: 'wallet_confused',
    emailLabel: "I'm not sure how to use the wallet or complete the purchase",
    adminLabel: 'Wallet / purchase flow unclear',
  },
  {
    key: 'not_ready_timing',
    emailLabel: "I haven't had time yet / waiting for the right moment",
    adminLabel: 'Timing – not ready yet',
  },
  {
    key: 'budget_price',
    emailLabel: 'Budget or price concerns',
    adminLabel: 'Budget / price concerns',
  },
  {
    key: 'need_trust_info',
    emailLabel: 'I need more information before I feel comfortable buying',
    adminLabel: 'Needs more info / reassurance',
  },
  {
    key: 'technical_issue',
    emailLabel: 'I ran into a technical issue (payment, chain, or app)',
    adminLabel: 'Technical issue',
  },
  {
    key: 'prefers_human_help',
    emailLabel: "I'd like personal help from the BLAZE team",
    adminLabel: 'Wants personal / team support',
  },
  {
    key: 'other',
    emailLabel: 'Something else — I’ll tell you on the next page',
    adminLabel: 'Other (see note)',
  },
];

export function getCommitmentFeedbackReason(
  key: string
): CommitmentFeedbackReason | undefined {
  return COMMITMENT_FEEDBACK_REASONS.find((r) => r.key === key);
}
