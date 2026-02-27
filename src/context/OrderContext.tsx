// src/context/OrderContext.tsx

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BuyOrder, Transaction, OrderContextState } from '../types';
import { STORAGE_KEYS } from '../config/constants';
import { MOCK_BUY_ORDERS, MOCK_TRANSACTIONS } from '../data/mockData';

interface OrderContextValue extends OrderContextState {
  addBuyHistory: (tx: Transaction) => void;
  addSellHistory: (tx: Transaction) => void;
  markOrderUnavailable: (orderId: string) => void;
  refreshOrders: () => void;
}

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [buyOrders, setBuyOrders] = useState<BuyOrder[]>([]);
  const [buyHistory, setBuyHistory] = useState<Transaction[]>([]);
  const [sellHistory, setSellHistory] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [storedOrders, storedBuy, storedSell] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.ORDERS),
          AsyncStorage.getItem(STORAGE_KEYS.BUY_HISTORY),
          AsyncStorage.getItem(STORAGE_KEYS.SELL_HISTORY),
        ]);

        setBuyOrders(storedOrders ? (JSON.parse(storedOrders) as BuyOrder[]) : MOCK_BUY_ORDERS);

        const allBuy = storedBuy
          ? (JSON.parse(storedBuy) as Transaction[])
          : MOCK_TRANSACTIONS.filter((t) => t.type === 'buy');
        const allSell = storedSell
          ? (JSON.parse(storedSell) as Transaction[])
          : MOCK_TRANSACTIONS.filter((t) => t.type === 'sell');

        setBuyHistory(allBuy);
        setSellHistory(allSell);
      } catch {
        setBuyOrders(MOCK_BUY_ORDERS);
        setBuyHistory(MOCK_TRANSACTIONS.filter((t) => t.type === 'buy'));
        setSellHistory(MOCK_TRANSACTIONS.filter((t) => t.type === 'sell'));
      } finally {
        setIsLoading(false);
      }
    };
    void load();
  }, []);

  const addBuyHistory = useCallback((tx: Transaction) => {
    setBuyHistory((prev) => {
      const updated = [tx, ...prev];
      void AsyncStorage.setItem(STORAGE_KEYS.BUY_HISTORY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const addSellHistory = useCallback((tx: Transaction) => {
    setSellHistory((prev) => {
      const updated = [tx, ...prev];
      void AsyncStorage.setItem(STORAGE_KEYS.SELL_HISTORY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const markOrderUnavailable = useCallback((orderId: string) => {
    setBuyOrders((prev) => {
      const updated = prev.map((o) =>
        o.id === orderId ? { ...o, isAvailable: false } : o,
      );
      void AsyncStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const refreshOrders = useCallback(() => {
    setBuyOrders(MOCK_BUY_ORDERS);
  }, []);

  return (
    <OrderContext.Provider
      value={{
        buyOrders,
        buyHistory,
        sellHistory,
        isLoading,
        addBuyHistory,
        addSellHistory,
        markOrderUnavailable,
        refreshOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders(): OrderContextValue {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrders must be used inside OrderProvider');
  return ctx;
}
