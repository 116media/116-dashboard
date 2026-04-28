import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

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

export class CreateCategoryUseCase implements ICreateCategoryUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
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
