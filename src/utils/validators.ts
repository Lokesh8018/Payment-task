// src/utils/validators.ts

/**
 * Validates a UPI ID.
 * Format: localpart@provider
 * localpart may contain: alphanumeric, dots, hyphens, underscores
 * provider must be at least 2 alpha characters
 */
export function validateUPIId(upiId: string): boolean {
  if (!upiId || typeof upiId !== 'string') return false;
  const upiRegex = /^[a-zA-Z0-9.\-_]+@[a-zA-Z]{2,}$/;
  return upiRegex.test(upiId.trim());
}

/**
 * Validates a transaction amount.
 * Must be a finite positive number with at most 2 decimal places.
 */
export function validateAmount(amount: number): boolean {
  if (typeof amount !== 'number') return false;
  if (!isFinite(amount)) return false;
  if (amount <= 0) return false;
  // Ensure at most 2 decimal places
  const rounded = Math.round(amount * 100) / 100;
  return rounded === amount || Math.abs(rounded - amount) < 1e-9;
}

/**
 * Validates a referral code (alphanumeric, 6-12 chars).
 */
export function validateReferralCode(code: string): boolean {
  if (!code || typeof code !== 'string') return false;
  return /^[A-Z0-9]{6,12}$/.test(code.trim().toUpperCase());
}

/**
 * Validates a phone number (Indian 10-digit).
 */
export function validatePhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  return /^[6-9]\d{9}$/.test(phone.trim());
}
