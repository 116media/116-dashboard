/**
 * Domain enum for detected operating system / platform of a session.
 *
 * @description
 * Mirrors the backend EnumPlatform but lives in the domain layer.
 * Presentation code must import from here — never from the generated API.
 * The infrastructure mapper is the only place that references the API enum.
 */
export enum Platform {
    Windows = "Windows",
    Mac = "Mac",
    Ios = "Ios",
    IpadOs = "IpadOs",
    Linux = "Linux",
    Android = "Android",
    ChromeOs = "ChromeOs",
    Unknown = "Unknown"
}
