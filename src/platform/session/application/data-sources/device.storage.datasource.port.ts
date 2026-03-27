/**
 * Port (interface) for device ID storage.
 *
 * @interface IDeviceStorageDataSource
 *
 * @description
 * Defines the contract for storing and retrieving the unique device
 * identifier used to track sessions across devices.
 *
 * @remarks
 * - The device ID is sent in the `X-Device-Id` header with all API requests
 * - Generated as UUID v4 on first initialization
 * - Persists across sessions and login/logout cycles
 */
export interface IDeviceStorageDataSource {
    /**
     * Stores the device ID.
     *
     * @param {string} deviceId - UUID v4 string identifying this device
     */
    setDeviceId(deviceId: string): void;

    /**
     * Retrieves the stored device ID.
     *
     * @returns {string | null} The device ID string, or null if not set
     */
    getDeviceId(): string | null;
}
