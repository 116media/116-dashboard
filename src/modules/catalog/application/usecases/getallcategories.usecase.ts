import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";

interface IGetAllCategoriesUseCase
    extends IResultUseCase<
        {
            pageIndex: number;
            pageSize: number;
            isActive?: boolean;
            isFree?: boolean;
            search?: string;
        },
        IPaginatedResult<ICategoryEntity>
    > {}

export class GetAllCategoriesUseCase implements IGetAllCategoriesUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    async execute(params: {
        pageIndex: number;
        pageSize: number;
        isActive?: boolean;
        isFree?: boolean;
        search?: string;
    }): Promise<Result<IPaginatedResult<ICategoryEntity>>> {
        return this.catalogRepository.getAllCategories(params);
    }
}
