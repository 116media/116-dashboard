/**
 * Defines the operating systems detected from the User-Agent header.
 *
 * @enum {string}
 *
 * @description
 * Domain enum representing the OS or platform used to create a session.
 * Parsed from the User-Agent string by the backend detection service.
 *
 * @property {string} Windows - Microsoft Windows
 * @property {string} Mac - Apple macOS
 * @property {string} Ios - Apple iOS (iPhone)
 * @property {string} IpadOs - Apple iPadOS (iPad)
 * @property {string} Linux - Linux-based OS
 * @property {string} Android - Google Android
 * @property {string} ChromeOs - Google Chrome OS
 * @property {string} Unknown - Unidentified platform
 */
export enum ESessionPlatform {
    Windows = "Windows",
    Mac = "Mac",
    Ios = "Ios",
    IpadOs = "IpadOs",
    Linux = "Linux",
    Android = "Android",
    ChromeOs = "ChromeOs",
    Unknown = "Unknown"
}
