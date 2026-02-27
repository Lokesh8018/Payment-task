// src/navigation/BottomTabNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import BuyScreen from '../screens/BuyScreen';
import UPIScreen from '../screens/UPIScreen';
import TeamScreen from '../screens/TeamScreen';
import MineScreen from '../screens/MineScreen';
import { COLORS } from '../config/theme';

export type RootTabParamList = {
  Home: undefined;
  Buy: undefined;
  UPI: undefined;
  Team: undefined;
  Mine: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

const TAB_ICONS: Record<keyof RootTabParamList, { active: IoniconsName; inactive: IoniconsName }> = {
  Home: { active: 'home', inactive: 'home-outline' },
  Buy: { active: 'cart', inactive: 'cart-outline' },
  UPI: { active: 'card', inactive: 'card-outline' },
  Team: { active: 'people', inactive: 'people-outline' },
  Mine: { active: 'person', inactive: 'person-outline' },
};

function TabIcon({
  name,
  focused,
  color,
  size,
}: {
  name: keyof RootTabParamList;
  focused: boolean;
  color: string;
  size: number;
}) {
  const icon = focused ? TAB_ICONS[name].active : TAB_ICONS[name].inactive;
  return <Ionicons name={icon} size={size} color={color} />;
}

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.tabBarActive,
        tabBarInactiveTintColor: COLORS.tabBarInactive,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused, color, size }) => (
          <TabIcon
            name={route.name as keyof RootTabParamList}
            focused={focused}
            color={color}
            size={size}
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Buy" component={BuyScreen} />
      <Tab.Screen
        name="UPI"
        component={UPIScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={[styles.upiTabIcon, focused && styles.upiTabIconActive]}>
              <Ionicons
                name={focused ? 'card' : 'card-outline'}
                size={size}
                color={focused ? COLORS.white : color}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>UPI</Text>
          ),
        }}
      />
      <Tab.Screen name="Team" component={TeamScreen} />
      <Tab.Screen name="Mine" component={MineScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.tabBarBg,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    height: 64,
    paddingBottom: 8,
    paddingTop: 6,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  tabLabelActive: {
    color: COLORS.electricBlue,
  },
  upiTabIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -4,
  },
  upiTabIconActive: {
    backgroundColor: COLORS.electricBlue,
  },
});
