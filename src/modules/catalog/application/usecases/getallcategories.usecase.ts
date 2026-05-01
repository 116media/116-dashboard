import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";

/**
 * @interface IGetAllCategoriesUseCase
 * @extends {IResultUseCase<{ pageIndex: number; pageSize: number; isActive?: boolean; isFree?: boolean; search?: string }, IPaginatedResult<ICategoryEntity>>}
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
 *
 * @description
 * Retrieves a paginated list of categories with optional filters
 * for active status, free tier, and search term via the catalog repository.
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
     * Executes the get all categories use case.
     *
     * @param {object} params - Pagination and filter parameters
     * @returns {Promise<Result<IPaginatedResult<ICategoryEntity>>>} `ok(IPaginatedResult<ICategoryEntity>)` on success, `err(Failure)` on failure
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
