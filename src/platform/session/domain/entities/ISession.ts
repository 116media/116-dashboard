import type { Browser } from "@/platform/session/domain/enums/browser.enum";
import type { Client } from "@/platform/session/domain/enums/client.enum";
import type { Device } from "@/platform/session/domain/enums/device.enum";
import type { Platform } from "@/platform/session/domain/enums/platform.enum";

/**
 * Session entity representing an authenticated login session.
 *
 * @interface ISession
 *
 * @property {string} id - Unique session identifier
 * @property {string | null} ipAddress - IP address where the login happened
 * @property {string | null} userAgent - Raw User-Agent string
 * @property {Browser} browser - Detected browser type
 * @property {Device} device - Detected device type
 * @property {Platform} platform - Detected OS / platform
 * @property {Client} client - Client application type
 * @property {string} expiresAt - ISO 8601 expiration date
 * @property {boolean} isActive - Whether the session is active
 * @property {boolean} isCurrent - Whether this is the requesting session
 * @property {string | null} createdAt - ISO 8601 creation date
 */
export interface ISession {
    id: string;
    ipAddress?: string | null;
    userAgent?: string | null;
    browser: Browser;
    device: Device;
    platform: Platform;
    client: Client;
    expiresAt: string;
    isActive: boolean;
    isCurrent: boolean;
    createdAt?: string | null;
}
