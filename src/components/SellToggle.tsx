// src/components/SellToggle.tsx

import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, SHADOW } from '../config/theme';

interface SellToggleProps {
  isSellEnabled: boolean;
  hasUPIConfig: boolean;
  onToggle: (value: boolean) => void;
  onSetupUPI: () => void;
}

export default function SellToggle({
  isSellEnabled,
  hasUPIConfig,
  onToggle,
  onSetupUPI,
}: SellToggleProps) {
  const handleToggle = (value: boolean) => {
    if (value && !hasUPIConfig) {
      onSetupUPI();
      return;
    }
    onToggle(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.left}>
          <Ionicons
            name={isSellEnabled ? 'toggle' : 'toggle-outline'}
            size={22}
            color={isSellEnabled ? COLORS.green : COLORS.textMuted}
          />
          <View style={styles.textGroup}>
            <Text style={styles.label}>Enable Selling</Text>
            <Text style={styles.sublabel}>
              {isSellEnabled
                ? 'Your tokens are listed for sale'
                : 'Toggle to start selling your tokens'}
            </Text>
          </View>
        </View>
        <Switch
          value={isSellEnabled}
          onValueChange={handleToggle}
          trackColor={{ false: COLORS.border, true: COLORS.green }}
          thumbColor={isSellEnabled ? COLORS.white : COLORS.textMuted}
        />
      </View>

      {!hasUPIConfig && (
        <TouchableOpacity style={styles.setupRow} onPress={onSetupUPI} activeOpacity={0.7}>
          <Ionicons name="warning" size={16} color={COLORS.orange} />
          <Text style={styles.setupText}>
            Setup UPI to start selling
          </Text>
          <Ionicons name="chevron-forward" size={14} color={COLORS.orange} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOW.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: SPACING.sm,
  },
  textGroup: {
    flex: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  sublabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  setupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.orangeLight,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.sm,
    marginTop: SPACING.sm,
    gap: 6,
  },
  setupText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.orange,
  },
});
