import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface ICreateCustomerUseCase
 */
interface ICreateCustomerUseCase
    extends IResultUseCase<
        { fullName: string; email: string; phone?: string; company?: string; notes?: string },
        ICustomerEntity
    > {}

/**
 * Use case for creating a new customer.
 *
 * @class CreateCustomerUseCase
 * @implements {ICreateCustomerUseCase}
 */
export class CreateCustomerUseCase implements ICreateCustomerUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    /**
     * @param {ICatalogRepositoryPort} catalogRepository - Repository for catalog operations (injected)
     */
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    /**
     * Executes the creating a new customer use case.
     */
    async execute(data: {
        fullName: string;
        email: string;
        phone?: string;
        company?: string;
        notes?: string;
    }): Promise<Result<ICustomerEntity>> {
        return this.catalogRepository.createCustomer(data);
    }
}
