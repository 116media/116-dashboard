import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

interface IGetCustomerByIdUseCase extends IResultUseCase<string, ICustomerEntity> {}

export class GetCustomerByIdUseCase implements IGetCustomerByIdUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    async execute(id: string): Promise<Result<ICustomerEntity>> {
        return this.catalogRepository.getCustomerById(id);
    }
}
