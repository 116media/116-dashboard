/**
 * Defines the client applications that can initiate a session.
 *
 * @enum {string}
 *
 * @description
 * Domain enum representing which client application created the session.
 * Extracted from the `Client-App` request header by the backend
 * metadata service.
 *
 * @property {string} MobileApp - Native mobile application (iOS or Android)
 * @property {string} WebApp - Public-facing web application
 * @property {string} Dashboard - Admin dashboard application
 * @property {string} Unknown - Unidentified client application
 */
export enum ESessionClient {
    MobileApp = "MobileApp",
    WebApp = "WebApp",
    Dashboard = "Dashboard",
    Unknown = "Unknown",
}
