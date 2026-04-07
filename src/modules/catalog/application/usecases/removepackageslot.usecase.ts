import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

interface IRemovePackageSlotUseCase
    extends IResultUseCase<{ packageId: string; slotId: string }, { isSuccess: boolean }> {}

export class RemovePackageSlotUseCase implements IRemovePackageSlotUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    async execute(params: {
        packageId: string;
        slotId: string;
    }): Promise<Result<{ isSuccess: boolean }>> {
        return this.catalogRepository.removePackageSlot(params.packageId, params.slotId);
    }
}
