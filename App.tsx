// App.tsx

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { UserProvider } from './src/context/UserContext';
import { OrderProvider } from './src/context/OrderContext';
import { CommissionProvider } from './src/context/CommissionContext';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <UserProvider>
          <OrderProvider>
            <CommissionProvider>
              <NavigationContainer>
                <StatusBar style="auto" />
                <BottomTabNavigator />
              </NavigationContainer>
            </CommissionProvider>
          </OrderProvider>
        </UserProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
