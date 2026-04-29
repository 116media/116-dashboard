import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IActivatePackageUseCase
 */
interface IActivatePackageUseCase extends IResultUseCase<string, IPackageEntity> {}

/**
 * Use case for activating a package.
 *
 * @class ActivatePackageUseCase
 * @implements {IActivatePackageUseCase}
 */
export class ActivatePackageUseCase implements IActivatePackageUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    /**
     * @param {ICatalogRepositoryPort} catalogRepository - Repository for catalog operations (injected)
     */
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    /**
     * Executes the activating a package use case.
     */
    async execute(id: string): Promise<Result<IPackageEntity>> {
        return this.catalogRepository.activatePackage(id);
    }
}
