/**
 * Domain enum for detected browser type of a session.
 *
 * @description
 * Mirrors the backend EnumBrowser but lives in the domain layer.
 * Presentation code must import from here — never from the generated API.
 * The infrastructure mapper is the only place that references the API enum.
 */
export enum Browser {
    Chrome = "Chrome",
    InternetExplorer = "InternetExplorer",
    Safari = "Safari",
    Firefox = "Firefox",
    Edge = "Edge",
    Opera = "Opera",
    GoogleSearchApp = "GoogleSearchApp",
    Samsung = "Samsung",
    Unknown = "Unknown"
}
