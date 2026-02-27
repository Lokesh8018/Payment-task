// src/screens/MineScreen.tsx

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
import { COLORS, SPACING, BORDER_RADIUS, SHADOW } from '../config/theme';
import { CURRENCY_SYMBOL, TOKEN_CONVERSION_RATE, SUPPORT_EMAIL } from '../config/constants';

export default function MineScreen() {
  const { user } = useUser();

  const handleMenuItem = (label: string) => {
    Alert.alert(label, `${label} feature coming soon!`);
  };

  const portfolioValue = (user?.tokenBalance ?? 0) * TOKEN_CONVERSION_RATE;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <Text style={styles.avatarText}>
              {(user?.name ?? 'U').charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.userName}>{user?.name ?? '—'}</Text>
          <Text style={styles.userEmail}>{user?.email ?? '—'}</Text>
          <Text style={styles.userPhone}>{user?.phone ?? '—'}</Text>

          {user?.isNewbie && !user.newbieRewardClaimed && (
            <View style={styles.newbiePill}>
              <Text style={styles.newbieText}>🎉 Newbie — ₹350 reward waiting!</Text>
            </View>
          )}
        </View>

        {/* Portfolio Summary */}
        <View style={styles.portfolioRow}>
          <PortfolioItem
            label="Balance"
            value={`${CURRENCY_SYMBOL}${(user?.balance ?? 0).toLocaleString('en-IN')}`}
            icon="wallet"
            color={COLORS.electricBlue}
          />
          <PortfolioItem
            label="Tokens"
            value={String(user?.tokenBalance ?? 0)}
            icon="diamond"
            color={COLORS.purple}
          />
          <PortfolioItem
            label="Value"
            value={`${CURRENCY_SYMBOL}${portfolioValue.toLocaleString('en-IN')}`}
            icon="trending-up"
            color={COLORS.green}
          />
        </View>

        {/* Menu */}
        <View style={styles.menuCard}>
          <MenuItem icon="time" label="Transaction History" onPress={() => handleMenuItem('Transaction History')} />
          <MenuItem icon="shield-checkmark" label="Security" onPress={() => handleMenuItem('Security')} />
          <MenuItem icon="notifications" label="Notifications" onPress={() => handleMenuItem('Notifications')} />
          <MenuItem icon="help-circle" label={`Support (${SUPPORT_EMAIL})`} onPress={() => handleMenuItem('Support')} />
          <MenuItem icon="document-text" label="Terms & Conditions" onPress={() => handleMenuItem('Terms & Conditions')} />
          <MenuItem icon="lock-closed" label="Privacy Policy" onPress={() => handleMenuItem('Privacy Policy')} last />
        </View>

        {/* App version */}
        <Text style={styles.version}>CryptoTrade v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function PortfolioItem({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string;
  icon: string;
  color: string;
}) {
  return (
    <View style={[portfolioStyles.item, { borderTopColor: color }]}>
      <Ionicons name={icon as 'wallet'} size={16} color={color} />
      <Text style={portfolioStyles.value} numberOfLines={1}>{value}</Text>
      <Text style={portfolioStyles.label}>{label}</Text>
    </View>
  );
}

function MenuItem({
  icon,
  label,
  onPress,
  last,
}: {
  icon: string;
  label: string;
  onPress: () => void;
  last?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[menuStyles.item, !last && menuStyles.border]}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <View style={menuStyles.iconWrapper}>
        <Ionicons name={icon as 'time'} size={18} color={COLORS.electricBlue} />
      </View>
      <Text style={menuStyles.label} numberOfLines={1}>{label}</Text>
      <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
    </TouchableOpacity>
  );
}

const portfolioStyles = StyleSheet.create({
  item: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.coolGray,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.sm,
    borderTopWidth: 3,
    gap: 4,
  },
  value: { fontSize: 14, fontWeight: '800', color: COLORS.textPrimary },
  label: { fontSize: 11, color: COLORS.textSecondary },
});

const menuStyles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.commissionBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { flex: 1, fontSize: 14, fontWeight: '500', color: COLORS.textPrimary },
});

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.coolGray },
  content: { paddingBottom: SPACING.xl, gap: SPACING.sm },
  profileCard: {
    backgroundColor: COLORS.electricBlue,
    padding: SPACING.xl,
    alignItems: 'center',
    gap: SPACING.xs,
  },
  avatarWrapper: {
    width: 72,
    height: 72,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  avatarText: { fontSize: 32, fontWeight: '800', color: COLORS.white },
  userName: { fontSize: 22, fontWeight: '800', color: COLORS.white },
  userEmail: { fontSize: 14, color: 'rgba(255,255,255,0.75)' },
  userPhone: { fontSize: 14, color: 'rgba(255,255,255,0.75)' },
  newbiePill: {
    backgroundColor: COLORS.newbieBg,
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    marginTop: SPACING.sm,
  },
  newbieText: { fontSize: 13, fontWeight: '700', color: COLORS.newbieText },
  portfolioRow: {
    flexDirection: 'row',
    gap: SPACING.xs,
    marginHorizontal: SPACING.md,
  },
  menuCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    marginHorizontal: SPACING.md,
    ...SHADOW.sm,
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: SPACING.sm,
  },
});
