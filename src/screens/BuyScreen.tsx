// src/screens/BuyScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BuyOrderCard from '../components/BuyOrderCard';
import BuyConfirmationSheet from '../components/BuyConfirmationSheet';
import NewbieBanner from '../components/NewbieBanner';
import NewbieRewardCelebration from '../components/NewbieRewardCelebration';
import { useOrders } from '../context/OrderContext';
import { useUser } from '../context/UserContext';
import { useNewbieReward } from '../hooks/useNewbieReward';
import { BuyOrder, Transaction } from '../types';
import { COLORS, SPACING } from '../config/theme';

export default function BuyScreen() {
  const { buyOrders, addBuyHistory, markOrderUnavailable, refreshOrders } = useOrders();
  const { user, updateTokenBalance, updateBalance, claimNewbieReward } = useUser();
  const { isNewbie, discountAmount, showCelebration, claimReward, dismissCelebration } =
    useNewbieReward();

  const [selectedOrder, setSelectedOrder] = useState<BuyOrder | null>(null);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const availableOrders = buyOrders.filter((o) => o.isAvailable);

  const handleBuyPress = (order: BuyOrder) => {
    setSelectedOrder(order);
    setConfirmVisible(true);
  };

  const handleConfirm = async () => {
    if (!selectedOrder) return;
    setConfirmVisible(false);

    const discount = isNewbie ? discountAmount : 0;
    const finalPrice = Math.max(0, selectedOrder.totalPrice - discount);

    // Check balance
    if ((user?.balance ?? 0) < finalPrice) {
      Alert.alert('Insufficient Balance', 'You do not have enough balance to complete this purchase.');
      return;
    }

    const tx: Transaction = {
      id: `txn_${Date.now()}`,
      type: 'buy',
      amount: finalPrice,
      tokens: selectedOrder.tokenCount,
      status: 'completed',
      timestamp: new Date().toISOString(),
      referenceId: `REF${Date.now()}`,
      description: `Bought ${selectedOrder.tokenCount} tokens`,
      orderId: selectedOrder.id,
    };

    addBuyHistory(tx);
    markOrderUnavailable(selectedOrder.id);
    updateTokenBalance(selectedOrder.tokenCount);
    updateBalance(-finalPrice);

    if (isNewbie) {
      await claimReward();
      claimNewbieReward();
    }

    setSelectedOrder(null);
  };

  const handleCancel = () => {
    setConfirmVisible(false);
    setSelectedOrder(null);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    refreshOrders();
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Buy Tokens</Text>
        <Text style={styles.subtitle}>{availableOrders.length} offers available</Text>
      </View>

      {isNewbie && (
        <NewbieBanner
          onPress={() =>
            Alert.alert('🎉 Newbie Offer', `Get ₹${discountAmount} OFF on your first buy!`)
          }
        />
      )}

      <FlatList
        data={buyOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BuyOrderCard
            order={item}
            isNewbie={isNewbie}
            discountAmount={discountAmount}
            onBuy={handleBuyPress}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📭</Text>
            <Text style={styles.emptyTitle}>No orders available</Text>
            <Text style={styles.emptySubtitle}>Check back later for new token listings</Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.electricBlue]}
          />
        }
      />

      <BuyConfirmationSheet
        visible={confirmVisible}
        order={selectedOrder}
        isNewbie={isNewbie}
        onConfirm={() => { void handleConfirm(); }}
        onCancel={handleCancel}
      />

      <NewbieRewardCelebration
        visible={showCelebration}
        onDismiss={dismissCelebration}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.coolGray,
  },
  header: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  listContent: {
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xl,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 80,
    gap: SPACING.sm,
  },
  emptyEmoji: {
    fontSize: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: SPACING.xl,
  },
});
