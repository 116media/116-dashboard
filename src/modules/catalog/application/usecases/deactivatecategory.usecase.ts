import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IDeactivateCategoryUseCase
 * @extends {IResultUseCase<string, ICategoryEntity>}
 */
interface IDeactivateCategoryUseCase extends IResultUseCase<string, ICategoryEntity> {}

/**
 * Use case for deactivating a category.
 *
 * @class DeactivateCategoryUseCase
 * @implements {IDeactivateCategoryUseCase}
 *
 * @description
 * Deactivates an active category, hiding it from public visibility
 * via the catalog repository.
 */
export class DeactivateCategoryUseCase implements IDeactivateCategoryUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    /**
     * @param {ICatalogRepositoryPort} catalogRepository - Repository for catalog operations (injected)
     */
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    /**
     * Executes the deactivate category use case.
     *
     * @param {string} id - The unique identifier of the category to deactivate
     * @returns {Promise<Result<ICategoryEntity>>} `ok(ICategoryEntity)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<ICategoryEntity>> {
        return this.catalogRepository.deactivateCategory(id);
    }
}
