import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IDeactivatePackageUseCase
 * @extends {IResultUseCase<string, IPackageEntity>}
 */
interface IDeactivatePackageUseCase extends IResultUseCase<string, IPackageEntity> {}

/**
 * Use case for deactivating a package.
 *
 * @class DeactivatePackageUseCase
 * @implements {IDeactivatePackageUseCase}
 *
 * @description
 * Deactivates an active package, removing it from availability
 * via the catalog repository.
 */
export class DeactivatePackageUseCase implements IDeactivatePackageUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    /**
     * @param {ICatalogRepositoryPort} catalogRepository - Repository for catalog operations (injected)
     */
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    /**
     * Executes the deactivate package use case.
     *
     * @param {string} id - The unique identifier of the package to deactivate
     * @returns {Promise<Result<IPackageEntity>>} `ok(IPackageEntity)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<IPackageEntity>> {
        return this.catalogRepository.deactivatePackage(id);
    }
}
