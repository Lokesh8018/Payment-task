// src/screens/TeamScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Share,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import TeamCommissionDisplay from '../components/TeamCommissionDisplay';
import { useCommissions } from '../context/CommissionContext';
import { useUser } from '../context/UserContext';
import { COLORS, SPACING, BORDER_RADIUS, SHADOW } from '../config/theme';
import { REFERRAL_BASE_URL } from '../config/constants';

export default function TeamScreen() {
  const { teamStats } = useCommissions();
  const { user } = useUser();

  const referralCode = user?.referralCode ?? '';
  const referralLink = `${REFERRAL_BASE_URL}${referralCode}`;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join me on CryptoTrade and start trading tokens!\n\nUse my referral code: ${referralCode}\n\nLink: ${referralLink}`,
        title: 'Join CryptoTrade',
      });
    } catch {
      Alert.alert('Share failed', 'Unable to share at the moment.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>My Team</Text>
          <Text style={styles.subtitle}>Earn commissions from your referrals</Text>
        </View>

        {/* Referral Card */}
        <View style={styles.referralCard}>
          <Text style={styles.referralLabel}>Your Referral Code</Text>
          <Text style={styles.referralCode}>{referralCode}</Text>
          <Text style={styles.referralLink} numberOfLines={1}>{referralLink}</Text>

          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => { void handleShare(); }}
            activeOpacity={0.8}
          >
            <Ionicons name="share-social" size={18} color={COLORS.white} />
            <Text style={styles.shareText}>Share & Invite</Text>
          </TouchableOpacity>
        </View>

        {/* Team Stats & Commission */}
        <TeamCommissionDisplay teamStats={teamStats} />

        {/* How it works */}
        <View style={styles.howItWorksCard}>
          <Text style={styles.howTitle}>How It Works</Text>
          <Step
            step="1"
            title="Share your referral code"
            desc="Invite friends to join CryptoTrade"
            color={COLORS.electricBlue}
          />
          <Step
            step="2"
            title="They make a purchase"
            desc="When your referral buys tokens, you earn 1.8%"
            color={COLORS.purple}
          />
          <Step
            step="3"
            title="2-level deep earnings"
            desc="You also earn 0.6% when your referrals' referrals buy"
            color={COLORS.green}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Step({
  step,
  title,
  desc,
  color,
}: {
  step: string;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <View style={stepStyles.container}>
      <View style={[stepStyles.badge, { backgroundColor: color }]}>
        <Text style={stepStyles.badgeText}>{step}</Text>
      </View>
      <View style={stepStyles.info}>
        <Text style={stepStyles.title}>{title}</Text>
        <Text style={stepStyles.desc}>{desc}</Text>
      </View>
    </View>
  );
}

const stepStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  badge: {
    width: 28,
    height: 28,
    borderRadius: BORDER_RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { fontSize: 14, fontWeight: '800', color: COLORS.white },
  info: { flex: 1 },
  title: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary },
  desc: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 18, marginTop: 2 },
});

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.coolGray },
  content: { paddingBottom: SPACING.xl, gap: SPACING.sm },
  header: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.textPrimary },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, marginTop: 2 },
  referralCard: {
    backgroundColor: COLORS.electricBlue,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    marginHorizontal: SPACING.md,
    alignItems: 'center',
    gap: SPACING.sm,
    ...SHADOW.md,
  },
  referralLabel: { fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: '500' },
  referralCode: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 3,
  },
  referralLink: { fontSize: 12, color: 'rgba(255,255,255,0.6)' },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    gap: 8,
    marginTop: SPACING.xs,
  },
  shareText: { fontSize: 15, fontWeight: '700', color: COLORS.white },
  howItWorksCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    ...SHADOW.sm,
  },
  howTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
});
