import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { IPackageSlotEntity } from "@/modules/catalog/domain/entities/IPackageSlotEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

interface IAddPackageSlotUseCase
    extends IResultUseCase<
        { packageId: string; data: { categoryId: string; isRequired: boolean; quantity: number } },
        IPackageSlotEntity
    > {}

export class AddPackageSlotUseCase implements IAddPackageSlotUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    async execute(params: {
        packageId: string;
        data: { categoryId: string; isRequired: boolean; quantity: number };
    }): Promise<Result<IPackageSlotEntity>> {
        return this.catalogRepository.addPackageSlot(params.packageId, params.data);
    }
}
