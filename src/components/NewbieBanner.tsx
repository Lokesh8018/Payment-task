// src/components/NewbieBanner.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS } from '../config/theme';
import { NEWBIE_REWARD_AMOUNT, CURRENCY_SYMBOL } from '../config/constants';

interface NewbieBannerProps {
  onPress?: () => void;
}

export default function NewbieBanner({ onPress }: NewbieBannerProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.iconWrapper}>
        <Text style={styles.emoji}>🎉</Text>
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>Welcome Offer!</Text>
        <Text style={styles.subtitle}>
          Get {CURRENCY_SYMBOL}{NEWBIE_REWARD_AMOUNT} OFF on your first buy!
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={COLORS.newbieText} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.newbieBg,
    borderWidth: 1.5,
    borderColor: COLORS.newbieBorder,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  iconWrapper: {
    marginRight: SPACING.sm,
  },
  emoji: {
    fontSize: 24,
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.newbieText,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.newbieText,
    fontWeight: '500',
  },
});
