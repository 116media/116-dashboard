import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

interface IRemoveCategoryPricingUseCase
    extends IResultUseCase<{ categoryId: string; pricingId: string }, { isSuccess: boolean }> {}

export class RemoveCategoryPricingUseCase implements IRemoveCategoryPricingUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    async execute(params: {
        categoryId: string;
        pricingId: string;
    }): Promise<Result<{ isSuccess: boolean }>> {
        return this.catalogRepository.removeCategoryPricing(params.categoryId, params.pricingId);
    }
}
