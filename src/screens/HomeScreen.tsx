// src/screens/HomeScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';
import NewbieBanner from '../components/NewbieBanner';
import { COLORS, SPACING, BORDER_RADIUS, SHADOW } from '../config/theme';
import { CURRENCY_SYMBOL, TOKEN_CONVERSION_RATE, REFERRAL_BASE_URL } from '../config/constants';

export default function HomeScreen() {
  const { user } = useUser();

  const handleCopyReferral = () => {
    const code = user?.referralCode ?? '';
    Alert.alert('Referral Code', `Your referral code: ${code}\n\nLink: ${REFERRAL_BASE_URL}${code}`);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Namaste 🇮🇳</Text>
            <Text style={styles.userName}>{user?.name ?? 'Trader'}</Text>
          </View>
          <View style={styles.flagContainer}>
            <Text style={styles.flag}>🇮🇳</Text>
          </View>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceRow}>
            <View>
              <Text style={styles.balanceLabel}>Wallet Balance</Text>
              <Text style={styles.balanceAmount}>
                {CURRENCY_SYMBOL}{(user?.balance ?? 0).toLocaleString('en-IN')}
              </Text>
            </View>
            <View style={styles.tokenBox}>
              <Ionicons name="diamond" size={20} color={COLORS.electricBlue} />
              <Text style={styles.tokenAmount}>{user?.tokenBalance ?? 0}</Text>
              <Text style={styles.tokenLabel}>Tokens</Text>
            </View>
          </View>

          <View style={styles.rateRow}>
            <Ionicons name="trending-up" size={14} color={COLORS.greenLight} />
            <Text style={styles.rateText}>
              1 Token = {CURRENCY_SYMBOL}{TOKEN_CONVERSION_RATE} • Live Rate
            </Text>
          </View>
        </View>

        {/* Newbie Banner */}
        {user?.isNewbie && !user.newbieRewardClaimed && (
          <NewbieBanner
            onPress={() =>
              Alert.alert(
                '🎉 Newbie Offer',
                `Get ₹350 OFF on your first token purchase!\n\nThis discount will be automatically applied at checkout.`,
              )
            }
          />
        )}

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <ActionCard icon="cart" label="Buy Tokens" color={COLORS.electricBlue} />
          <ActionCard icon="cash" label="Sell Tokens" color={COLORS.green} />
          <ActionCard icon="people" label="My Team" color={COLORS.purple} />
          <ActionCard icon="gift" label="Refer & Earn" color={COLORS.orange} onPress={handleCopyReferral} />
        </View>

        {/* Referral Card */}
        <View style={styles.referralCard}>
          <View style={styles.referralLeft}>
            <Ionicons name="share-social" size={20} color={COLORS.electricBlue} />
            <View>
              <Text style={styles.referralTitle}>Your Referral Code</Text>
              <Text style={styles.referralCode}>{user?.referralCode ?? '—'}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.copyButton}
            onPress={handleCopyReferral}
            activeOpacity={0.7}
          >
            <Ionicons name="copy" size={16} color={COLORS.electricBlue} />
            <Text style={styles.copyText}>Copy</Text>
          </TouchableOpacity>
        </View>

        {/* Commission Info */}
        <View style={styles.commissionCard}>
          <Text style={styles.commissionTitle}>Earn with Every Trade</Text>
          <View style={styles.commissionItems}>
            <CommissionItem label="L1 Referral" percent="1.8%" color={COLORS.electricBlue} />
            <CommissionItem label="L2 Referral" percent="0.6%" color={COLORS.purple} />
            <CommissionItem label="Total Pool" percent="2.7%" color={COLORS.green} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ActionCard({
  icon,
  label,
  color,
  onPress,
}: {
  icon: string;
  label: string;
  color: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.actionCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.actionIcon, { backgroundColor: color + '18' }]}>
        <Ionicons name={icon as 'cart'} size={22} color={color} />
      </View>
      <Text style={styles.actionLabel} numberOfLines={1}>{label}</Text>
    </TouchableOpacity>
  );
}

function CommissionItem({
  label,
  percent,
  color,
}: {
  label: string;
  percent: string;
  color: string;
}) {
  return (
    <View style={styles.commissionItem}>
      <Text style={[styles.commissionPercent, { color }]}>{percent}</Text>
      <Text style={styles.commissionLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.coolGray,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: SPACING.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  greeting: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  flagContainer: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOW.sm,
  },
  flag: {
    fontSize: 24,
  },
  balanceCard: {
    backgroundColor: COLORS.electricBlue,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOW.lg,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  balanceLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.white,
  },
  tokenBox: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.sm,
    alignItems: 'center',
    minWidth: 72,
  },
  tokenAmount: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.white,
  },
  tokenLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
  },
  rateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rateText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    marginTop: SPACING.sm,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  actionCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    alignItems: 'center',
    width: '47%',
    gap: SPACING.sm,
    ...SHADOW.sm,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  referralCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOW.sm,
  },
  referralLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    flex: 1,
  },
  referralTitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  referralCode: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: 1,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.commissionBg,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.sm,
    gap: 4,
  },
  copyText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.electricBlue,
  },
  commissionCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOW.sm,
  },
  commissionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  commissionItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  commissionItem: {
    alignItems: 'center',
    gap: 4,
  },
  commissionPercent: {
    fontSize: 24,
    fontWeight: '800',
  },
  commissionLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
});
