import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IUpdateCustomerUseCase
 */
interface IUpdateCustomerUseCase
    extends IResultUseCase<
        {
            id: string;
            data: { fullName: string; phone?: string; company?: string; notes?: string };
        },
        ICustomerEntity
    > {}

/**
 * Use case for updating an existing customer.
 *
 * @class UpdateCustomerUseCase
 * @implements {IUpdateCustomerUseCase}
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
     * Executes the updating an existing customer use case.
     */
    async execute(params: {
        id: string;
        data: { fullName: string; phone?: string; company?: string; notes?: string };
    }): Promise<Result<ICustomerEntity>> {
        return this.catalogRepository.updateCustomer(params.id, params.data);
    }
}
