import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IUpdateCategoryUseCase
 */
interface IUpdateCategoryUseCase
    extends IResultUseCase<
        { id: string; data: { name: string; slug: string; description: string } },
        ICategoryEntity
    > {}

/**
 * Use case for updating an existing category.
 *
 * @class UpdateCategoryUseCase
 * @implements {IUpdateCategoryUseCase}
 */
export class UpdateCategoryUseCase implements IUpdateCategoryUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    /**
     * @param {ICatalogRepositoryPort} catalogRepository - Repository for catalog operations (injected)
     */
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    /**
     * Executes the updating an existing category use case.
     */
    async execute(params: {
        id: string;
        data: { name: string; slug: string; description: string };
    }): Promise<Result<ICategoryEntity>> {
        return this.catalogRepository.updateCategory(params.id, params.data);
    }
}
