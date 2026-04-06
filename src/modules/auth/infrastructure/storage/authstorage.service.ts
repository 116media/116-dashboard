import { OTP_CODE_STORAGE_KEY } from "@/shared/infrastructure/constants/common";
import { LocalStorageService } from "@/shared/infrastructure/storage/localstorage.service";

/**
 * Authentication storage service for managing OTP codes in localStorage.
 *
 * @description
 * Provides specialized methods for storing and retrieving OTP verification
 * codes. Wraps the generic LocalStorageService with auth-specific operations.
 *
 * @remarks
 * - Token management is handled by HttpOnly cookies (server-side)
 * - User data is managed via encrypted redux-persist (not localStorage)
 * - Only OTP codes remain in localStorage
 */
export const AuthStorageService = {
    /**
     * Stores the OTP verification code.
     *
     * @param {string} code - OTP code from verification response
     */
    setOtpCode(code: string): void {
        LocalStorageService.setItem(OTP_CODE_STORAGE_KEY, code);
    },

    /**
     * Retrieves the stored OTP code.
     *
     * @returns {string | null} OTP code or null if not found
     */
    getOtpCode(): string | null {
        return LocalStorageService.getItem<string>(OTP_CODE_STORAGE_KEY);
    },

    /**
     * Removes the stored OTP code.
     */
    clearOtpCode(): void {
        LocalStorageService.removeItem(OTP_CODE_STORAGE_KEY);
    }
};
