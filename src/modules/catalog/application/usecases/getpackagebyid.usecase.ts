import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IGetPackageByIdUseCase
 * @extends {IResultUseCase<string, IPackageEntity>}
 */
interface IGetPackageByIdUseCase extends IResultUseCase<string, IPackageEntity> {}

/**
 * Use case for fetching a package by ID.
 *
 * @class GetPackageByIdUseCase
 * @implements {IGetPackageByIdUseCase}
 *
 * @description
 * Retrieves a single package by its unique identifier
 * via the catalog repository.
 */
export class GetPackageByIdUseCase implements IGetPackageByIdUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    /**
     * @param {ICatalogRepositoryPort} catalogRepository - Repository for catalog operations (injected)
     */
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    /**
     * Executes the get package by ID use case.
     *
     * @param {string} id - The unique identifier of the package
     * @returns {Promise<Result<IPackageEntity>>} `ok(IPackageEntity)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<IPackageEntity>> {
        return this.catalogRepository.getPackageById(id);
    }
}
