/**
 * Application route path constants.
 *
 * @description
 * Centralized route paths for consistent navigation throughout the application.
 * Use these constants instead of hardcoded strings.
 *
 * **Authentication Routes:**
 * - Login page (root path)
 *
 * **Main Application Routes:**
 * - Overview: Home page after authentication (stats, charts, summaries)
 * - Settings: User preferences and configuration
 *
 * **Content Management Routes:**
 * - Contents: General content overview
 * - Videos: Video content management
 * - Articles: Article/blog management
 *
 * **Advertising Routes:**
 * - Ad Banners: Banner advertisement management
 * - Ad Popups: Popup advertisement management
 *
 * **User Management Routes:**
 * - Admins: Administrator account management
 * - Users: Regular user account management
 *
 * **Error Routes:**
 * - 404 Not Found: Invalid route fallback (French: "page-introuvable")
 */

export const LOGIN_PATH = "/";
export const FORGOT_PASSWORD_PATH = "/forgot-password";
export const OVERVIEW_PATH = "/overview";
export const SETTING_PATH = "/settings";
export const SETTING_PROFILE_PATH = "/settings/profile";
export const SETTING_SECURITY_PATH = "/settings/security";
export const SETTING_NOTIFICATION_PATH = "/settings/notification";
export const SETTING_ACCOUNT_PATH = "/settings/account";
export const CONTENT_PATH = "/contents";
export const VIDEO_PATH = "/videos";
export const ARTICLE_PATH = "/articles";
export const ADS_BANNER_PATH = "/ads/banners";
export const ADS_POPUP_PATH = "/ads/popups";
export const ADMIN_PATH = "/admins";
export const USER_PATH = "/users";
export const ROLES_PATH = "/roles";
export const PERMISSIONS_PATH = "/permissions";

export const NOT_FOUND_PATH = "/page-introuvable";
