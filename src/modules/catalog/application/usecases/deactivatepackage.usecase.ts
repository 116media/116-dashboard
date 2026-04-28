import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

interface IDeactivatePackageUseCase extends IResultUseCase<string, IPackageEntity> {}

export class DeactivatePackageUseCase implements IDeactivatePackageUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    async execute(id: string): Promise<Result<IPackageEntity>> {
        return this.catalogRepository.deactivatePackage(id);
    }
}
