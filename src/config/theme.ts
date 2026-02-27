// src/config/theme.ts

export const COLORS = {
  // Primary
  electricBlue: '#0055ff',
  electricBlueDark: '#0044cc',
  electricBlueLight: '#3377ff',

  // Background
  coolGray: '#f8f9ff',
  white: '#ffffff',
  cardBg: '#ffffff',

  // Text
  textPrimary: '#0d0d2b',
  textSecondary: '#6b7280',
  textMuted: '#9ca3af',
  textInverse: '#ffffff',

  // Accent
  green: '#22c55e',
  greenLight: '#dcfce7',
  red: '#ef4444',
  redLight: '#fee2e2',
  orange: '#f97316',
  orangeLight: '#ffedd5',
  yellow: '#eab308',
  yellowLight: '#fef9c3',
  purple: '#8b5cf6',
  purpleLight: '#ede9fe',

  // Border
  border: '#e5e7eb',
  borderLight: '#f3f4f6',

  // Tab bar
  tabBarBg: '#ffffff',
  tabBarActive: '#0055ff',
  tabBarInactive: '#9ca3af',

  // Commission
  commissionBg: '#eff6ff',
  commissionText: '#1d4ed8',

  // Newbie
  newbieBg: '#fef3c7',
  newbieBorder: '#fbbf24',
  newbieText: '#92400e',
} as const;

export const FONTS = {
  regular: 'SpaceGrotesk_400Regular',
  medium: 'SpaceGrotesk_500Medium',
  semiBold: 'SpaceGrotesk_600SemiBold',
  bold: 'SpaceGrotesk_700Bold',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const SHADOW = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
} as const;
