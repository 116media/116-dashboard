import { LocalStorageService } from "@/core/infrastructure/storage/localstorage.service";
import { API_TOKEN_STORAGE_KEY, OTP_CODE_STORAGE_KEY } from "@/shared/lib/constants/common";

/**
 * Authentication storage service for managing auth data in localStorage.
 *
 * @description
 * Provides specialized methods for storing and retrieving authentication-related
 * data (JWT tokens and OTP codes). Wraps the generic LocalStorageService
 * with auth-specific operations.
 *
 * @remarks
 * - Uses predefined storage keys from constants
 * - Part of the infrastructure layer
 * - Used by authentication use cases and API client
 * - Manages JWT tokens and OTP verification codes
 * - User data is managed via encrypted redux-persist (not localStorage)
 */
export const AuthStorageService = {
    /**
     * Stores the JWT authentication token.
     *
     * @param {string} token - JWT token from login response
     */
    setToken(token: string): void {
        LocalStorageService.setItem(API_TOKEN_STORAGE_KEY, token);
    },

    /**
     * Stores the OTP verification code.
     *
     * @param {string} code - OTP code from verification response
     */
    setOtpCode(code: string): void {
        LocalStorageService.setItem(OTP_CODE_STORAGE_KEY, code);
    },

    /**
     * Retrieves the stored JWT token.
     *
     * @returns {string | null} JWT token or null if not found
     */
    getToken(): string | null {
        return LocalStorageService.getItem<string>(API_TOKEN_STORAGE_KEY);
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
     * Removes the stored JWT token.
     */
    clearToken(): void {
        LocalStorageService.removeItem(API_TOKEN_STORAGE_KEY);
    },

    /**
     * Removes the stored OTP code.
     */
    clearOtpCode(): void {
        LocalStorageService.removeItem(OTP_CODE_STORAGE_KEY);
    }
};
