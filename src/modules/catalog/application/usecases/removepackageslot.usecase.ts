import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICatalogActionResponse } from "@/modules/catalog/domain/entities/ICatalogActionResponse";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IRemovePackageSlotUseCase
 * @extends {IResultUseCase<{ packageId: string; slotId: string }, ICatalogActionResponse>}
 */
interface IRemovePackageSlotUseCase
    extends IResultUseCase<{ packageId: string; slotId: string }, ICatalogActionResponse> {}

/**
 * Use case for removing a slot from a package.
 *
 * @class RemovePackageSlotUseCase
 * @implements {IRemovePackageSlotUseCase}
 *
 * @description
 * Removes an existing slot from a package
 * via the catalog repository.
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
     * Executes the remove package slot use case.
     *
     * @param {object} request - The package ID and slot ID to remove
     * @returns {Promise<Result<ICatalogActionResponse>>} `ok(ICatalogActionResponse)` on success, `err(Failure)` on failure
     */
    async execute(request: {
        packageId: string;
        slotId: string;
    }): Promise<Result<ICatalogActionResponse>> {
        return this.catalogRepository.removePackageSlot(request.packageId, request.slotId);
    }
}
