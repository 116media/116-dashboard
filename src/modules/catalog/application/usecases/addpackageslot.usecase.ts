import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { IPackageSlotEntity } from "@/modules/catalog/domain/entities/IPackageSlotEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IAddPackageSlotUseCase
 * @extends {IResultUseCase<{ packageId: string; data: { categoryId: string; isRequired: boolean; quantity: number } }, IPackageSlotEntity>}
 */
interface IAddPackageSlotUseCase
    extends IResultUseCase<
        { packageId: string; data: { categoryId: string; isRequired: boolean; quantity: number } },
        IPackageSlotEntity
    > {}

/**
 * Use case for adding a slot to a package.
 *
 * @class AddPackageSlotUseCase
 * @implements {IAddPackageSlotUseCase}
 *
 * @description
 * Adds a new slot to a package, linking a category with required/optional
 * status and quantity via the catalog repository.
 */
export class AddPackageSlotUseCase implements IAddPackageSlotUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    /**
     * @param {ICatalogRepositoryPort} catalogRepository - Repository for catalog operations (injected)
     */
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    /**
     * Executes the add package slot use case.
     *
     * @param {object} params - The package ID and slot data
     * @returns {Promise<Result<IPackageSlotEntity>>} `ok(IPackageSlotEntity)` on success, `err(Failure)` on failure
     */
    async execute(params: {
        packageId: string;
        data: { categoryId: string; isRequired: boolean; quantity: number };
    }): Promise<Result<IPackageSlotEntity>> {
        return this.catalogRepository.addPackageSlot(params.packageId, params.data);
    }
}
