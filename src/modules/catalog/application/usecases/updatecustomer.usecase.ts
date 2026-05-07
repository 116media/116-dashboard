import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import type { IUpdateCustomerCredentials } from "@/modules/catalog/presentation/model/IUpdateCustomerCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IUpdateCustomerUseCase
 * @extends {IResultUseCase<{ id: string; data: IUpdateCustomerCredentials }, ICustomerEntity>}
 */
interface IUpdateCustomerUseCase
    extends IResultUseCase<{ id: string; data: IUpdateCustomerCredentials }, ICustomerEntity> {}

/**
 * Use case for updating an existing customer.
 *
 * @class UpdateCustomerUseCase
 * @implements {IUpdateCustomerUseCase}
 *
 * @description
 * Updates an existing customer's name, phone, company, and notes
 * via the catalog repository.
 */
export class UpdateCustomerUseCase implements IUpdateCustomerUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    /**
     * @param {ICatalogRepositoryPort} catalogRepository - Repository for catalog operations (injected)
     */
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    /**
     * Executes the update customer use case.
     *
     * @param {object} request - The customer ID and updated data
     * @returns {Promise<Result<ICustomerEntity>>} `ok(ICustomerEntity)` on success, `err(Failure)` on failure
     */
    async execute(request: { id: string; data: IUpdateCustomerCredentials }): Promise<Result<ICustomerEntity>> {
        return this.catalogRepository.updateCustomer(request.id, request.data);
    }
}
