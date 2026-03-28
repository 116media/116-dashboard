import type { IUseCase } from "@/core/application/IUseCase";
import type { IDeviceRepositoryPort } from "@/core/session/application/repositories/device.repository.port";

/**
 * Interface for the initialize device use case.
 *
 * @interface IInitializeDeviceUseCase
 * @extends {IUseCase<void, string>}
 */
interface IInitializeDeviceUseCase extends IUseCase<void, string> {}

/**
 * Use case for initializing the device identifier on app startup.
 *
 * @class InitializeDeviceUseCase
 * @implements {IInitializeDeviceUseCase}
 *
 * @description
 * Orchestrates the device initialization flow:
 * 1. Check if device ID exists in localStorage
 * 2. If exists, return it (device already initialized)
 * 3. If not exists, generate new UUID v4
 * 4. Store UUID in localStorage
 * 5. Return device ID
 *
 * @remarks
 * Called once at app startup before the first API request is made.
 * Part of the application layer in Clean Architecture.
 */
export class InitializeDeviceUseCase implements IInitializeDeviceUseCase {
    /**
     * Creates an instance of InitializeDeviceUseCase.
     *
     * @param {IDeviceRepositoryPort} deviceRepository - Repository for device operations (injected)
     */
    constructor(private readonly deviceRepository: IDeviceRepositoryPort) {}

    /**
     * Executes the device initialization.
     *
     * @returns {Promise<string>} The device ID (existing or newly generated)
     */
    async execute(): Promise<string> {
        return this.deviceRepository.initializeDevice();
    }
}
