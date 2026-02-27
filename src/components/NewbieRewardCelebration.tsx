// src/components/NewbieRewardCelebration.tsx

import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, SHADOW } from '../config/theme';
import { CURRENCY_SYMBOL, NEWBIE_REWARD_AMOUNT } from '../config/constants';

interface NewbieRewardCelebrationProps {
  visible: boolean;
  onDismiss: () => void;
}

export default function NewbieRewardCelebration({
  visible,
  onDismiss,
}: NewbieRewardCelebrationProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          damping: 12,
          stiffness: 150,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0);
      opacityAnim.setValue(0);
    }
  }, [visible, scaleAnim, opacityAnim]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.card,
            { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
          ]}
        >
          <Text style={styles.emoji}>🎊</Text>
          <Text style={styles.emojiBig}>🎉</Text>
          <Text style={styles.emoji}>🎊</Text>

          <Text style={styles.title}>Congratulations!</Text>
          <Text style={styles.subtitle}>
            Your newbie reward has been applied!
          </Text>

          <View style={styles.rewardBox}>
            <Ionicons name="gift" size={28} color={COLORS.yellow} />
            <Text style={styles.rewardAmount}>
              {CURRENCY_SYMBOL}{NEWBIE_REWARD_AMOUNT} OFF
            </Text>
            <Text style={styles.rewardLabel}>on your first purchase</Text>
          </View>

          <Text style={styles.description}>
            You saved {CURRENCY_SYMBOL}{NEWBIE_REWARD_AMOUNT} on your very first token purchase.
            Welcome to the community!
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={onDismiss}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Awesome! 🚀</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    alignItems: 'center',
    width: '100%',
    maxWidth: 360,
    ...SHADOW.lg,
  },
  emoji: {
    fontSize: 24,
    position: 'absolute',
  },
  emojiBig: {
    fontSize: 64,
    marginBottom: SPACING.sm,
    marginTop: SPACING.sm,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  rewardBox: {
    backgroundColor: COLORS.newbieBg,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.newbieBorder,
    gap: 4,
  },
  rewardAmount: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.newbieText,
  },
  rewardLabel: {
    fontSize: 13,
    color: COLORS.newbieText,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: SPACING.lg,
  },
  button: {
    backgroundColor: COLORS.electricBlue,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.white,
  },
});
