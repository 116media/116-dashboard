/**
 * Defines the device types detected from the User-Agent header.
 *
 * @enum {string}
 *
 * @description
 * Domain enum representing the device category used to create a session.
 * Parsed from the User-Agent string by the backend detection service.
 *
 * @property {string} Desktop - Desktop computer (Windows, Mac, Linux)
 * @property {string} Tablet - Tablet device (iPad, Android tablets)
 * @property {string} Mobile - Mobile phone (iPhone, Android phones)
 * @property {string} Watch - Smart-Watch device
 * @property {string} Tv - Television device (Samsung TV, LG TV)
 * @property {string} Console - Gaming console (Xbox, PlayStation)
 * @property {string} Car - Automotive device (car systems)
 * @property {string} IoT - Internet of Things device (Raspberry Pi, smart devices)
 * @property {string} Unknown - Unidentified device
 */
export enum ESessionDevice {
    Desktop = "Desktop",
    Tablet = "Tablet",
    Mobile = "Mobile",
    Watch = "Watch",
    Tv = "Tv",
    Console = "Console",
    Car = "Car",
    IoT = "IoT",
    Unknown = "Unknown",
}
