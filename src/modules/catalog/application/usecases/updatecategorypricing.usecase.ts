import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICategoryPricingEntity } from "@/modules/catalog/domain/entities/ICategoryPricingEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IUpdateCategoryPricingUseCase
 */
interface IUpdateCategoryPricingUseCase
    extends IResultUseCase<
        { categoryId: string; pricingId: string; data: { priceUsd: number } },
        ICategoryPricingEntity
    > {}

/**
 * Use case for updating a category pricing tier.
 *
 * @class UpdateCategoryPricingUseCase
 * @implements {IUpdateCategoryPricingUseCase}
 */
export class UpdateCategoryPricingUseCase implements IUpdateCategoryPricingUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    /**
     * @param {ICatalogRepositoryPort} catalogRepository - Repository for catalog operations (injected)
     */
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    /**
     * Executes the updating a category pricing tier use case.
     */
    async execute(params: {
        categoryId: string;
        pricingId: string;
        data: { priceUsd: number };
    }): Promise<Result<ICategoryPricingEntity>> {
        return this.catalogRepository.updateCategoryPricing(
            params.categoryId,
            params.pricingId,
            params.data
        );
    }
}
