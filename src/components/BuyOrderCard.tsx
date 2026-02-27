// src/components/BuyOrderCard.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BuyOrder } from '../types';
import { COLORS, SPACING, BORDER_RADIUS, SHADOW } from '../config/theme';
import { CURRENCY_SYMBOL } from '../config/constants';

interface BuyOrderCardProps {
  order: BuyOrder;
  isNewbie?: boolean;
  discountAmount?: number;
  onBuy: (order: BuyOrder) => void;
}

export default function BuyOrderCard({
  order,
  isNewbie = false,
  discountAmount = 0,
  onBuy,
}: BuyOrderCardProps) {
  const effectivePrice =
    isNewbie && discountAmount > 0
      ? Math.max(0, order.totalPrice - discountAmount)
      : order.totalPrice;

  return (
    <View style={[styles.card, !order.isAvailable && styles.cardDisabled]}>
      <View style={styles.header}>
        <View style={styles.tokenBadge}>
          <Ionicons name="diamond" size={14} color={COLORS.electricBlue} />
          <Text style={styles.tokenCount}>{order.tokenCount} Tokens</Text>
        </View>
        {isNewbie && order.isAvailable && (
          <View style={styles.newbieBadge}>
            <Text style={styles.newbieBadgeText}>🎉 Newbie Deal</Text>
          </View>
        )}
        {!order.isAvailable && (
          <View style={styles.soldBadge}>
            <Text style={styles.soldText}>Sold Out</Text>
          </View>
        )}
      </View>

      <View style={styles.priceRow}>
        <View>
          <Text style={styles.label}>Price / Token</Text>
          <Text style={styles.pricePerToken}>
            {CURRENCY_SYMBOL}{order.pricePerToken.toFixed(2)}
          </Text>
        </View>
        <View style={styles.totalWrapper}>
          {isNewbie && discountAmount > 0 && (
            <Text style={styles.originalPrice}>
              {CURRENCY_SYMBOL}{order.totalPrice.toFixed(2)}
            </Text>
          )}
          <Text style={styles.totalPrice}>
            {CURRENCY_SYMBOL}{effectivePrice.toFixed(2)}
          </Text>
        </View>
      </View>

      <View style={styles.commissionBox}>
        <Text style={styles.commissionTitle}>
          Commission (2.7%)
        </Text>
        <View style={styles.commissionRow}>
          <Text style={styles.commissionItem}>L1: {CURRENCY_SYMBOL}{order.commission.level1Amount.toFixed(2)}</Text>
          <Text style={styles.commissionItem}>L2: {CURRENCY_SYMBOL}{order.commission.level2Amount.toFixed(2)}</Text>
          <Text style={styles.commissionItem}>Platform: {CURRENCY_SYMBOL}{order.commission.platformAmount.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.buyButton, !order.isAvailable && styles.buyButtonDisabled]}
        onPress={() => onBuy(order)}
        disabled={!order.isAvailable}
        activeOpacity={0.8}
      >
        <Ionicons name="cart" size={16} color={COLORS.white} style={styles.cartIcon} />
        <Text style={styles.buyButtonText}>
          {order.isAvailable ? 'Buy Now' : 'Unavailable'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOW.md,
  },
  cardDisabled: {
    opacity: 0.6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  tokenBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.commissionBg,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.full,
    gap: 4,
  },
  tokenCount: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.electricBlue,
  },
  newbieBadge: {
    backgroundColor: COLORS.newbieBg,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.full,
  },
  newbieBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.newbieText,
  },
  soldBadge: {
    backgroundColor: COLORS.redLight,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.full,
  },
  soldText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.red,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: SPACING.sm,
  },
  label: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  pricePerToken: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  totalWrapper: {
    alignItems: 'flex-end',
  },
  originalPrice: {
    fontSize: 13,
    color: COLORS.textMuted,
    textDecorationLine: 'line-through',
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.electricBlue,
  },
  commissionBox: {
    backgroundColor: COLORS.commissionBg,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  commissionTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.commissionText,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  commissionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commissionItem: {
    fontSize: 12,
    color: COLORS.commissionText,
    fontWeight: '500',
  },
  buyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.electricBlue,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.sm + 2,
    gap: 6,
  },
  buyButtonDisabled: {
    backgroundColor: COLORS.textMuted,
  },
  cartIcon: {},
  buyButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white,
  },
});
