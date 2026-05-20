/**
 * Domain enum for the client application type of a session.
 *
 * @description
 * Mirrors the backend EnumClient but lives in the domain layer.
 * Presentation code must import from here — never from the generated API.
 * The infrastructure mapper is the only place that references the API enum.
 */
export enum Client {
    MobileApp = "MobileApp",
    WebApp = "WebApp",
    Dashboard = "Dashboard",
    Unknown = "Unknown"
}
