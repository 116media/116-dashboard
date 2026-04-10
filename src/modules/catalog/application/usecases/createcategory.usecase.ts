import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface ICreateCategoryUseCase
 */
interface ICreateCategoryUseCase
    extends IResultUseCase<
        {
            contentTypeId: string;
            name: string;
            slug: string;
            description: string;
            isFree: boolean;
        },
        ICategoryEntity
    > {}

/**
 * Use case for creating a new category.
 *
 * @class CreateCategoryUseCase
 * @implements {ICreateCategoryUseCase}
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
     * Executes the creating a new category use case.
     */
    async execute(params: {
        contentTypeId: string;
        name: string;
        slug: string;
        description: string;
        isFree: boolean;
    }): Promise<Result<ICategoryEntity>> {
        return this.catalogRepository.createCategory(params.contentTypeId, {
            name: params.name,
            slug: params.slug,
            description: params.description,
            isFree: params.isFree
        });
    }
}
