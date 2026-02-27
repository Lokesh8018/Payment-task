// __tests__/priceCalculation.test.ts

import { calculateCommission, applyNewbieDiscount } from '../src/utils/commissionCalculator';
import { NEWBIE_REWARD_AMOUNT } from '../src/config/constants';
import { COMMISSION_CONFIG } from '../src/config/commission';

describe('Combined Price Calculation (Newbie + Commission)', () => {
  describe('Full purchase price for newbie with L1+L2', () => {
    it('should correctly compute final price after newbie discount', () => {
      const tokenCount = 10;
      const pricePerToken = 100;
      const totalPrice = tokenCount * pricePerToken; // 1000

      // Apply newbie discount
      const finalPrice = applyNewbieDiscount(totalPrice, NEWBIE_REWARD_AMOUNT, true, false);
      expect(finalPrice).toBe(650); // 1000 - 350

      // Commission is still on the full order amount
      const commission = calculateCommission(totalPrice, 'user_l1', 'user_l2');
      expect(commission.total).toBe(27);
      expect(commission.level1Amount).toBe(18);
      expect(commission.level2Amount).toBe(6);
      expect(commission.platformAmount).toBe(3);
    });

    it('should compute commission on original price, not discounted price', () => {
      const totalPrice = 2000;
      const discountedPrice = applyNewbieDiscount(totalPrice, NEWBIE_REWARD_AMOUNT, true, false);
      expect(discountedPrice).toBe(1650);

      // Commission calculated on original 2000
      const commission = calculateCommission(totalPrice, 'user_l1', 'user_l2');
      expect(commission.total).toBeCloseTo(54, 2);
    });
  });

  describe('Non-newbie purchase with L1 only', () => {
    it('should not apply discount for non-newbie', () => {
      const totalPrice = 1000;
      const finalPrice = applyNewbieDiscount(totalPrice, NEWBIE_REWARD_AMOUNT, false, false);
      expect(finalPrice).toBe(1000);

      const commission = calculateCommission(totalPrice, 'user_l1');
      expect(commission.level1Amount).toBe(18);
      expect(commission.level2Amount).toBe(0);
      expect(commission.platformAmount).toBeCloseTo(9, 1);
    });
  });

  describe('Newbie discount claimed on previous purchase', () => {
    it('should not apply discount if already claimed', () => {
      const totalPrice = 1000;
      const finalPrice = applyNewbieDiscount(totalPrice, NEWBIE_REWARD_AMOUNT, true, true);
      expect(finalPrice).toBe(1000); // no discount applied
    });
  });

  describe('Commission totals with various amounts', () => {
    const testCases = [
      { amount: 100, expected: 2.7 },
      { amount: 1000, expected: 27 },
      { amount: 5000, expected: 135 },
      { amount: 10000, expected: 270 },
    ];

    testCases.forEach(({ amount, expected }) => {
      it(`should compute ${COMMISSION_CONFIG.TOTAL_PERCENT}% of ${amount} as ${expected}`, () => {
        const result = calculateCommission(amount, 'l1', 'l2');
        expect(result.total).toBeCloseTo(expected, 1);
      });
    });
  });

  describe('Platform takes all when no referrer', () => {
    it('platform should receive full commission for orphan buyers', () => {
      const result = calculateCommission(1000);
      expect(result.platformAmount).toBe(result.total);
      expect(result.level1Amount).toBe(0);
      expect(result.level2Amount).toBe(0);
    });
  });
});
