import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";

/**
 * @interface IGetAllCategoriesUseCase
 */
interface IGetAllCategoriesUseCase
    extends IResultUseCase<
        {
            pageIndex: number;
            pageSize: number;
            isActive?: boolean;
            isFree?: boolean;
            search?: string;
        },
        IPaginatedResult<ICategoryEntity>
    > {}

/**
 * Use case for fetching all categories.
 *
 * @class GetAllCategoriesUseCase
 * @implements {IGetAllCategoriesUseCase}
 */
export class GetAllCategoriesUseCase implements IGetAllCategoriesUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    /**
     * @param {ICatalogRepositoryPort} catalogRepository - Repository for catalog operations (injected)
     */
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    /**
     * Executes the fetching all categories use case.
     */
    async execute(params: {
        pageIndex: number;
        pageSize: number;
        isActive?: boolean;
        isFree?: boolean;
        search?: string;
    }): Promise<Result<IPaginatedResult<ICategoryEntity>>> {
        return this.catalogRepository.getAllCategories(params);
    }
}
