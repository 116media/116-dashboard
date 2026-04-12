import type {
    EnumBrowser,
    EnumClient,
    EnumDevice,
    EnumPlatform
} from "@/shared/infrastructure/api/generated/116.api";

/**
 * Session entity representing an authenticated login session.
 *
 * @interface ISession
 *
 * @property {string} id - Unique session identifier
 * @property {string | null} ipAddress - IP address where the login happened
 * @property {string | null} userAgent - Raw User-Agent string
 * @property {EnumBrowser} browser - Detected browser type
 * @property {EnumDevice} device - Detected device type
 * @property {EnumPlatform} platform - Detected OS / platform
 * @property {EnumClient} client - Client application type
 * @property {string} expiresAt - ISO 8601 expiration date
 * @property {boolean} isActive - Whether the session is active
 * @property {boolean} isCurrent - Whether this is the requesting session
 * @property {string | null} createdAt - ISO 8601 creation date
 */
export interface ISession {
    id: string;
    ipAddress?: string | null;
    userAgent?: string | null;
    browser: EnumBrowser;
    device: EnumDevice;
    platform: EnumPlatform;
    client: EnumClient;
    expiresAt: string;
    isActive: boolean;
    isCurrent: boolean;
    createdAt?: string | null;
}
