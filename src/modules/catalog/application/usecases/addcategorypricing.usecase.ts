import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICategoryPricingEntity } from "@/modules/catalog/domain/entities/ICategoryPricingEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IAddCategoryPricingUseCase
 */
interface IAddCategoryPricingUseCase
    extends IResultUseCase<
        { categoryId: string; data: { pricingTierId: string; priceUsd: number } },
        ICategoryPricingEntity
    > {}

/**
 * Use case for adding a pricing tier to a category.
 *
 * @class AddCategoryPricingUseCase
 * @implements {IAddCategoryPricingUseCase}
 */
export class AddCategoryPricingUseCase implements IAddCategoryPricingUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    /**
     * @param {ICatalogRepositoryPort} catalogRepository - Repository for catalog operations (injected)
     */
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    /**
     * Executes the adding a pricing tier to a category use case.
     */
    async execute(params: {
        categoryId: string;
        data: { pricingTierId: string; priceUsd: number };
    }): Promise<Result<ICategoryPricingEntity>> {
        return this.catalogRepository.addCategoryPricing(params.categoryId, params.data);
    }
}
