import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IDeactivateCategoryUseCase
 */
interface IDeactivateCategoryUseCase extends IResultUseCase<string, ICategoryEntity> {}

/**
 * Use case for deactivating a category.
 *
 * @class DeactivateCategoryUseCase
 * @implements {IDeactivateCategoryUseCase}
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
     * Executes the deactivating a category use case.
     */
    async execute(id: string): Promise<Result<ICategoryEntity>> {
        return this.catalogRepository.deactivateCategory(id);
    }
}
