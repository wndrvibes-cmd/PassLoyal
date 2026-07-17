export const REWARD_TYPES = ["points", "stamps", "custom"] as const;
export type RewardType = (typeof REWARD_TYPES)[number];

export interface Merchant {
  id: string;
  user_id: string;
  business_name: string;
  logo_url: string | null;
  phone: string | null;
  email: string | null;
  created_at: string;
}

export interface LoyaltyProgram {
  id: string;
  merchant_id: string;
  name: string;
  description: string | null;
  primary_color: string;
  secondary_color: string;
  logo_url: string | null;
  qr_code_enabled: boolean;
  wallet_enabled: boolean;
  reward_type: RewardType;
  points_per_visit: number;
  points_per_euro: number;
  reward_points: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const GENDERS = ["male", "female", "other"] as const;
export type Gender = (typeof GENDERS)[number];

export const WALLET_PLATFORMS = ["apple", "google"] as const;
export type WalletPlatform = (typeof WALLET_PLATFORMS)[number];

export const LOYALTY_LEVELS = ["bronze", "silver", "gold", "platinum"] as const;
export type LoyaltyLevel = (typeof LOYALTY_LEVELS)[number];

export const VISIT_SOURCES = ["visit", "manual"] as const;
export type VisitSource = (typeof VISIT_SOURCES)[number];

export interface Customer {
  id: string;
  merchant_id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  birthday: string | null;
  gender: Gender | null;
  wallet_platform: WalletPlatform | null;
  total_points: number;
  total_visits: number;
  total_spent: number;
  loyalty_level: LoyaltyLevel;
  is_active: boolean;
  last_visit: string | null;
  created_at: string;
  updated_at: string;
}

export interface CustomerVisit {
  id: string;
  customer_id: string;
  program_id: string | null;
  points_earned: number;
  amount_spent: number;
  source: VisitSource;
  visit_date: string;
  created_at: string;
}

export interface RewardHistoryEntry {
  id: string;
  customer_id: string;
  reward_name: string;
  points_used: number;
  redeemed_at: string;
}
