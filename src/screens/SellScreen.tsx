// src/screens/SellScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import SellToggle from '../components/SellToggle';
import UPIAppPicker from '../components/UPIAppPicker';
import { useUPIApps } from '../hooks/useUPIApps';
import { useUser } from '../context/UserContext';
import { useOrders } from '../context/OrderContext';
import { Transaction, UPIApp } from '../types';
import { COLORS, SPACING, BORDER_RADIUS, SHADOW } from '../config/theme';
import { CURRENCY_SYMBOL, MIN_SELL_AMOUNT, TOKEN_CONVERSION_RATE } from '../config/constants';

export default function SellScreen() {
  const { user, updateTokenBalance, updateBalance } = useUser();
  const { addSellHistory } = useOrders();
  const { isSellEnabled, upiConfig, saveUPIConfig, enableSell, disableSell } = useUPIApps();
  const [showUPIPicker, setShowUPIPicker] = useState(false);
  const [sellAmount, setSellAmount] = useState(1);

  const tokenBalance = user?.tokenBalance ?? 0;
  const estimatedAmount = sellAmount * TOKEN_CONVERSION_RATE;
  const canSell = isSellEnabled && tokenBalance >= sellAmount && estimatedAmount >= MIN_SELL_AMOUNT;

  const handleToggle = (value: boolean) => {
    if (value) {
      enableSell();
    } else {
      disableSell();
    }
  };

  const handleUPISelect = (upiId: string, app: UPIApp) => {
    saveUPIConfig(upiId, app);
    setShowUPIPicker(false);
    Alert.alert('UPI Setup Complete', `Your UPI ID ${upiId} has been saved. You can now sell tokens!`);
  };

  const handleSell = () => {
    if (!canSell) return;
    if (!upiConfig) {
      Alert.alert('Setup UPI', 'Please setup your UPI ID before selling.');
      return;
    }

    Alert.alert(
      'Confirm Sale',
      `Sell ${sellAmount} token(s) for ${CURRENCY_SYMBOL}${estimatedAmount}?\n\nAmount will be credited to ${upiConfig.upiId}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sell',
          onPress: () => {
            const tx: Transaction = {
              id: `txn_${Date.now()}`,
              type: 'sell',
              amount: estimatedAmount,
              tokens: sellAmount,
              status: 'completed',
              timestamp: new Date().toISOString(),
              upiId: upiConfig.upiId,
              referenceId: `SELL${Date.now()}`,
              description: `Sold ${sellAmount} tokens`,
            };
            addSellHistory(tx);
            updateTokenBalance(-sellAmount);
            updateBalance(estimatedAmount);
            Alert.alert('Sale Successful!', `${CURRENCY_SYMBOL}${estimatedAmount} will be credited to ${upiConfig.upiId}`);
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Sell Tokens</Text>
          <Text style={styles.subtitle}>Convert your tokens to cash</Text>
        </View>

        {/* Token Balance */}
        <View style={styles.balanceCard}>
          <Ionicons name="diamond" size={28} color={COLORS.electricBlue} />
          <View style={styles.balanceInfo}>
            <Text style={styles.balanceLabel}>Available Tokens</Text>
            <Text style={styles.balanceValue}>{tokenBalance}</Text>
          </View>
          <Text style={styles.balanceEstimate}>
            ≈ {CURRENCY_SYMBOL}{(tokenBalance * TOKEN_CONVERSION_RATE).toLocaleString('en-IN')}
          </Text>
        </View>

        {/* Sell Toggle */}
        <SellToggle
          isSellEnabled={isSellEnabled}
          hasUPIConfig={!!upiConfig}
          onToggle={handleToggle}
          onSetupUPI={() => setShowUPIPicker(true)}
        />

        {/* Sell Form */}
        {isSellEnabled && upiConfig && (
          <View style={styles.sellForm}>
            <Text style={styles.formTitle}>Sell Tokens</Text>

            <View style={styles.upiDisplay}>
              <Ionicons name="card" size={18} color={COLORS.electricBlue} />
              <Text style={styles.upiId}>{upiConfig.upiId}</Text>
              <TouchableOpacity onPress={() => setShowUPIPicker(true)}>
                <Text style={styles.changeUPI}>Change</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.amountRow}>
              <TouchableOpacity
                style={styles.amountBtn}
                onPress={() => setSellAmount((v) => Math.max(1, v - 1))}
                disabled={sellAmount <= 1}
              >
                <Ionicons name="remove" size={20} color={sellAmount <= 1 ? COLORS.textMuted : COLORS.textPrimary} />
              </TouchableOpacity>
              <View style={styles.amountDisplay}>
                <Text style={styles.amountValue}>{sellAmount}</Text>
                <Text style={styles.amountLabel}>Token{sellAmount !== 1 ? 's' : ''}</Text>
              </View>
              <TouchableOpacity
                style={styles.amountBtn}
                onPress={() => setSellAmount((v) => Math.min(tokenBalance, v + 1))}
                disabled={sellAmount >= tokenBalance}
              >
                <Ionicons name="add" size={20} color={sellAmount >= tokenBalance ? COLORS.textMuted : COLORS.textPrimary} />
              </TouchableOpacity>
            </View>

            <View style={styles.estimateRow}>
              <Text style={styles.estimateLabel}>You will receive:</Text>
              <Text style={styles.estimateValue}>{CURRENCY_SYMBOL}{estimatedAmount}</Text>
            </View>

            {estimatedAmount < MIN_SELL_AMOUNT && (
              <Text style={styles.minAmountWarning}>
                Minimum sell amount is {CURRENCY_SYMBOL}{MIN_SELL_AMOUNT}
              </Text>
            )}

            <TouchableOpacity
              style={[styles.sellButton, !canSell && styles.sellButtonDisabled]}
              onPress={handleSell}
              disabled={!canSell}
              activeOpacity={0.8}
            >
              <Ionicons name="cash" size={18} color={COLORS.white} />
              <Text style={styles.sellButtonText}>Sell Tokens</Text>
            </TouchableOpacity>
          </View>
        )}

        {!isSellEnabled && (
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={22} color={COLORS.electricBlue} />
            <Text style={styles.infoText}>
              Enable selling and setup your UPI ID to start selling your tokens for cash.
            </Text>
          </View>
        )}
      </ScrollView>

      <UPIAppPicker
        visible={showUPIPicker}
        onSelect={handleUPISelect}
        onClose={() => setShowUPIPicker(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.coolGray },
  content: { paddingBottom: SPACING.xl },
  header: { paddingHorizontal: SPACING.md, paddingTop: SPACING.md, paddingBottom: SPACING.sm },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.textPrimary },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, marginTop: 2 },
  balanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
    ...SHADOW.sm,
  },
  balanceInfo: { flex: 1 },
  balanceLabel: { fontSize: 12, color: COLORS.textSecondary },
  balanceValue: { fontSize: 28, fontWeight: '800', color: COLORS.textPrimary },
  balanceEstimate: { fontSize: 14, fontWeight: '600', color: COLORS.green },
  sellForm: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.sm,
    gap: SPACING.sm,
    ...SHADOW.sm,
  },
  formTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
  upiDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.commissionBg,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.sm,
    gap: SPACING.sm,
  },
  upiId: { flex: 1, fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
  changeUPI: { fontSize: 13, fontWeight: '600', color: COLORS.electricBlue },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  amountBtn: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountDisplay: { alignItems: 'center' },
  amountValue: { fontSize: 36, fontWeight: '800', color: COLORS.textPrimary },
  amountLabel: { fontSize: 12, color: COLORS.textSecondary },
  estimateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  estimateLabel: { fontSize: 14, color: COLORS.textSecondary },
  estimateValue: { fontSize: 20, fontWeight: '800', color: COLORS.green },
  minAmountWarning: { fontSize: 12, color: COLORS.red },
  sellButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.green,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.sm + 2,
    gap: 6,
  },
  sellButtonDisabled: { backgroundColor: COLORS.textMuted },
  sellButtonText: { fontSize: 15, fontWeight: '700', color: COLORS.white },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.commissionBg,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.sm,
    gap: SPACING.sm,
  },
  infoText: { flex: 1, fontSize: 14, color: COLORS.commissionText, lineHeight: 20 },
});
