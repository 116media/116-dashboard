import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

interface IActivatePackageUseCase extends IResultUseCase<string, IPackageEntity> {}

export class ActivatePackageUseCase implements IActivatePackageUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    async execute(id: string): Promise<Result<IPackageEntity>> {
        return this.catalogRepository.activatePackage(id);
    }
}
