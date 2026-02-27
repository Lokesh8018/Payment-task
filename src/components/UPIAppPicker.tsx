// src/components/UPIAppPicker.tsx

import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UPIApp } from '../types';
import { UPI_APPS, UPIAppInfo } from '../config/constants';
import { COLORS, SPACING, BORDER_RADIUS, SHADOW } from '../config/theme';
import { validateUPIId } from '../utils/validators';

interface UPIAppPickerProps {
  visible: boolean;
  onSelect: (upiId: string, app: UPIApp) => void;
  onClose: () => void;
}

export default function UPIAppPicker({ visible, onSelect, onClose }: UPIAppPickerProps) {
  const [selectedApp, setSelectedApp] = useState<UPIAppInfo | null>(null);
  const [upiId, setUPIId] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (!selectedApp) {
      setError('Please select a UPI app');
      return;
    }
    if (!validateUPIId(upiId)) {
      setError('Enter a valid UPI ID (e.g., name@upi)');
      return;
    }
    onSelect(upiId.trim(), selectedApp.id);
    setUPIId('');
    setSelectedApp(null);
    setError('');
  };

  const handleClose = () => {
    setUPIId('');
    setSelectedApp(null);
    setError('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <View style={styles.titleRow}>
            <Text style={styles.title}>Setup UPI</Text>
            <TouchableOpacity onPress={handleClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="close-circle" size={24} color={COLORS.textMuted} />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionLabel}>Select UPI App</Text>
          <FlatList
            data={UPI_APPS}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.appList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.appItem,
                  selectedApp?.id === item.id && styles.appItemSelected,
                  { borderColor: item.color },
                ]}
                onPress={() => {
                  setSelectedApp(item);
                  setError('');
                }}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={item.icon as 'wallet'}
                  size={20}
                  color={selectedApp?.id === item.id ? item.color : COLORS.textMuted}
                />
                <Text
                  style={[
                    styles.appName,
                    selectedApp?.id === item.id && { color: item.color, fontWeight: '700' },
                  ]}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />

          <Text style={styles.sectionLabel}>UPI ID</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="at" size={18} color={COLORS.textMuted} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={upiId}
              onChangeText={(v) => {
                setUPIId(v);
                setError('');
              }}
              placeholder="yourname@upi"
              placeholderTextColor={COLORS.textMuted}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleConfirm}>
              <Ionicons name="checkmark" size={18} color={COLORS.white} />
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

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
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: SPACING.sm,
  },
  appList: {
    paddingBottom: SPACING.md,
    gap: SPACING.sm,
  },
  appItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    marginRight: SPACING.sm,
    minWidth: 80,
    gap: 4,
  },
  appItemSelected: {
    backgroundColor: COLORS.coolGray,
  },
  appName: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  inputIcon: {
    marginRight: 4,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  errorText: {
    fontSize: 13,
    color: COLORS.red,
    marginBottom: SPACING.sm,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.sm,
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
  saveButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.electricBlue,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.sm + 2,
    gap: 6,
  },
  saveText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white,
  },
});
