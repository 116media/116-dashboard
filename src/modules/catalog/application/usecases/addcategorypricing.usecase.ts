import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICategoryPricingEntity } from "@/modules/catalog/domain/entities/ICategoryPricingEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

interface IAddCategoryPricingUseCase
    extends IResultUseCase<
        { categoryId: string; data: { pricingTierId: string; priceUsd: number } },
        ICategoryPricingEntity
    > {}

export class AddCategoryPricingUseCase implements IAddCategoryPricingUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    async execute(params: {
        categoryId: string;
        data: { pricingTierId: string; priceUsd: number };
    }): Promise<Result<ICategoryPricingEntity>> {
        return this.catalogRepository.addCategoryPricing(params.categoryId, params.data);
    }
}
