import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

interface ICreatePackageUseCase
    extends IResultUseCase<
        { name: string; description?: string; flatPriceUsd: number },
        IPackageEntity
    > {}

export class CreatePackageUseCase implements ICreatePackageUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    async execute(data: {
        name: string;
        description?: string;
        flatPriceUsd: number;
    }): Promise<Result<IPackageEntity>> {
        return this.catalogRepository.createPackage(data);
    }
}
