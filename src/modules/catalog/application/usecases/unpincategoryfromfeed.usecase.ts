import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IUnpinCategoryFromFeedUseCase
 * @extends {IResultUseCase<string, ICategoryEntity>}
 */
interface IUnpinCategoryFromFeedUseCase extends IResultUseCase<string, ICategoryEntity> {}

/**
 * Use case for unpinning a category from the homepage feed.
 *
 * @class UnpinCategoryFromFeedUseCase
 * @implements {IUnpinCategoryFromFeedUseCase}
 *
 * @description
 * Removes a category from the homepage feed. The operation is idempotent — unpinning a
 * category that is not currently pinned succeeds as a no-op.
 */
export class UnpinCategoryFromFeedUseCase implements IUnpinCategoryFromFeedUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    /**
     * @param {ICatalogRepositoryPort} catalogRepository - Repository for catalog operations (injected)
     */
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    /**
     * Executes the unpin category from feed use case.
     *
     * @param {string} id - The unique identifier of the category to unpin
     * @returns {Promise<Result<ICategoryEntity>>} `ok(ICategoryEntity)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<ICategoryEntity>> {
        return this.catalogRepository.unpinCategoryFromFeed(id);
    }
}
