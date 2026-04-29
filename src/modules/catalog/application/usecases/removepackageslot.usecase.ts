import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IRemovePackageSlotUseCase
 */
interface IRemovePackageSlotUseCase
    extends IResultUseCase<{ packageId: string; slotId: string }, { isSuccess: boolean }> {}

/**
 * Use case for removing a slot from a package.
 *
 * @class RemovePackageSlotUseCase
 * @implements {IRemovePackageSlotUseCase}
 */
export class RemovePackageSlotUseCase implements IRemovePackageSlotUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    /**
     * @param {ICatalogRepositoryPort} catalogRepository - Repository for catalog operations (injected)
     */
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    /**
     * Executes the removing a slot from a package use case.
     */
    async execute(params: {
        packageId: string;
        slotId: string;
    }): Promise<Result<{ isSuccess: boolean }>> {
        return this.catalogRepository.removePackageSlot(params.packageId, params.slotId);
    }
}
