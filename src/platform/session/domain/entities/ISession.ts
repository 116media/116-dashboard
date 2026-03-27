export type SessionBrowser =
    | "Chrome"
    | "InternetExplorer"
    | "Safari"
    | "Firefox"
    | "Edge"
    | "Opera"
    | "GoogleSearchApp"
    | "Samsung"
    | "Unknown";

export type SessionDevice =
    | "Desktop"
    | "Tablet"
    | "Mobile"
    | "Watch"
    | "Tv"
    | "Console"
    | "Car"
    | "IoT"
    | "Unknown";

export type SessionPlatform =
    | "Windows"
    | "Mac"
    | "Ios"
    | "IpadOs"
    | "Linux"
    | "Android"
    | "ChromeOs"
    | "Unknown";

export type SessionClient = "MobileApp" | "WebApp" | "Dashboard" | "Unknown";

export interface ISession {
    id: string;
    ipAddress: string | null;
    userAgent: string | null;
    browser: SessionBrowser;
    device: SessionDevice;
    platform: SessionPlatform;
    client: SessionClient;
    expiresAt: string;
    isActive: boolean;
    createdAt: string | null;
}
