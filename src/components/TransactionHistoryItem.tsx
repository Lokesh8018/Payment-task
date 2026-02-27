// src/components/TransactionHistoryItem.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Transaction } from '../types';
import { COLORS, SPACING, BORDER_RADIUS } from '../config/theme';
import { CURRENCY_SYMBOL } from '../config/constants';

interface TransactionHistoryItemProps {
  transaction: Transaction;
}

const TYPE_CONFIG = {
  buy: { icon: 'arrow-down-circle' as const, color: COLORS.electricBlue, label: 'Buy', sign: '-' },
  sell: { icon: 'arrow-up-circle' as const, color: COLORS.green, label: 'Sell', sign: '+' },
  commission: { icon: 'gift' as const, color: COLORS.purple, label: 'Commission', sign: '+' },
  reward: { icon: 'star' as const, color: COLORS.yellow, label: 'Reward', sign: '+' },
  transfer: { icon: 'swap-horizontal' as const, color: COLORS.orange, label: 'Transfer', sign: '' },
} as const;

const STATUS_COLORS: Record<string, string> = {
  completed: COLORS.green,
  pending: COLORS.orange,
  failed: COLORS.red,
  cancelled: COLORS.textMuted,
};

export default function TransactionHistoryItem({ transaction }: TransactionHistoryItemProps) {
  const config = TYPE_CONFIG[transaction.type];
  const statusColor = STATUS_COLORS[transaction.status] ?? COLORS.textMuted;

  const formattedDate = new Date(transaction.timestamp).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const formattedTime = new Date(transaction.timestamp).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View style={styles.container}>
      <View style={[styles.iconWrapper, { backgroundColor: config.color + '18' }]}>
        <Ionicons name={config.icon} size={22} color={config.color} />
      </View>

      <View style={styles.details}>
        <View style={styles.topRow}>
          <Text style={styles.label}>{config.label}</Text>
          <Text style={[styles.amount, { color: config.color }]}>
            {config.sign}{CURRENCY_SYMBOL}{transaction.amount.toFixed(2)}
          </Text>
        </View>
        <View style={styles.bottomRow}>
          <Text style={styles.description} numberOfLines={1}>
            {transaction.description ?? transaction.type}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>
              {transaction.status}
            </Text>
          </View>
        </View>
        {transaction.tokens !== undefined && (
          <Text style={styles.tokenInfo}>
            {transaction.type === 'buy' ? '↓' : '↑'} {transaction.tokens} tokens
          </Text>
        )}
        <Text style={styles.dateTime}>
          {formattedDate} • {formattedTime}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
    gap: SPACING.sm,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    flex: 1,
    gap: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  amount: {
    fontSize: 15,
    fontWeight: '800',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    fontSize: 12,
    color: COLORS.textSecondary,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.full,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  tokenInfo: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  dateTime: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
});
