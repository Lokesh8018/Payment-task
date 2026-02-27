// src/types/index.ts

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  referralCode: string;
  referredBy?: string;
  balance: number;
  tokenBalance: number;
  isNewbie: boolean;
  newbieRewardClaimed: boolean;
  createdAt: string;
}

export interface CommissionBreakdown {
  total: number;
  level1Amount: number;
  level2Amount: number;
  platformAmount: number;
  level1Percent: number;
  level2Percent: number;
}

export interface BuyOrder {
  id: string;
  tokenCount: number;
  pricePerToken: number;
  totalPrice: number;
  commission: CommissionBreakdown;
  sellerId: string;
  createdAt: string;
  isAvailable: boolean;
}

export type TransactionType = 'buy' | 'sell' | 'commission' | 'reward' | 'transfer';
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  tokens?: number;
  status: TransactionStatus;
  timestamp: string;
  upiId?: string;
  referenceId?: string;
  description?: string;
  orderId?: string;
}

export type CommissionLevel = 1 | 2;

export interface Commission {
  id: string;
  fromUserId: string;
  toUserId: string;
  level: CommissionLevel;
  amount: number;
  percentage: number;
  orderId: string;
  createdAt: string;
}

export type UPIApp = 'gpay' | 'phonepe' | 'paytm' | 'bhim' | 'other';

export interface UPIConfig {
  app: UPIApp;
  upiId: string;
  isActive: boolean;
}

export interface TeamStats {
  level1Count: number;
  level2Count: number;
  todayEarnings: number;
  totalEarnings: number;
  recentCommissions: Commission[];
}

export interface OrderContextState {
  buyOrders: BuyOrder[];
  buyHistory: Transaction[];
  sellHistory: Transaction[];
  isLoading: boolean;
}

export interface UserContextState {
  user: User | null;
  isLoading: boolean;
}

export interface CommissionContextState {
  commissions: Commission[];
  teamStats: TeamStats;
  isLoading: boolean;
}
