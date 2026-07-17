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
