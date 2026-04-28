import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

interface IUpdateCustomerUseCase
    extends IResultUseCase<
        {
            id: string;
            data: { fullName: string; phone?: string; company?: string; notes?: string };
        },
        ICustomerEntity
    > {}

export class UpdateCustomerUseCase implements IUpdateCustomerUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    async execute(params: {
        id: string;
        data: { fullName: string; phone?: string; company?: string; notes?: string };
    }): Promise<Result<ICustomerEntity>> {
        return this.catalogRepository.updateCustomer(params.id, params.data);
    }
}
