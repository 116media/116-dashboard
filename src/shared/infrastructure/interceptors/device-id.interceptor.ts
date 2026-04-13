import type { InternalAxiosRequestConfig } from "axios";
import { X_DEVICE_ID_HEADER } from "@/platform/session/infrastructure/constants/storage.constants";
import container from "@/shared/infrastructure/service.locator.ts";

/**
 * Axios request interceptor that attaches the X-Device-Id header.
 *
 * @description
 * Reads the device identifier from localStorage and adds it to every
 * outgoing API request. The device ID is a UUID v4 generated once per
 * browser and persisted across sessions.
 *
 * This interceptor is read-only — device ID generation is handled by
 * {@link InitializeDeviceUseCase} at app startup.
 *
 * @param {InternalAxiosRequestConfig} config - Axios request configuration
 * @returns {InternalAxiosRequestConfig} The config with X-Device-Id header attached
 */
export const deviceIdInterceptor = (
    config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
    const deviceId = container.cradle.deviceStorageDataSource.getDeviceId();
    if (deviceId) {
        config.headers[X_DEVICE_ID_HEADER] = deviceId;
    }
    return config;
};
