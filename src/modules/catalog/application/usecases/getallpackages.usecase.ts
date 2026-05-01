import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";

/**
 * @interface IGetAllPackagesUseCase
 * @extends {IResultUseCase<{ pageIndex: number; pageSize: number; isActive?: boolean; search?: string }, IPaginatedResult<IPackageEntity>>}
 */
interface IGetAllPackagesUseCase
    extends IResultUseCase<
        { pageIndex: number; pageSize: number; isActive?: boolean; search?: string },
        IPaginatedResult<IPackageEntity>
    > {}

/**
 * Use case for fetching all packages.
 *
 * @class GetAllPackagesUseCase
 * @implements {IGetAllPackagesUseCase}
 *
 * @description
 * Retrieves a paginated list of packages with optional filters
 * for active status and search term via the catalog repository.
 */
export class GetAllPackagesUseCase implements IGetAllPackagesUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    /**
     * @param {ICatalogRepositoryPort} catalogRepository - Repository for catalog operations (injected)
     */
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    /**
     * Executes the get all packages use case.
     *
     * @param {object} params - Pagination and filter parameters
     * @returns {Promise<Result<IPaginatedResult<IPackageEntity>>>} `ok(IPaginatedResult<IPackageEntity>)` on success, `err(Failure)` on failure
     */
    async execute(params: {
        pageIndex: number;
        pageSize: number;
        isActive?: boolean;
        search?: string;
    }): Promise<Result<IPaginatedResult<IPackageEntity>>> {
        return this.catalogRepository.getAllPackages(params);
    }
}
