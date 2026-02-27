// src/components/TeamCommissionDisplay.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TeamStats } from '../types';
import { COMMISSION_CONFIG } from '../config/commission';
import { COLORS, SPACING, BORDER_RADIUS, SHADOW } from '../config/theme';
import { CURRENCY_SYMBOL } from '../config/constants';

interface TeamCommissionDisplayProps {
  teamStats: TeamStats;
}

export default function TeamCommissionDisplay({ teamStats }: TeamCommissionDisplayProps) {
  return (
    <View style={styles.container}>
      {/* Stats row */}
      <View style={styles.statsRow}>
        <StatCard
          icon="people"
          label="Level 1 Team"
          value={String(teamStats.level1Count)}
          color={COLORS.electricBlue}
        />
        <StatCard
          icon="people-circle"
          label="Level 2 Team"
          value={String(teamStats.level2Count)}
          color={COLORS.purple}
        />
        <StatCard
          icon="today"
          label="Today"
          value={`${CURRENCY_SYMBOL}${teamStats.todayEarnings.toFixed(2)}`}
          color={COLORS.green}
        />
        <StatCard
          icon="wallet"
          label="Total Earned"
          value={`${CURRENCY_SYMBOL}${teamStats.totalEarnings.toFixed(2)}`}
          color={COLORS.orange}
        />
      </View>

      {/* Commission rate breakdown */}
      <View style={styles.ratesCard}>
        <Text style={styles.ratesTitle}>Your Commission Rates</Text>
        <View style={styles.ratesRow}>
          <RateItem
            level="L1"
            percent={COMMISSION_CONFIG.LEVEL_1_PERCENT}
            description="Direct referrals"
            color={COLORS.electricBlue}
          />
          <View style={styles.divider} />
          <RateItem
            level="L2"
            percent={COMMISSION_CONFIG.LEVEL_2_PERCENT}
            description="Referral's referrals"
            color={COLORS.purple}
          />
          <View style={styles.divider} />
          <RateItem
            level="Total"
            percent={COMMISSION_CONFIG.TOTAL_PERCENT}
            description="Commission pool"
            color={COLORS.green}
          />
        </View>
      </View>

      {/* Recent commissions */}
      {teamStats.recentCommissions.length > 0 && (
        <View style={styles.recentCard}>
          <Text style={styles.recentTitle}>Recent Commissions</Text>
          {teamStats.recentCommissions.slice(0, 5).map((c) => (
            <View key={c.id} style={styles.commissionItem}>
              <View style={styles.commissionLeft}>
                <View style={[styles.levelBadge, { backgroundColor: c.level === 1 ? COLORS.commissionBg : COLORS.purpleLight }]}>
                  <Text style={[styles.levelText, { color: c.level === 1 ? COLORS.electricBlue : COLORS.purple }]}>
                    L{c.level}
                  </Text>
                </View>
                <Text style={styles.commissionFrom} numberOfLines={1}>
                  Order #{c.orderId.slice(-6)}
                </Text>
              </View>
              <Text style={styles.commissionAmount}>
                +{CURRENCY_SYMBOL}{c.amount.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: string;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <View style={[statStyles.card, { borderTopColor: color }]}>
      <Ionicons name={icon as 'people'} size={18} color={color} />
      <Text style={statStyles.value}>{value}</Text>
      <Text style={statStyles.label} numberOfLines={1}>{label}</Text>
    </View>
  );
}

function RateItem({
  level,
  percent,
  description,
  color,
}: {
  level: string;
  percent: number;
  description: string;
  color: string;
}) {
  return (
    <View style={rateStyles.item}>
      <Text style={[rateStyles.percent, { color }]}>{percent}%</Text>
      <Text style={rateStyles.level}>{level}</Text>
      <Text style={rateStyles.desc} numberOfLines={2}>{description}</Text>
    </View>
  );
}

const statStyles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.coolGray,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.sm,
    borderTopWidth: 3,
    gap: 4,
  },
  value: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  label: {
    fontSize: 10,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

const rateStyles = StyleSheet.create({
  item: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  percent: {
    fontSize: 22,
    fontWeight: '800',
  },
  level: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  desc: {
    fontSize: 11,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

const styles = StyleSheet.create({
  container: {
    gap: SPACING.sm,
  },
  statsRow: {
    flexDirection: 'row',
    gap: SPACING.xs,
    marginHorizontal: SPACING.md,
  },
  ratesCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    ...SHADOW.sm,
  },
  ratesTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  ratesRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 50,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.sm,
  },
  recentCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    ...SHADOW.sm,
  },
  recentTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  commissionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  commissionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    flex: 1,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.full,
  },
  levelText: {
    fontSize: 11,
    fontWeight: '700',
  },
  commissionFrom: {
    fontSize: 13,
    color: COLORS.textSecondary,
    flex: 1,
  },
  commissionAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.green,
  },
});
