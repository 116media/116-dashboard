import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IActivatePackageUseCase
 * @extends {IResultUseCase<string, IPackageEntity>}
 */
interface IActivatePackageUseCase extends IResultUseCase<string, IPackageEntity> {}

/**
 * Use case for activating a package.
 *
 * @class ActivatePackageUseCase
 * @implements {IActivatePackageUseCase}
 *
 * @description
 * Activates a previously deactivated package, making it available
 * for selection via the catalog repository.
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
     * Executes the activate package use case.
     *
     * @param {string} id - The unique identifier of the package to activate
     * @returns {Promise<Result<IPackageEntity>>} `ok(IPackageEntity)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<IPackageEntity>> {
        return this.catalogRepository.activatePackage(id);
    }
}
