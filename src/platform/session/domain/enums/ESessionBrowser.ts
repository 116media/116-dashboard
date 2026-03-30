/**
 * Defines the browser types detected from the User-Agent header.
 *
 * @enum {string}
 *
 * @description
 * Domain enum representing the browser used to create a session.
 * Parsed from the User-Agent string by the backend detection service.
 *
 * @property {string} Chrome - Google Chrome browser
 * @property {string} InternetExplorer - Microsoft Internet Explorer
 * @property {string} Safari - Apple Safari browser
 * @property {string} Firefox - Mozilla Firefox browser
 * @property {string} Edge - Microsoft Edge browser
 * @property {string} Opera - Opera browser
 * @property {string} GoogleSearchApp - Google Search application
 * @property {string} Samsung - Samsung Internet browser
 * @property {string} Unknown - Unidentified browser
 */
export enum ESessionBrowser {
    Chrome = "Chrome",
    InternetExplorer = "InternetExplorer",
    Safari = "Safari",
    Firefox = "Firefox",
    Edge = "Edge",
    Opera = "Opera",
    GoogleSearchApp = "GoogleSearchApp",
    Samsung = "Samsung",
    Unknown = "Unknown",
}
