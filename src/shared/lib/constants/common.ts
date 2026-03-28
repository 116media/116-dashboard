/**
 * Common application constants and environment variables.
 *
 * @description
 * Centralized configuration for the application including:
 *
 * **Environment Variables:**
 * - Third-party API keys (Cloudinary, Google)
 * - Application URLs (API, staging, production, development)
 * - Security keys (marked as deprecated - should be server-side only)
 *
 * **Application Identity:**
 * - App name, author, social media handles, description
 * - Logo asset paths (light/dark themes)
 *
 * **Storage Keys:**
 * - LocalStorage keys for authentication tokens and OTP codes
 * - Platform identifier
 *
 * **Runtime Checks:**
 * - Server-side rendering detection
 *
 * @remarks
 * ⚠️ SECURITY WARNING: Variables prefixed with VITE_ are exposed to the client.
 * Sensitive keys (IMAGES_API_SECRET, JWT_SECRET_KEY, CRYPTO_PASSPHASE) should be
 * moved to server-side environment variables.
 */

export const IMAGES_API_URL = import.meta.env.VITE_CLOUDINARY_URL as string;
export const IMAGES_API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY as string;
export const IMAGES_API_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET as string;
export const IMAGES_API_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string;
export const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY as string;

export const API_URL = import.meta.env.VITE_API_URL;
export const STAGING_URL = import.meta.env.VITE_FRONTEND_STAGING_URL;
export const PROD_URL = import.meta.env.VITE_FRONTEND_PRODUCTION_URL;
export const DEV_URL = import.meta.env.VITE_FRONTEND_DEVELOPMENT_URL;

export const IMAGES_API_SECRET = import.meta.env.VITE_CLOUDINARY_SECRET as string;
export const JWT_SECRET_KEY = import.meta.env.VITE_JWT_SECRET_KEY;
export const CRYPTO_PASSPHASE = import.meta.env.VITE_CRYPTO_PASSPHASE;

export const APP_NAME = "116";
export const APP_AUTHOR = `${APP_NAME} Network`;
export const APP_TWITTER_HANDLE = `@${APP_NAME}HQ`;
export const APP_DESCRIPTION = "When words stop coming out, music pops up";

export const LOGO_LIGHT = "/assets/logo/light.svg";
export const LOGO_DARK = "/assets/logo/dark.svg";

export const API_TOKEN_STORAGE_KEY = `${APP_NAME}-token`;
export const OTP_CODE_STORAGE_KEY = `${APP_NAME}-code`;
export const PLATFORM_NAME = `${APP_NAME}-dashboard`;

export const isServer = typeof window === "undefined";
