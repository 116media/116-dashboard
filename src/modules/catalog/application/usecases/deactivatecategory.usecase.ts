import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

interface IDeactivateCategoryUseCase extends IResultUseCase<string, ICategoryEntity> {}

export class DeactivateCategoryUseCase implements IDeactivateCategoryUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    async execute(id: string): Promise<Result<ICategoryEntity>> {
        return this.catalogRepository.deactivateCategory(id);
    }
}
