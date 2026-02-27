// src/screens/SellHistoryScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TransactionHistoryItem from '../components/TransactionHistoryItem';
import { useOrders } from '../context/OrderContext';
import { COLORS, SPACING } from '../config/theme';

export default function SellHistoryScreen() {
  const { sellHistory, isLoading } = useOrders();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Sell History</Text>
        <Text style={styles.subtitle}>{sellHistory.length} transaction{sellHistory.length !== 1 ? 's' : ''}</Text>
      </View>

      <FlatList
        data={sellHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionHistoryItem transaction={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          !isLoading ? (
            <View style={styles.empty}>
              <Text style={styles.emptyEmoji}>💸</Text>
              <Text style={styles.emptyTitle}>No sell history yet</Text>
              <Text style={styles.emptySubtitle}>Your token sales will appear here</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.coolGray },
  header: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
    backgroundColor: COLORS.white,
  },
  title: { fontSize: 22, fontWeight: '800', color: COLORS.textPrimary },
  subtitle: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  listContent: { paddingBottom: SPACING.xl },
  empty: { alignItems: 'center', paddingTop: 80, gap: SPACING.sm },
  emptyEmoji: { fontSize: 48 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },
  emptySubtitle: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center' },
});
