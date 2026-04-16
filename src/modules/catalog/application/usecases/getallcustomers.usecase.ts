import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import type { ICustomersQueryParams } from "@/modules/catalog/presentation/model/ICustomersQueryParams";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";

/**
 * @interface IGetAllCustomersUseCase
 * @extends {IResultUseCase<ICustomersQueryParams, IPaginatedResult<ICustomerEntity>>}
 */
interface IGetAllCustomersUseCase
    extends IResultUseCase<ICustomersQueryParams, IPaginatedResult<ICustomerEntity>> {}

/**
 * Use case for fetching all customers.
 *
 * @class GetAllCustomersUseCase
 * @implements {IGetAllCustomersUseCase}
 *
 * @description
 * Retrieves a paginated list of customers with optional search filtering
 * via the catalog repository.
 */
export class GetAllCustomersUseCase implements IGetAllCustomersUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    /**
     * @param {ICatalogRepositoryPort} catalogRepository - Repository for catalog operations (injected)
     */
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    /**
     * Executes the get all customers use case.
     *
     * @param {ICustomersQueryParams} params - Pagination and search parameters
     * @returns {Promise<Result<IPaginatedResult<ICustomerEntity>>>} `ok(IPaginatedResult<ICustomerEntity>)` on success, `err(Failure)` on failure
     */
    async execute(
        params: ICustomersQueryParams
    ): Promise<Result<IPaginatedResult<ICustomerEntity>>> {
        return this.catalogRepository.getAllCustomers(params);
    }
}
