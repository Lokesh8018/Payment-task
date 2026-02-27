// __tests__/upiValidation.test.ts

import { validateUPIId } from '../src/utils/validators';

describe('validateUPIId', () => {
  describe('Valid UPI IDs', () => {
    it('should accept standard format name@bank', () => {
      expect(validateUPIId('rahul@okaxis')).toBe(true);
    });

    it('should accept numbers in local part', () => {
      expect(validateUPIId('9876543210@paytm')).toBe(true);
    });

    it('should accept dots in local part', () => {
      expect(validateUPIId('rahul.sharma@gpay')).toBe(true);
    });

    it('should accept hyphens in local part', () => {
      expect(validateUPIId('rahul-sharma@upi')).toBe(true);
    });

    it('should accept underscores in local part', () => {
      expect(validateUPIId('rahul_sharma@sbi')).toBe(true);
    });

    it('should accept mixed alphanumeric', () => {
      expect(validateUPIId('user123@okhdfcbank')).toBe(true);
    });

    it('should accept uppercase letters', () => {
      expect(validateUPIId('RahulSharma@YESB')).toBe(true);
    });

    it('should accept 2-char provider', () => {
      expect(validateUPIId('test@ok')).toBe(true);
    });
  });

  describe('Invalid UPI IDs', () => {
    it('should reject empty string', () => {
      expect(validateUPIId('')).toBe(false);
    });

    it('should reject missing @ symbol', () => {
      expect(validateUPIId('rahulokaxis')).toBe(false);
    });

    it('should reject missing local part', () => {
      expect(validateUPIId('@okaxis')).toBe(false);
    });

    it('should reject missing provider', () => {
      expect(validateUPIId('rahul@')).toBe(false);
    });

    it('should reject numeric-only provider', () => {
      expect(validateUPIId('rahul@123')).toBe(false);
    });

    it('should reject 1-char provider', () => {
      expect(validateUPIId('rahul@a')).toBe(false);
    });

    it('should reject spaces', () => {
      expect(validateUPIId('ra hul@okaxis')).toBe(false);
    });

    it('should reject multiple @ symbols', () => {
      expect(validateUPIId('rahul@@okaxis')).toBe(false);
    });

    it('should reject special chars in local part (like !)', () => {
      expect(validateUPIId('rahul!@okaxis')).toBe(false);
    });

    it('should reject null-like falsy values gracefully', () => {
      // TypeScript will catch this but test runtime safety
      expect(validateUPIId(null as unknown as string)).toBe(false);
    });
  });
});
