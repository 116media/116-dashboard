import { Browser } from "@/platform/session/domain/enums/browser.enum";
import { Client } from "@/platform/session/domain/enums/client.enum";
import { Device } from "@/platform/session/domain/enums/device.enum";
import { Platform } from "@/platform/session/domain/enums/platform.enum";
import {
    EnumBrowser,
    EnumClient,
    EnumDevice,
    EnumPlatform
} from "@/shared/infrastructure/api/generated/116.api";

/**
 * Exhaustive map from API enum to domain enum.
 * TypeScript will error here if the backend adds a new device type that isn't handled.
 */
const deviceMap: Record<EnumDevice, Device> = {
    [EnumDevice.Desktop]: Device.Desktop,
    [EnumDevice.Tablet]: Device.Tablet,
    [EnumDevice.Mobile]: Device.Mobile,
    [EnumDevice.Watch]: Device.Watch,
    [EnumDevice.Tv]: Device.Tv,
    [EnumDevice.Console]: Device.Console,
    [EnumDevice.Car]: Device.Car,
    [EnumDevice.IoT]: Device.IoT,
    [EnumDevice.Unknown]: Device.Unknown
};

/**
 * Exhaustive map from API enum to domain enum.
 * TypeScript will error here if the backend adds a new browser type that isn't handled.
 */
const browserMap: Record<EnumBrowser, Browser> = {
    [EnumBrowser.Chrome]: Browser.Chrome,
    [EnumBrowser.InternetExplorer]: Browser.InternetExplorer,
    [EnumBrowser.Safari]: Browser.Safari,
    [EnumBrowser.Firefox]: Browser.Firefox,
    [EnumBrowser.Edge]: Browser.Edge,
    [EnumBrowser.Opera]: Browser.Opera,
    [EnumBrowser.GoogleSearchApp]: Browser.GoogleSearchApp,
    [EnumBrowser.Samsung]: Browser.Samsung,
    [EnumBrowser.Unknown]: Browser.Unknown
};

/**
 * Exhaustive map from API enum to domain enum.
 * TypeScript will error here if the backend adds a new platform that isn't handled.
 */
const platformMap: Record<EnumPlatform, Platform> = {
    [EnumPlatform.Windows]: Platform.Windows,
    [EnumPlatform.Mac]: Platform.Mac,
    [EnumPlatform.Ios]: Platform.Ios,
    [EnumPlatform.IpadOs]: Platform.IpadOs,
    [EnumPlatform.Linux]: Platform.Linux,
    [EnumPlatform.Android]: Platform.Android,
    [EnumPlatform.ChromeOs]: Platform.ChromeOs,
    [EnumPlatform.Unknown]: Platform.Unknown
};

/**
 * Exhaustive map from API enum to domain enum.
 * TypeScript will error here if the backend adds a new client type that isn't handled.
 */
const clientMap: Record<EnumClient, Client> = {
    [EnumClient.MobileApp]: Client.MobileApp,
    [EnumClient.WebApp]: Client.WebApp,
    [EnumClient.Dashboard]: Client.Dashboard,
    [EnumClient.Unknown]: Client.Unknown
};

/**
 * Maps a generated API device type to the domain Device enum.
 *
 * @param {EnumDevice} device - API device type value
 * @returns {Device} Corresponding domain enum value
 */
export const mapDevice = (device: EnumDevice): Device => deviceMap[device];

/**
 * Maps a generated API browser type to the domain Browser enum.
 *
 * @param {EnumBrowser} browser - API browser type value
 * @returns {Browser} Corresponding domain enum value
 */
export const mapBrowser = (browser: EnumBrowser): Browser => browserMap[browser];

/**
 * Maps a generated API platform to the domain Platform enum.
 *
 * @param {EnumPlatform} platform - API platform value
 * @returns {Platform} Corresponding domain enum value
 */
export const mapPlatform = (platform: EnumPlatform): Platform => platformMap[platform];

/**
 * Maps a generated API client type to the domain Client enum.
 *
 * @param {EnumClient} client - API client type value
 * @returns {Client} Corresponding domain enum value
 */
export const mapClient = (client: EnumClient): Client => clientMap[client];
