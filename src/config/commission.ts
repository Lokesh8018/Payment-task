// src/config/commission.ts

export const COMMISSION_CONFIG = {
  TOTAL_PERCENT: 2.7,
  LEVEL_1_PERCENT: 1.8,
  LEVEL_2_PERCENT: 0.6,
  PLATFORM_PERCENT: 0.3,
  MIN_PAYOUT: 10,
  CREDIT_MODE: 'instant' as const,
} as const;
