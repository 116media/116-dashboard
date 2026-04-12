import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IActivateCategoryUseCase
 * @extends {IResultUseCase<string, ICategoryEntity>}
 */
interface IActivateCategoryUseCase extends IResultUseCase<string, ICategoryEntity> {}

/**
 * Use case for activating a category.
 *
 * @class ActivateCategoryUseCase
 * @implements {IActivateCategoryUseCase}
 *
 * @description
 * Activates a previously deactivated category, making it visible
 * and available via the catalog repository.
 */
export class ActivateCategoryUseCase implements IActivateCategoryUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    /**
     * @param {ICatalogRepositoryPort} catalogRepository - Repository for catalog operations (injected)
     */
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    /**
     * Executes the activate category use case.
     *
     * @param {string} id - The unique identifier of the category to activate
     * @returns {Promise<Result<ICategoryEntity>>} `ok(ICategoryEntity)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<ICategoryEntity>> {
        return this.catalogRepository.activateCategory(id);
    }
}
