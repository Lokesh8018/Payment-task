// src/components/BuyConfirmationSheet.tsx

import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BuyOrder } from '../types';
import { COLORS, SPACING, BORDER_RADIUS, SHADOW } from '../config/theme';
import { CURRENCY_SYMBOL, NEWBIE_REWARD_AMOUNT } from '../config/constants';

interface BuyConfirmationSheetProps {
  visible: boolean;
  order: BuyOrder | null;
  isNewbie: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function BuyConfirmationSheet({
  visible,
  order,
  isNewbie,
  onConfirm,
  onCancel,
}: BuyConfirmationSheetProps) {
  if (!order) return null;

  const discount = isNewbie ? NEWBIE_REWARD_AMOUNT : 0;
  const finalPrice = Math.max(0, order.totalPrice - discount);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.handle} />

          <View style={styles.titleRow}>
            <Text style={styles.title}>Confirm Purchase</Text>
            <TouchableOpacity onPress={onCancel} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="close-circle" size={24} color={COLORS.textMuted} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Order Summary */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Order Summary</Text>
              <Row label="Tokens" value={`${order.tokenCount} tokens`} />
              <Row label="Price / Token" value={`${CURRENCY_SYMBOL}${order.pricePerToken.toFixed(2)}`} />
              <Row label="Subtotal" value={`${CURRENCY_SYMBOL}${order.totalPrice.toFixed(2)}`} />
            </View>

            {/* Commission Breakdown */}
            <View style={[styles.section, styles.commissionSection]}>
              <Text style={styles.sectionTitle}>Commission Breakdown (2.7%)</Text>
              <Row
                label="Level 1 Referrer (1.8%)"
                value={`${CURRENCY_SYMBOL}${order.commission.level1Amount.toFixed(2)}`}
                valueColor={COLORS.green}
              />
              <Row
                label="Level 2 Referrer (0.6%)"
                value={`${CURRENCY_SYMBOL}${order.commission.level2Amount.toFixed(2)}`}
                valueColor={COLORS.green}
              />
              <Row
                label="Platform (0.3%)"
                value={`${CURRENCY_SYMBOL}${order.commission.platformAmount.toFixed(2)}`}
                valueColor={COLORS.orange}
              />
            </View>

            {/* Newbie Discount */}
            {isNewbie && (
              <View style={[styles.section, styles.discountSection]}>
                <Text style={styles.sectionTitle}>🎉 Newbie Welcome Offer</Text>
                <Row
                  label={`Discount`}
                  value={`-${CURRENCY_SYMBOL}${NEWBIE_REWARD_AMOUNT}`}
                  valueColor={COLORS.red}
                  bold
                />
              </View>
            )}

            {/* Total */}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Payable</Text>
              <Text style={styles.totalValue}>{CURRENCY_SYMBOL}{finalPrice.toFixed(2)}</Text>
            </View>
          </ScrollView>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel} activeOpacity={0.7}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm} activeOpacity={0.8}>
              <Ionicons name="checkmark-circle" size={18} color={COLORS.white} />
              <Text style={styles.confirmText}>Confirm Buy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function Row({
  label,
  value,
  valueColor,
  bold,
}: {
  label: string;
  value: string;
  valueColor?: string;
  bold?: boolean;
}) {
  return (
    <View style={rowStyles.row}>
      <Text style={rowStyles.label}>{label}</Text>
      <Text style={[rowStyles.value, valueColor ? { color: valueColor } : {}, bold ? rowStyles.bold : {}]}>
        {value}
      </Text>
    </View>
  );
}

const rowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  label: {
    fontSize: 14,
    color: COLORS.textSecondary,
    flex: 1,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  bold: {
    fontWeight: '800',
  },
});

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    paddingBottom: SPACING.xl,
    ...SHADOW.lg,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border,
    alignSelf: 'center',
    marginBottom: SPACING.md,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  section: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  commissionSection: {
    backgroundColor: COLORS.commissionBg,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.sm,
  },
  discountSection: {
    backgroundColor: COLORS.newbieBg,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: SPACING.xs,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.md,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.electricBlue,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.sm + 2,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  confirmButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.electricBlue,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.sm + 2,
    gap: 6,
  },
  confirmText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white,
  },
});
