// __tests__/newbieReward.test.ts

import { applyNewbieDiscount } from '../src/utils/commissionCalculator';
import { NEWBIE_REWARD_AMOUNT } from '../src/config/constants';

describe('Newbie Reward Discount', () => {
  describe('applyNewbieDiscount', () => {
    it('should apply discount for a new user who has not claimed reward', () => {
      const price = 1000;
      const discounted = applyNewbieDiscount(price, NEWBIE_REWARD_AMOUNT, true, false);
      expect(discounted).toBe(1000 - NEWBIE_REWARD_AMOUNT);
    });

    it('should NOT apply discount if user is not a newbie', () => {
      const price = 1000;
      const discounted = applyNewbieDiscount(price, NEWBIE_REWARD_AMOUNT, false, false);
      expect(discounted).toBe(1000);
    });

    it('should NOT apply discount if reward already claimed', () => {
      const price = 1000;
      const discounted = applyNewbieDiscount(price, NEWBIE_REWARD_AMOUNT, true, true);
      expect(discounted).toBe(1000);
    });

    it('should return 0 if discount is greater than price', () => {
      const price = 100;
      const discounted = applyNewbieDiscount(price, NEWBIE_REWARD_AMOUNT, true, false);
      expect(discounted).toBe(0);
    });

    it('should return exact 0 if discount equals price', () => {
      const price = NEWBIE_REWARD_AMOUNT;
      const discounted = applyNewbieDiscount(price, NEWBIE_REWARD_AMOUNT, true, false);
      expect(discounted).toBe(0);
    });

    it('should handle decimal prices correctly', () => {
      const price = 599.99;
      const discounted = applyNewbieDiscount(price, NEWBIE_REWARD_AMOUNT, true, false);
      expect(discounted).toBeCloseTo(599.99 - NEWBIE_REWARD_AMOUNT, 2);
    });

    it('NEWBIE_REWARD_AMOUNT should be 350', () => {
      expect(NEWBIE_REWARD_AMOUNT).toBe(350);
    });
  });

  describe('Discount scenarios', () => {
    it('should save exactly ₹350 on a ₹1000 purchase as newbie', () => {
      const originalPrice = 1000;
      const discountedPrice = applyNewbieDiscount(originalPrice, NEWBIE_REWARD_AMOUNT, true, false);
      const saved = originalPrice - discountedPrice;
      expect(saved).toBe(350);
    });

    it('should have no savings for returning user', () => {
      const originalPrice = 1000;
      const discountedPrice = applyNewbieDiscount(originalPrice, NEWBIE_REWARD_AMOUNT, false, false);
      const saved = originalPrice - discountedPrice;
      expect(saved).toBe(0);
    });
  });
});
