import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";

interface IGetAllCustomersUseCase
    extends IResultUseCase<
        { pageIndex: number; pageSize: number; search?: string },
        IPaginatedResult<ICustomerEntity>
    > {}

export class GetAllCustomersUseCase implements IGetAllCustomersUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    async execute(params: {
        pageIndex: number;
        pageSize: number;
        search?: string;
    }): Promise<Result<IPaginatedResult<ICustomerEntity>>> {
        return this.catalogRepository.getAllCustomers(params);
    }
}
