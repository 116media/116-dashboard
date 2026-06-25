import type { AwilixContainer } from "awilix";
import { asClass } from "awilix";
import { ActivateShortUseCase } from "@/modules/shorts/application/usecases/activateshort.usecase";
import { CreateShortUseCase } from "@/modules/shorts/application/usecases/createshort.usecase";
import { DeactivateShortUseCase } from "@/modules/shorts/application/usecases/deactivateshort.usecase";
import { DeleteShortUseCase } from "@/modules/shorts/application/usecases/deleteshort.usecase";
import { GetAllShortsUseCase } from "@/modules/shorts/application/usecases/getallshorts.usecase";
import { GetShortByIdUseCase } from "@/modules/shorts/application/usecases/getshortbyid.usecase";
import { UpdateShortUseCase } from "@/modules/shorts/application/usecases/updateshort.usecase";
import { UploadShortThumbnailUseCase } from "@/modules/shorts/application/usecases/uploadshortthumbnail.usecase";
import { UploadShortVideoUseCase } from "@/modules/shorts/application/usecases/uploadshortvideo.usecase";
import { ShortsRepositoryImpl } from "@/modules/shorts/infrastructure/repositories/shorts.repository.impl";

/**
 * Registers shorts module dependencies in the Awilix container.
 *
 * @description
 * Registers the repository as a singleton and all use cases as transient.
 * Called during application bootstrap in the service locator.
 *
 * @param container - The Awilix dependency injection container
 */
export function registerShortsDependencies(container: AwilixContainer): void {
    container.register({
        // Repository
        shortsRepository: asClass(ShortsRepositoryImpl).singleton(),

        // Queries
        getAllShortsUseCase: asClass(GetAllShortsUseCase).transient(),
        getShortByIdUseCase: asClass(GetShortByIdUseCase).transient(),

        // Commands — CRUD
        createShortUseCase: asClass(CreateShortUseCase).transient(),
        updateShortUseCase: asClass(UpdateShortUseCase).transient(),
        deleteShortUseCase: asClass(DeleteShortUseCase).transient(),

        // Commands — Status
        activateShortUseCase: asClass(ActivateShortUseCase).transient(),
        deactivateShortUseCase: asClass(DeactivateShortUseCase).transient(),

        // Commands — Media
        uploadShortThumbnailUseCase: asClass(UploadShortThumbnailUseCase).transient(),
        uploadShortVideoUseCase: asClass(UploadShortVideoUseCase).transient()
    });
}
