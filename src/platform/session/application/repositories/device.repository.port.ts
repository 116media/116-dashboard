/**
 * Repository port (interface) for device operations.
 *
 * @interface IDeviceRepositoryPort
 *
 * @description
 * Defines the contract for managing the device identifier including
 * generation and persistent storage.
 *
 * Following the Ports & Adapters architecture pattern,
 * this port is implemented by infrastructure layer adapters.
 */
export interface IDeviceRepositoryPort {
    /**
     * Initializes device ID if not already set.
     *
     * Checks if a device ID exists. If not, generates a new UUID v4
     * and stores it. Returns the device ID (existing or newly created).
     *
     * @returns {string} The device ID string
     */
    initializeDevice(): string;
}
