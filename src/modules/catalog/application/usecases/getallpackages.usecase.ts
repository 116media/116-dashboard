import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";

interface IGetAllPackagesUseCase
    extends IResultUseCase<
        { pageIndex: number; pageSize: number; isActive?: boolean; search?: string },
        IPaginatedResult<IPackageEntity>
    > {}

export class GetAllPackagesUseCase implements IGetAllPackagesUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    async execute(params: {
        pageIndex: number;
        pageSize: number;
        isActive?: boolean;
        search?: string;
    }): Promise<Result<IPaginatedResult<IPackageEntity>>> {
        return this.catalogRepository.getAllPackages(params);
    }
}
