// __tests__/commissionCalculator.test.ts

import { calculateCommission } from '../src/utils/commissionCalculator';
import { COMMISSION_CONFIG } from '../src/config/commission';

describe('calculateCommission', () => {
  describe('No referrer (platform gets all)', () => {
    it('should give all 2.7% to platform when no referrer', () => {
      const result = calculateCommission(1000);
      expect(result.total).toBe(27);
      expect(result.level1Amount).toBe(0);
      expect(result.level2Amount).toBe(0);
      expect(result.platformAmount).toBe(27);
      expect(result.level1Percent).toBe(0);
      expect(result.level2Percent).toBe(0);
    });

    it('should give all 2.7% to platform when only level2 is provided without level1', () => {
      // level2 without level1 is not a valid scenario; should treat as no referrer
      const result = calculateCommission(1000, undefined, 'user_l2');
      expect(result.level1Amount).toBe(0);
      expect(result.level2Amount).toBe(0);
      expect(result.platformAmount).toBe(27);
    });
  });

  describe('L1 only (no L2)', () => {
    it('should split: L1=1.8%, platform=0.9% when only level1 exists', () => {
      const result = calculateCommission(1000, 'user_l1');
      expect(result.level1Percent).toBe(COMMISSION_CONFIG.LEVEL_1_PERCENT);
      expect(result.level1Amount).toBe(18);
      expect(result.level2Amount).toBe(0);
      expect(result.platformAmount).toBeCloseTo(9, 1);
      expect(result.total).toBe(27);
    });

    it('should handle large amounts correctly with L1 only', () => {
      const result = calculateCommission(10000, 'user_l1');
      expect(result.level1Amount).toBe(180);
      expect(result.total).toBe(270);
    });
  });

  describe('Both L1 and L2', () => {
    it('should split: L1=1.8%, L2=0.6%, platform=0.3% when both exist', () => {
      const result = calculateCommission(1000, 'user_l1', 'user_l2');
      expect(result.level1Amount).toBe(18);
      expect(result.level2Amount).toBe(6);
      expect(result.platformAmount).toBe(3);
      expect(result.total).toBe(27);
      expect(result.level1Percent).toBe(COMMISSION_CONFIG.LEVEL_1_PERCENT);
      expect(result.level2Percent).toBe(COMMISSION_CONFIG.LEVEL_2_PERCENT);
    });

    it('should have L1+L2+platform equal total commission', () => {
      const amount = 2450;
      const result = calculateCommission(amount, 'user_l1', 'user_l2');
      const sum = result.level1Amount + result.level2Amount + result.platformAmount;
      expect(Math.abs(sum - result.total)).toBeLessThan(0.02);
    });
  });

  describe('Edge cases', () => {
    it('should return all zeros for zero amount', () => {
      const result = calculateCommission(0);
      expect(result.total).toBe(0);
      expect(result.level1Amount).toBe(0);
      expect(result.level2Amount).toBe(0);
      expect(result.platformAmount).toBe(0);
    });

    it('should return all zeros for negative amount', () => {
      const result = calculateCommission(-500);
      expect(result.total).toBe(0);
    });

    it('should correctly compute total as 2.7% of order amount', () => {
      const result = calculateCommission(5000, 'user_l1', 'user_l2');
      expect(result.total).toBeCloseTo(5000 * 0.027, 2);
    });

    it('should handle fractional amounts', () => {
      const result = calculateCommission(333.33, 'user_l1', 'user_l2');
      expect(result.total).toBeCloseTo(333.33 * 0.027, 2);
    });
  });
});
