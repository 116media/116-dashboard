import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IGetPackageByIdUseCase
 */
interface IGetPackageByIdUseCase extends IResultUseCase<string, IPackageEntity> {}

/**
 * Use case for fetching a package by ID.
 *
 * @class GetPackageByIdUseCase
 * @implements {IGetPackageByIdUseCase}
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
     * Executes the fetching a package by ID use case.
     */
    async execute(id: string): Promise<Result<IPackageEntity>> {
        return this.catalogRepository.getPackageById(id);
    }
}
