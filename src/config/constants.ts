// src/config/constants.ts

import { UPIApp } from '../types';

export const NEWBIE_REWARD_AMOUNT = 350;
export const MIN_SELL_AMOUNT = 200;
export const TOKEN_CONVERSION_RATE = 100; // 1 token = ₹100
export const APP_NAME = 'CryptoTrade';
export const CURRENCY_SYMBOL = '₹';

export const STORAGE_KEYS = {
  USER: '@payment_task/user',
  ORDERS: '@payment_task/orders',
  BUY_HISTORY: '@payment_task/buy_history',
  SELL_HISTORY: '@payment_task/sell_history',
  COMMISSIONS: '@payment_task/commissions',
  UPI_CONFIG: '@payment_task/upi_config',
  NEWBIE_REWARD_CLAIMED: '@payment_task/newbie_reward_claimed',
  FIRST_BUY_DONE: '@payment_task/first_buy_done',
} as const;

export interface UPIAppInfo {
  id: UPIApp;
  name: string;
  color: string;
  icon: string;
}

export const UPI_APPS: UPIAppInfo[] = [
  { id: 'gpay', name: 'Google Pay', color: '#4285F4', icon: 'logo-google' },
  { id: 'phonepe', name: 'PhonePe', color: '#5f259f', icon: 'phone-portrait' },
  { id: 'paytm', name: 'Paytm', color: '#002970', icon: 'wallet' },
  { id: 'bhim', name: 'BHIM UPI', color: '#00529b', icon: 'card' },
  { id: 'other', name: 'Other UPI', color: '#6b7280', icon: 'ellipsis-horizontal' },
];

export const REFERRAL_BASE_URL = 'https://cryptotrade.app/ref/';

export const MIN_TOKEN_BUY = 1;
export const MAX_TOKEN_BUY = 10000;

export const PLATFORM_NAME = 'CryptoTrade';
export const SUPPORT_EMAIL = 'support@cryptotrade.app';
