import { type ESessionBrowser } from "@/platform/session/domain/enums/ESessionBrowser";
import { type ESessionClient } from "@/platform/session/domain/enums/ESessionClient";
import { type ESessionDevice } from "@/platform/session/domain/enums/ESessionDevice";
import { type ESessionPlatform } from "@/platform/session/domain/enums/ESessionPlatform";

/**
 * Session entity representing an authenticated login session.
 *
 * @interface ISession
 *
 * @property {string} id - Unique session identifier
 * @property {string | null} ipAddress - IP address where the login happened
 * @property {string | null} userAgent - Raw User-Agent string
 * @property {ESessionBrowser} browser - Detected browser type
 * @property {ESessionDevice} device - Detected device type
 * @property {ESessionPlatform} platform - Detected OS / platform
 * @property {ESessionClient} client - Client application type
 * @property {string} expiresAt - ISO 8601 expiration date
 * @property {boolean} isActive - Whether the session is active
 * @property {boolean} isCurrent - Whether this is the requesting session
 * @property {string | null} createdAt - ISO 8601 creation date
 */
export interface ISession {
    id: string;
    ipAddress: string | null;
    userAgent: string | null;
    browser: ESessionBrowser;
    device: ESessionDevice;
    platform: ESessionPlatform;
    client: ESessionClient;
    expiresAt: string;
    isActive: boolean;
    isCurrent: boolean;
    createdAt: string | null;
}
