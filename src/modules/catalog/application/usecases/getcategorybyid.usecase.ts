import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IGetCategoryByIdUseCase
 */
interface IGetCategoryByIdUseCase extends IResultUseCase<string, ICategoryEntity> {}

/**
 * Use case for fetching a category by ID.
 *
 * @class GetCategoryByIdUseCase
 * @implements {IGetCategoryByIdUseCase}
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
     * Executes the fetching a category by ID use case.
     */
    async execute(id: string): Promise<Result<ICategoryEntity>> {
        return this.catalogRepository.getCategoryById(id);
    }
}
