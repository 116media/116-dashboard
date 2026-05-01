import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface ICreatePackageUseCase
 * @extends {IResultUseCase<{ name: string; description: string; flatPriceUsd: number }, IPackageEntity>}
 */
interface ICreatePackageUseCase
    extends IResultUseCase<
        { name: string; description: string; flatPriceUsd: number },
        IPackageEntity
    > {}

/**
 * Use case for creating a new package.
 *
 * @class CreatePackageUseCase
 * @implements {ICreatePackageUseCase}
 *
 * @description
 * Creates a new package with a name, description, and flat USD price
 * via the catalog repository.
 */
export class CreatePackageUseCase implements ICreatePackageUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    /**
     * @param {ICatalogRepositoryPort} catalogRepository - Repository for catalog operations (injected)
     */
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    /**
     * Executes the create package use case.
     *
     * @param {object} data - Package creation data
     * @returns {Promise<Result<IPackageEntity>>} `ok(IPackageEntity)` on success, `err(Failure)` on failure
     */
    async execute(data: {
        name: string;
        description: string;
        flatPriceUsd: number;
    }): Promise<Result<IPackageEntity>> {
        return this.catalogRepository.createPackage(data);
    }
}
