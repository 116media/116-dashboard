import type { IDeviceStorageDataSource } from "@/platform/session/application/data-sources/device.storage.datasource.port";
import type { IDeviceRepositoryPort } from "@/platform/session/application/repositories/device.repository.port";

/**
 * Concrete implementation of the device repository.
 *
 * @class DeviceRepositoryImpl
 * @implements {IDeviceRepositoryPort}
 *
 * @description
 * Manages device ID generation and persistent storage.
 * On initialization, checks if a device ID already exists. If so,
 * returns it. Otherwise, generates a new UUID v4, stores it, and
 * returns it. This ensures a single stable identifier per browser.
 *
 * @remarks
 * Uses `crypto.randomUUID()` for UUID v4 generation (native browser API,
 * no external dependencies required).
 */
export class DeviceRepositoryImpl implements IDeviceRepositoryPort {
    private readonly deviceStorageDataSource: IDeviceStorageDataSource;

    /**
     * Creates an instance of DeviceRepositoryImpl.
     *
     * @param {IDeviceStorageDataSource} deviceStorageDataSource - Data source for device ID persistence (injected)
     */
    constructor({
        deviceStorageDataSource
    }: { deviceStorageDataSource: IDeviceStorageDataSource }) {
        this.deviceStorageDataSource = deviceStorageDataSource;
    }

    initializeDevice(): string {
        const existingDeviceId = this.deviceStorageDataSource.getDeviceId();
        if (existingDeviceId) {
            return existingDeviceId;
        }

        const newDeviceId = crypto.randomUUID();
        this.deviceStorageDataSource.setDeviceId(newDeviceId);
        return newDeviceId;
    }
}
