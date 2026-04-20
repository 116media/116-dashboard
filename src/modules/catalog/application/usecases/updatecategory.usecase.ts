import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { IUpdateCategoryCredentials } from "@/modules/catalog/presentation/model/IUpdateCategoryCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IUpdateCategoryUseCase
 * @extends {IResultUseCase<{ id: string; data: IUpdateCategoryCredentials }, ICategoryEntity>}
 */
interface IUpdateCategoryUseCase
    extends IResultUseCase<{ id: string; data: IUpdateCategoryCredentials }, ICategoryEntity> {}

/**
 * Use case for updating an existing category.
 *
 * @class UpdateCategoryUseCase
 * @implements {IUpdateCategoryUseCase}
 *
 * @description
 * Updates an existing category's name, slug, and description
 * via the catalog repository.
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
     * Executes the update category use case.
     *
     * @param {object} request - The category ID and updated data
     * @returns {Promise<Result<ICategoryEntity>>} `ok(ICategoryEntity)` on success, `err(Failure)` on failure
     */
    async execute(request: {
        id: string;
        data: IUpdateCategoryCredentials;
    }): Promise<Result<ICategoryEntity>> {
        return this.catalogRepository.updateCategory(request.id, request.data);
    }
}
