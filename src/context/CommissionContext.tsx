// src/context/CommissionContext.tsx

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Commission, TeamStats, CommissionContextState } from '../types';
import { STORAGE_KEYS } from '../config/constants';
import { MOCK_COMMISSIONS, MOCK_USERS } from '../data/mockData';

interface CommissionContextValue extends CommissionContextState {
  addCommission: (commission: Commission) => void;
  refreshTeamStats: () => void;
}

const CommissionContext = createContext<CommissionContextValue | undefined>(undefined);

function buildTeamStats(commissions: Commission[], userId: string): TeamStats {
  const level1Ids = new Set<string>();
  const level2Ids = new Set<string>();

  MOCK_USERS.forEach((u) => {
    if (u.referredBy === userId) level1Ids.add(u.id);
  });
  MOCK_USERS.forEach((u) => {
    if (u.referredBy && level1Ids.has(u.referredBy)) level2Ids.add(u.id);
  });

  const today = new Date().toDateString();
  let todayEarnings = 0;
  let totalEarnings = 0;

  const myCommissions = commissions.filter((c) => c.toUserId === userId);
  myCommissions.forEach((c) => {
    totalEarnings += c.amount;
    if (new Date(c.createdAt).toDateString() === today) {
      todayEarnings += c.amount;
    }
  });

  return {
    level1Count: level1Ids.size,
    level2Count: level2Ids.size,
    todayEarnings: parseFloat(todayEarnings.toFixed(2)),
    totalEarnings: parseFloat(totalEarnings.toFixed(2)),
    recentCommissions: myCommissions.slice(0, 10),
  };
}

export function CommissionProvider({ children }: { children: React.ReactNode }) {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [teamStats, setTeamStats] = useState<TeamStats>({
    level1Count: 0,
    level2Count: 0,
    todayEarnings: 0,
    totalEarnings: 0,
    recentCommissions: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEYS.COMMISSIONS);
        const data = stored ? (JSON.parse(stored) as Commission[]) : MOCK_COMMISSIONS;
        setCommissions(data);
        setTeamStats(buildTeamStats(data, 'user_me'));
      } catch {
        setCommissions(MOCK_COMMISSIONS);
        setTeamStats(buildTeamStats(MOCK_COMMISSIONS, 'user_me'));
      } finally {
        setIsLoading(false);
      }
    };
    void load();
  }, []);

  const addCommission = useCallback((commission: Commission) => {
    setCommissions((prev) => {
      const updated = [commission, ...prev];
      void AsyncStorage.setItem(STORAGE_KEYS.COMMISSIONS, JSON.stringify(updated));
      setTeamStats(buildTeamStats(updated, 'user_me'));
      return updated;
    });
  }, []);

  const refreshTeamStats = useCallback(() => {
    setTeamStats(buildTeamStats(commissions, 'user_me'));
  }, [commissions]);

  return (
    <CommissionContext.Provider
      value={{ commissions, teamStats, isLoading, addCommission, refreshTeamStats }}
    >
      {children}
    </CommissionContext.Provider>
  );
}

export function useCommissions(): CommissionContextValue {
  const ctx = useContext(CommissionContext);
  if (!ctx) throw new Error('useCommissions must be used inside CommissionProvider');
  return ctx;
}
