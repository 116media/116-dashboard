import type { AwilixContainer } from "awilix";
import { asClass } from "awilix";
import { GetSessionsUseCase } from "@/platform/session/application/usecases/getsessions.usecase";
import { InitializeDeviceUseCase } from "@/platform/session/application/usecases/initialize.device.usecase";
import { RefreshTokenUseCase } from "@/platform/session/application/usecases/refresh-token.usecase";
import { RevokeSessionUseCase } from "@/platform/session/application/usecases/revokesession.usecase";
import { DeviceStorageDataSource } from "@/platform/session/infrastructure/data-sources/device.storage.datasource";
import { DeviceRepositoryImpl } from "@/platform/session/infrastructure/repositories/device.repository.impl";
import { SessionRepositoryImpl } from "@/platform/session/infrastructure/repositories/session.repository.impl";

export function registerSessionDependencies(container: AwilixContainer): void {
    container.register({
        deviceStorageDataSource: asClass(DeviceStorageDataSource).singleton(),

        sessionRepository: asClass(SessionRepositoryImpl).singleton(),
        deviceRepository: asClass(DeviceRepositoryImpl).singleton(),

        refreshTokenUseCase: asClass(RefreshTokenUseCase).transient(),
        getSessionsUseCase: asClass(GetSessionsUseCase).transient(),
        revokeSessionUseCase: asClass(RevokeSessionUseCase).transient(),
        initializeDeviceUseCase: asClass(InitializeDeviceUseCase).transient()
    });
}
