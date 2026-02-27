// src/context/UserContext.tsx

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, UserContextState } from '../types';
import { STORAGE_KEYS } from '../config/constants';
import { CURRENT_USER } from '../data/mockData';

interface UserContextValue extends UserContextState {
  updateBalance: (delta: number) => void;
  updateTokenBalance: (delta: number) => void;
  claimNewbieReward: () => void;
  setUser: (user: User) => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEYS.USER);
        if (stored) {
          setUserState(JSON.parse(stored) as User);
        } else {
          setUserState(CURRENT_USER);
          await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(CURRENT_USER));
        }
      } catch {
        setUserState(CURRENT_USER);
      } finally {
        setIsLoading(false);
      }
    };
    void loadUser();
  }, []);

  const persistUser = useCallback(async (updated: User) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
    } catch {
      // silently fail
    }
  }, []);

  const setUser = useCallback(
    (updated: User) => {
      setUserState(updated);
      void persistUser(updated);
    },
    [persistUser],
  );

  const updateBalance = useCallback(
    (delta: number) => {
      setUserState((prev) => {
        if (!prev) return prev;
        const updated = { ...prev, balance: Math.max(0, prev.balance + delta) };
        void persistUser(updated);
        return updated;
      });
    },
    [persistUser],
  );

  const updateTokenBalance = useCallback(
    (delta: number) => {
      setUserState((prev) => {
        if (!prev) return prev;
        const updated = { ...prev, tokenBalance: Math.max(0, prev.tokenBalance + delta) };
        void persistUser(updated);
        return updated;
      });
    },
    [persistUser],
  );

  const claimNewbieReward = useCallback(() => {
    setUserState((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, newbieRewardClaimed: true, isNewbie: false };
      void persistUser(updated);
      return updated;
    });
  }, [persistUser]);

  return (
    <UserContext.Provider
      value={{ user, isLoading, updateBalance, updateTokenBalance, claimNewbieReward, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside UserProvider');
  return ctx;
}
