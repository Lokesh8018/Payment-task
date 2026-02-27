// src/utils/commissionCalculator.ts

import { COMMISSION_CONFIG } from '../config/commission';
import { CommissionBreakdown } from '../types';

/**
 * Calculates commission breakdown for a given order amount.
 *
 * Rules:
 * - No referrer:     platform gets all 2.7%
 * - L1 only:         L1=1.8%, platform=0.6%+0.3%=0.9%
 * - Both L1 + L2:    L1=1.8%, L2=0.6%, platform=0.3%
 */
export function calculateCommission(
  orderAmount: number,
  level1Id?: string,
  level2Id?: string,
): CommissionBreakdown {
  if (orderAmount <= 0) {
    return {
      total: 0,
      level1Amount: 0,
      level2Amount: 0,
      platformAmount: 0,
      level1Percent: 0,
      level2Percent: 0,
    };
  }

  const total = parseFloat(((orderAmount * COMMISSION_CONFIG.TOTAL_PERCENT) / 100).toFixed(2));

  const hasLevel1 = Boolean(level1Id);
  const hasLevel2 = Boolean(level1Id && level2Id);

  let level1Amount = 0;
  let level2Amount = 0;
  let platformAmount = 0;
  let level1Percent = 0;
  let level2Percent = 0;

  if (!hasLevel1) {
    // No referrer — platform keeps everything
    platformAmount = total;
  } else if (hasLevel1 && !hasLevel2) {
    // L1 only
    level1Percent = COMMISSION_CONFIG.LEVEL_1_PERCENT;
    level1Amount = parseFloat(((orderAmount * level1Percent) / 100).toFixed(2));
    platformAmount = parseFloat((total - level1Amount).toFixed(2));
  } else {
    // Both L1 and L2
    level1Percent = COMMISSION_CONFIG.LEVEL_1_PERCENT;
    level2Percent = COMMISSION_CONFIG.LEVEL_2_PERCENT;
    level1Amount = parseFloat(((orderAmount * level1Percent) / 100).toFixed(2));
    level2Amount = parseFloat(((orderAmount * level2Percent) / 100).toFixed(2));
    platformAmount = parseFloat((total - level1Amount - level2Amount).toFixed(2));
  }

  return {
    total,
    level1Amount,
    level2Amount,
    platformAmount,
    level1Percent,
    level2Percent,
  };
}

export function applyNewbieDiscount(
  totalPrice: number,
  discountAmount: number,
  isNewbie: boolean,
  rewardClaimed: boolean,
): number {
  if (!isNewbie || rewardClaimed) return totalPrice;
  const discounted = totalPrice - discountAmount;
  return discounted < 0 ? 0 : parseFloat(discounted.toFixed(2));
}
