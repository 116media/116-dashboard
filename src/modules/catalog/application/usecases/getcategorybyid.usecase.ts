import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IGetCategoryByIdUseCase
 * @extends {IResultUseCase<string, ICategoryEntity>}
 */
interface IGetCategoryByIdUseCase extends IResultUseCase<string, ICategoryEntity> {}

/**
 * Use case for fetching a category by ID.
 *
 * @class GetCategoryByIdUseCase
 * @implements {IGetCategoryByIdUseCase}
 *
 * @description
 * Retrieves a single category by its unique identifier
 * via the catalog repository.
 */
export class GetCategoryByIdUseCase implements IGetCategoryByIdUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    /**
     * @param {ICatalogRepositoryPort} catalogRepository - Repository for catalog operations (injected)
     */
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    /**
     * Executes the get category by ID use case.
     *
     * @param {string} id - The unique identifier of the category
     * @returns {Promise<Result<ICategoryEntity>>} `ok(ICategoryEntity)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<ICategoryEntity>> {
        return this.catalogRepository.getCategoryById(id);
    }
}
