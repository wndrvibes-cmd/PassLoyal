export const REWARD_TYPES = ["points", "stamps", "custom"] as const;
export type RewardType = (typeof REWARD_TYPES)[number];

export const ROLES = ["super_admin", "merchant", "staff", "customer"] as const;
export type Role = (typeof ROLES)[number];

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  role: Role;
  created_at: string;
  updated_at: string;
}

export const MERCHANT_STATUSES = ["active", "suspended"] as const;
export type MerchantStatus = (typeof MERCHANT_STATUSES)[number];

export interface Merchant {
  id: string;
  user_id: string;
  business_name: string;
  logo_url: string | null;
  phone: string | null;
  email: string | null;
  status: MerchantStatus;
  created_at: string;
}

export const SUBSCRIPTION_PLANS = ["starter", "pro", "premium"] as const;
export type SubscriptionPlan = (typeof SUBSCRIPTION_PLANS)[number];

export const SUBSCRIPTION_STATUSES = ["trialing", "active", "past_due", "canceled"] as const;
export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUSES)[number];

export interface Subscription {
  id: string;
  merchant_id: string;
  plan: SubscriptionPlan;
  price: number;
  status: SubscriptionStatus;
  current_period_end: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  created_at: string;
  updated_at: string;
}

export const SUBSCRIPTION_PAYMENT_STATUSES = ["paid", "failed", "refunded"] as const;
export type SubscriptionPaymentStatus = (typeof SUBSCRIPTION_PAYMENT_STATUSES)[number];

export interface SubscriptionPayment {
  id: string;
  subscription_id: string;
  amount: number;
  currency: string;
  status: SubscriptionPaymentStatus;
  paid_at: string;
  stripe_invoice_id: string | null;
  created_at: string;
}

export interface AuditLog {
  id: string;
  actor_id: string | null;
  actor_email: string | null;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface PlatformSettings {
  id: string;
  is_singleton: boolean;
  platform_name: string;
  logo_url: string | null;
  support_email: string | null;
  maintenance_mode: boolean;
  wallet_default_primary_color: string;
  wallet_default_secondary_color: string;
  created_at: string;
  updated_at: string;
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

export interface WalletCardDesign {
  id: string;
  merchant_id: string;
  business_name: string | null;
  description: string | null;
  logo_url: string | null;
  icon_url: string | null;
  banner_url: string | null;
  primary_color: string;
  secondary_color: string;
  address: string | null;
  phone: string | null;
  website: string | null;
  social_links: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export interface WalletPass {
  id: string;
  customer_id: string;
  card_design_id: string;
  token: string;
  apple_added_at: string | null;
  google_added_at: string | null;
  created_at: string;
  updated_at: string;
}

export const WALLET_SCAN_ACTIONS = ["view", "add_points", "remove_points", "redeem_reward"] as const;
export type WalletScanAction = (typeof WALLET_SCAN_ACTIONS)[number];

export interface WalletScan {
  id: string;
  customer_id: string;
  action: WalletScanAction;
  created_at: string;
}

export const NOTIFICATION_TYPES = [
  "points_earned",
  "reward_unlocked",
  "special_offer",
  "promotion",
  "birthday",
  "card_updated",
] as const;
export type NotificationType = (typeof NOTIFICATION_TYPES)[number];

export interface AppNotification {
  id: string;
  customer_id: string;
  type: NotificationType;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface PublicWalletCard {
  token: string;
  first_name: string;
  last_name: string;
  total_points: number;
  total_visits: number;
  loyalty_level: LoyaltyLevel;
  member_since: string;
  last_visit: string | null;
  business_name: string | null;
  card_description: string | null;
  logo_url: string | null;
  icon_url: string | null;
  banner_url: string | null;
  primary_color: string;
  secondary_color: string;
  address: string | null;
  phone: string | null;
  website: string | null;
  social_links: Record<string, string>;
  apple_added_at: string | null;
  google_added_at: string | null;
}
