import type { IDeviceStorageDataSource } from "@/platform/session/application/data-sources/device.storage.datasource.port";
import { DEVICE_ID_STORAGE_KEY } from "@/platform/session/infrastructure/constants/storage.constants";
import { LocalStorageService } from "@/shared/infrastructure/storage/localstorage.service";

/**
 * localStorage-backed implementation of device ID storage.
 *
 * @class DeviceStorageDataSource
 * @implements {IDeviceStorageDataSource}
 *
 * @description
 * Stores and retrieves the device identifier using browser localStorage.
 * localStorage is acceptable for this use case since the device ID is
 * a tracking identifier, not a secret credential.
 *
 * @remarks
 * Storage key: `116-device-id` (from DEVICE_ID_STORAGE_KEY constant)
 */
export class DeviceStorageDataSource implements IDeviceStorageDataSource {
    setDeviceId(deviceId: string): void {
        LocalStorageService.setItem(DEVICE_ID_STORAGE_KEY, deviceId);
    }

    getDeviceId(): string | null {
        return LocalStorageService.getItem<string>(DEVICE_ID_STORAGE_KEY);
    }
}
