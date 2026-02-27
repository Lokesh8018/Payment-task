// src/hooks/useNewbieReward.ts

import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS, NEWBIE_REWARD_AMOUNT } from '../config/constants';

export interface NewbieRewardState {
  isNewbie: boolean;
  rewardClaimed: boolean;
  discountAmount: number;
  showCelebration: boolean;
  claimReward: () => Promise<void>;
  dismissCelebration: () => void;
  getDiscountedPrice: (originalPrice: number) => number;
}

export function useNewbieReward(): NewbieRewardState {
  const [isNewbie, setIsNewbie] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const claimed = await AsyncStorage.getItem(STORAGE_KEYS.NEWBIE_REWARD_CLAIMED);
        const firstBuy = await AsyncStorage.getItem(STORAGE_KEYS.FIRST_BUY_DONE);
        if (!firstBuy) {
          setIsNewbie(true);
        }
        if (claimed === 'true') {
          setRewardClaimed(true);
        }
      } catch {
        // ignore
      }
    };
    void load();
  }, []);

  const claimReward = useCallback(async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.NEWBIE_REWARD_CLAIMED, 'true');
      await AsyncStorage.setItem(STORAGE_KEYS.FIRST_BUY_DONE, 'true');
      setRewardClaimed(true);
      setIsNewbie(false);
      setShowCelebration(true);
    } catch {
      // ignore
    }
  }, []);

  const dismissCelebration = useCallback(() => {
    setShowCelebration(false);
  }, []);

  const getDiscountedPrice = useCallback(
    (originalPrice: number): number => {
      if (!isNewbie || rewardClaimed) return originalPrice;
      const discounted = originalPrice - NEWBIE_REWARD_AMOUNT;
      return discounted < 0 ? 0 : parseFloat(discounted.toFixed(2));
    },
    [isNewbie, rewardClaimed],
  );

  return {
    isNewbie,
    rewardClaimed,
    discountAmount: NEWBIE_REWARD_AMOUNT,
    showCelebration,
    claimReward,
    dismissCelebration,
    getDiscountedPrice,
  };
}
