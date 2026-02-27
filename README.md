# CryptoTrade — Cryptocurrency Token Trading Platform

![CI Build](https://github.com/Lokesh8018/Payment-task/actions/workflows/ci.yml/badge.svg)

A full-featured **React Native Expo** cryptocurrency token trading platform built with TypeScript. Trade tokens, earn commissions through a two-level referral system, and manage UPI payments — all in one sleek mobile app.

---

## Features

- 🪙 **Token Trading** — Browse buy orders, purchase tokens with real-time price breakdown
- 💰 **Sell Tokens** — Convert your token balance back to cash via UPI
- 🎉 **Newbie Reward** — ₹350 OFF on first purchase for new users
- 🤝 **Two-Level Referral Commission** — Earn 1.8% from direct referrals (L1) and 0.6% from their referrals (L2)
- 📊 **Commission Breakdown** — Every order shows transparent 2.7% commission split
- 💳 **UPI Integration** — Link GPay, PhonePe, Paytm, BHIM, or any UPI app
- 👥 **Team Dashboard** — Track your referral network and earnings
- 📜 **Transaction History** — Separate buy and sell history with status tracking
- 🌙 **Celebration Animations** — Animated modal on first purchase

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React Native + Expo ~52 |
| Language | TypeScript (strict mode) |
| Navigation | React Navigation v6 (Bottom Tabs) |
| State | React Context API + AsyncStorage |
| UI | React Native Paper + Ionicons |
| Animations | React Native Animated API + Lottie |
| Testing | Jest + jest-expo |
| Linting | ESLint + TypeScript ESLint |
| CI/CD | GitHub Actions |

---

## Project Structure

```
├── App.tsx                          # Root component with all providers
├── src/
│   ├── types/index.ts               # All TypeScript interfaces
│   ├── config/
│   │   ├── commission.ts            # Commission rate constants
│   │   ├── theme.ts                 # Design system (colors, spacing)
│   │   └── constants.ts             # App-wide constants
│   ├── utils/
│   │   ├── commissionCalculator.ts  # Commission logic
│   │   └── validators.ts            # UPI ID & amount validators
│   ├── services/
│   │   └── processCommission.ts     # Commission processing service
│   ├── context/
│   │   ├── UserContext.tsx          # User state + balance
│   │   ├── OrderContext.tsx         # Orders + transaction history
│   │   └── CommissionContext.tsx    # Commission records + team stats
│   ├── hooks/
│   │   ├── useNewbieReward.ts       # Newbie discount hook
│   │   └── useUPIApps.ts            # UPI app management hook
│   ├── data/mockData.ts             # Sample data for development
│   ├── components/                  # Reusable UI components
│   ├── screens/                     # Screen components
│   └── navigation/                  # Navigation setup
├── __tests__/                       # Unit tests
└── assets/animations/               # Lottie animation files
```

---

## Commission System

Every token purchase generates a **2.7% commission** distributed as follows:

| Scenario | L1 Referrer | L2 Referrer | Platform |
|----------|-------------|-------------|----------|
| No referrer | — | — | 2.7% |
| L1 only | 1.8% | — | 0.9% |
| L1 + L2 | 1.8% | 0.6% | 0.3% |

Commissions are credited **instantly** on every completed purchase.

---

## Newbie Reward

New users receive a **₹350 discount** on their **first token purchase**:

- Automatically applied at checkout if the user is new
- Shows a 🎉 celebration modal after successful first buy
- One-time only — stored in AsyncStorage after claim
- Commission is still calculated on the original order amount

---

## Setup & Installation

### Prerequisites
- Node.js 18+
- npm 9+
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator / Android Emulator or Expo Go app

### Install

```bash
git clone https://github.com/Lokesh8018/Payment-task.git
cd Payment-task
npm install
```

### Run

```bash
# Start Expo dev server
npx expo start

# Run on iOS
npx expo start --ios

# Run on Android
npx expo start --android

# Run on Web
npx expo start --web
```

### Test

```bash
npm test
```

### Type Check

```bash
npm run typecheck
```

### Lint

```bash
npm run lint
```

---

## CI/CD Pipeline

GitHub Actions runs three jobs on every push/PR to `main`:

1. **lint-and-typecheck** — ESLint + TypeScript compiler
2. **test** — Jest test suite
3. **build** — Expo web export

See [`.github/workflows/ci.yml`](.github/workflows/ci.yml) for full configuration.

---

## License

MIT

A cryptocurrency token trading platform built with React Native (Expo) featuring integrated UPI payments, referral rewards, and team commission tracking.

## Features
- Token Buy/Sell with UPI integration
- 2.7% Commission system (L1: 1.8%, L2: 0.6%, Platform: 0.3%)
- Newbie Reward: ₹350 off first buy order
- Team referral tracking
- GitHub Actions CI/CD

🚧 Under Development