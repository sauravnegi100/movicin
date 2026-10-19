/**
 * Authentication validation rules and helpers.
 * Shared between client-side live feedback and server-side validation.
 */

export interface PasswordValidationResult {
  hasMinLength: boolean;
  hasLetter: boolean;
  hasNumber: boolean;
  isValid: boolean;
}

/**
 * Validates password according to documented criteria:
 * - At least 8 characters
 * - At least one letter
 * - At least one number
 */
export function validatePassword(password: string): PasswordValidationResult {
  const hasMinLength = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return {
    hasMinLength,
    hasLetter,
    hasNumber,
    isValid: hasMinLength && hasLetter && hasNumber,
  };
}

/**
 * Basic email format verification.
 */
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
