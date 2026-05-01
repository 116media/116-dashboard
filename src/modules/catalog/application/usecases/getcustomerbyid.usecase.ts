import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IGetCustomerByIdUseCase
 * @extends {IResultUseCase<string, ICustomerEntity>}
 */
interface IGetCustomerByIdUseCase extends IResultUseCase<string, ICustomerEntity> {}

/**
 * Use case for fetching a customer by ID.
 *
 * @class GetCustomerByIdUseCase
 * @implements {IGetCustomerByIdUseCase}
 *
 * @description
 * Retrieves a single customer by their unique identifier
 * via the catalog repository.
 */
export class GetCustomerByIdUseCase implements IGetCustomerByIdUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    /**
     * @param {ICatalogRepositoryPort} catalogRepository - Repository for catalog operations (injected)
     */
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    /**
     * Executes the get customer by ID use case.
     *
     * @param {string} id - The unique identifier of the customer
     * @returns {Promise<Result<ICustomerEntity>>} `ok(ICustomerEntity)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<ICustomerEntity>> {
        return this.catalogRepository.getCustomerById(id);
    }
}
