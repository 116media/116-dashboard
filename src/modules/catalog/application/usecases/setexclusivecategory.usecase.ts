import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface ISetExclusiveCategoryUseCase
 * @extends {IResultUseCase<string, ICategoryEntity>}
 */
interface ISetExclusiveCategoryUseCase extends IResultUseCase<string, ICategoryEntity> {}

/**
 * Use case for marking a category as the exclusive show.
 *
 * @class SetExclusiveCategoryUseCase
 * @implements {ISetExclusiveCategoryUseCase}
 *
 * @description
 * Sets a video category as the homepage exclusive show. The backend enforces the
 * mutex (at most one exclusive) and automatically unsets the previously exclusive
 * category, so callers should refresh the list afterwards.
 */
export class SetExclusiveCategoryUseCase implements ISetExclusiveCategoryUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    /**
     * @param {ICatalogRepositoryPort} catalogRepository - Repository for catalog operations (injected)
     */
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    /**
     * Executes the set exclusive category use case.
     *
     * @param {string} id - The unique identifier of the category to make exclusive
     * @returns {Promise<Result<ICategoryEntity>>} `ok(ICategoryEntity)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<ICategoryEntity>> {
        return this.catalogRepository.setExclusiveCategory(id);
    }
}
