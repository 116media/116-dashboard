import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { ICreateCategoryCredentials } from "@/modules/catalog/presentation/model/ICreateCategoryCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface ICreateCategoryUseCase
 * @extends {IResultUseCase<ICreateCategoryCredentials, ICategoryEntity>}
 */
interface ICreateCategoryUseCase
    extends IResultUseCase<ICreateCategoryCredentials, ICategoryEntity> {}

/**
 * Use case for creating a new category.
 *
 * @class CreateCategoryUseCase
 * @implements {ICreateCategoryUseCase}
 *
 * @description
 * Creates a new content category under the specified content type
 * via the catalog repository.
 */
export class CreateCategoryUseCase implements ICreateCategoryUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    /**
     * @param {ICatalogRepositoryPort} catalogRepository - Repository for catalog operations (injected)
     */
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    /**
     * Executes the create category use case.
     *
     * @param {object} params - Category creation parameters
     * @returns {Promise<Result<ICategoryEntity>>} `ok(ICategoryEntity)` on success, `err(Failure)` on failure
     */
    async execute(params: ICreateCategoryCredentials): Promise<Result<ICategoryEntity>> {
        return this.catalogRepository.createCategory(params.contentTypeId, {
            name: params.name,
            slug: params.slug,
            description: params.description,
            isFree: params.isFree,
            isGossip: params.isGossip ?? false,
            isExclusive: params.isExclusive ?? false
        });
    }
}
