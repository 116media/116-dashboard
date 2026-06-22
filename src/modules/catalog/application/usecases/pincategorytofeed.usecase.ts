import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IPinCategoryToFeedUseCase
 * @extends {IResultUseCase<string, ICategoryEntity>}
 */
interface IPinCategoryToFeedUseCase extends IResultUseCase<string, ICategoryEntity> {}

/**
 * Use case for pinning a category to the homepage feed.
 *
 * @class PinCategoryToFeedUseCase
 * @implements {IPinCategoryToFeedUseCase}
 *
 * @description
 * Pins a video category to the homepage feed. The backend enforces the per-content-type
 * cap and automatically unpins the oldest pinned category (FIFO) when the cap would be
 * exceeded, so callers should refresh the list afterwards.
 */
export class PinCategoryToFeedUseCase implements IPinCategoryToFeedUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    /**
     * @param {ICatalogRepositoryPort} catalogRepository - Repository for catalog operations (injected)
     */
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    /**
     * Executes the pin category to feed use case.
     *
     * @param {string} id - The unique identifier of the category to pin
     * @returns {Promise<Result<ICategoryEntity>>} `ok(ICategoryEntity)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<ICategoryEntity>> {
        return this.catalogRepository.pinCategoryToFeed(id);
    }
}
