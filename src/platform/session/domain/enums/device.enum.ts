/**
 * Domain enum for detected device type of a session.
 *
 * @description
 * Mirrors the backend EnumDevice but lives in the domain layer.
 * Presentation code must import from here — never from the generated API.
 * The infrastructure mapper is the only place that references the API enum.
 */
export enum Device {
    Desktop = "Desktop",
    Tablet = "Tablet",
    Mobile = "Mobile",
    Watch = "Watch",
    Tv = "Tv",
    Console = "Console",
    Car = "Car",
    IoT = "IoT",
    Unknown = "Unknown"
}
