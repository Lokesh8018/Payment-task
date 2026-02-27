// src/services/processCommission.ts

import { calculateCommission } from '../utils/commissionCalculator';
import { Commission, CommissionBreakdown, User } from '../types';
import { COMMISSION_CONFIG } from '../config/commission';

let commissionIdCounter = 1;

function generateCommissionId(): string {
  return `comm_${Date.now()}_${commissionIdCounter++}`;
}

export interface ProcessCommissionResult {
  commissions: Commission[];
  breakdown: CommissionBreakdown;
}

/**
 * Processes and distributes commission for a buy order.
 *
 * @param orderId      - ID of the buy order
 * @param orderAmount  - Total order amount in ₹
 * @param buyerId      - ID of the buyer
 * @param level1User   - Direct referrer (optional)
 * @param level2User   - Referrer's referrer (optional)
 */
export function processCommission(
  orderId: string,
  orderAmount: number,
  buyerId: string,
  level1User?: User,
  level2User?: User,
): ProcessCommissionResult {
  const breakdown = calculateCommission(
    orderAmount,
    level1User?.id,
    level2User?.id,
  );

  const commissions: Commission[] = [];
  const now = new Date().toISOString();

  if (level1User && breakdown.level1Amount >= COMMISSION_CONFIG.MIN_PAYOUT) {
    commissions.push({
      id: generateCommissionId(),
      fromUserId: buyerId,
      toUserId: level1User.id,
      level: 1,
      amount: breakdown.level1Amount,
      percentage: breakdown.level1Percent,
      orderId,
      createdAt: now,
    });
  }

  if (level2User && breakdown.level2Amount >= COMMISSION_CONFIG.MIN_PAYOUT) {
    commissions.push({
      id: generateCommissionId(),
      fromUserId: buyerId,
      toUserId: level2User.id,
      level: 2,
      amount: breakdown.level2Amount,
      percentage: breakdown.level2Percent,
      orderId,
      createdAt: now,
    });
  }

  return { commissions, breakdown };
}
