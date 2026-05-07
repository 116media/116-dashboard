import type { AwilixContainer } from "awilix";
import { asClass } from "awilix";
import { CreateLyricsUseCase } from "@/modules/lyrics/application/usecases/createlyrics.usecase";
import { GetAllLyricsUseCase } from "@/modules/lyrics/application/usecases/getalllyrics.usecase";
import { UpdateLyricsUseCase } from "@/modules/lyrics/application/usecases/updatelyrics.usecase";
import { UpdateLyricsSeoUseCase } from "@/modules/lyrics/application/usecases/updatelyricsseo.usecase";
import { LyricsRepositoryImpl } from "@/modules/lyrics/infrastructure/repositories/lyrics.repository.impl";

/**
 * Registers lyrics module dependencies in the Awilix container.
 *
 * @description
 * Registers the repository as a singleton and all use cases as transient.
 * Called during application bootstrap in the service locator.
 *
 * @param container - The Awilix dependency injection container
 */
export function registerLyricsDependencies(container: AwilixContainer): void {
    container.register({
        // Repository
        lyricsRepository: asClass(LyricsRepositoryImpl).singleton(),

        // Queries
        getAllLyricsUseCase: asClass(GetAllLyricsUseCase).transient(),

        // Commands — CRUD
        createLyricsUseCase: asClass(CreateLyricsUseCase).transient(),
        updateLyricsUseCase: asClass(UpdateLyricsUseCase).transient(),

        // Commands — SEO
        updateLyricsSeoUseCase: asClass(UpdateLyricsSeoUseCase).transient()
    });
}
