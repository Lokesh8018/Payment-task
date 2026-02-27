// src/screens/UPIScreen.tsx

import React, { useState } from 'react';
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
import UPIAppPicker from '../components/UPIAppPicker';
import { useUPIApps } from '../hooks/useUPIApps';
import { UPIApp } from '../types';
import { UPI_APPS } from '../config/constants';
import { COLORS, SPACING, BORDER_RADIUS, SHADOW } from '../config/theme';

export default function UPIScreen() {
  const { upiConfig, selectedApp, saveUPIConfig, disableSell } = useUPIApps();
  const [showPicker, setShowPicker] = useState(false);

  const handleSelect = (upiId: string, app: UPIApp) => {
    saveUPIConfig(upiId, app);
    setShowPicker(false);
    Alert.alert('Success', `UPI ID saved: ${upiId}`);
  };

  const handleRemove = () => {
    Alert.alert(
      'Remove UPI',
      'This will disable selling. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: disableSell },
      ],
    );
  };

  const appInfo = upiConfig ? UPI_APPS.find((a) => a.id === upiConfig.app) : null;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>UPI Management</Text>
          <Text style={styles.subtitle}>Manage your payment methods</Text>
        </View>

        {upiConfig ? (
          <View style={styles.configCard}>
            <View style={styles.configHeader}>
              <View style={[styles.appBadge, { backgroundColor: (appInfo?.color ?? COLORS.electricBlue) + '20' }]}>
                <Ionicons
                  name={(appInfo?.icon ?? 'card') as 'card'}
                  size={24}
                  color={appInfo?.color ?? COLORS.electricBlue}
                />
              </View>
              <View style={styles.configInfo}>
                <Text style={styles.appName}>{appInfo?.name ?? 'UPI'}</Text>
                <Text style={styles.upiId}>{upiConfig.upiId}</Text>
              </View>
              <View style={[styles.statusBadge, upiConfig.isActive ? styles.activeBadge : styles.inactiveBadge]}>
                <Text style={[styles.statusText, upiConfig.isActive ? styles.activeText : styles.inactiveText]}>
                  {upiConfig.isActive ? 'Active' : 'Inactive'}
                </Text>
              </View>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setShowPicker(true)}
                activeOpacity={0.7}
              >
                <Ionicons name="pencil" size={16} color={COLORS.electricBlue} />
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={handleRemove}
                activeOpacity={0.7}
              >
                <Ionicons name="trash" size={16} color={COLORS.red} />
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addCard}
            onPress={() => setShowPicker(true)}
            activeOpacity={0.7}
          >
            <View style={styles.addIconWrapper}>
              <Ionicons name="add-circle" size={32} color={COLORS.electricBlue} />
            </View>
            <Text style={styles.addTitle}>Add UPI ID</Text>
            <Text style={styles.addSubtitle}>Link your UPI to start selling tokens</Text>
          </TouchableOpacity>
        )}

        {/* UPI Apps list */}
        <Text style={styles.sectionTitle}>Supported UPI Apps</Text>
        {UPI_APPS.map((app) => (
          <View key={app.id} style={styles.appRow}>
            <View style={[styles.appIconWrapper, { backgroundColor: app.color + '15' }]}>
              <Ionicons name={app.icon as 'wallet'} size={22} color={app.color} />
            </View>
            <Text style={styles.appRowName}>{app.name}</Text>
            <Ionicons name="checkmark-circle" size={18} color={COLORS.green} />
          </View>
        ))}

        {/* Info section */}
        <View style={styles.infoSection}>
          <Ionicons name="shield-checkmark" size={20} color={COLORS.electricBlue} />
          <Text style={styles.infoText}>
            Your UPI ID is encrypted and stored securely. We never share your payment details.
          </Text>
        </View>
      </ScrollView>

      <UPIAppPicker
        visible={showPicker}
        onSelect={handleSelect}
        onClose={() => setShowPicker(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.coolGray },
  content: { paddingBottom: SPACING.xl },
  header: { paddingHorizontal: SPACING.md, paddingTop: SPACING.md, paddingBottom: SPACING.md },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.textPrimary },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, marginTop: 2 },
  configCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOW.md,
  },
  configHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  appBadge: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  configInfo: { flex: 1 },
  appName: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary },
  upiId: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.full,
  },
  activeBadge: { backgroundColor: COLORS.greenLight },
  inactiveBadge: { backgroundColor: COLORS.redLight },
  statusText: { fontSize: 12, fontWeight: '700' },
  activeText: { color: COLORS.green },
  inactiveText: { color: COLORS.red },
  actionRow: { flexDirection: 'row', gap: SPACING.sm },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.electricBlue,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.sm,
    gap: 6,
  },
  editText: { fontSize: 14, fontWeight: '600', color: COLORS.electricBlue },
  removeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.red,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.sm,
    gap: 6,
  },
  removeText: { fontSize: 14, fontWeight: '600', color: COLORS.red },
  addCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.electricBlue,
    gap: SPACING.sm,
    ...SHADOW.sm,
  },
  addIconWrapper: {},
  addTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
  addSubtitle: { fontSize: 13, color: COLORS.textSecondary, textAlign: 'center' },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  appRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
    marginHorizontal: SPACING.md,
    marginBottom: 4,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
  },
  appIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appRowName: { flex: 1, fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.commissionBg,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  infoText: { flex: 1, fontSize: 13, color: COLORS.commissionText, lineHeight: 18 },
});
