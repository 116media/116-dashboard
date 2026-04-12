import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICategoryPricingEntity } from "@/modules/catalog/domain/entities/ICategoryPricingEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IUpdateCategoryPricingUseCase
 * @extends {IResultUseCase<{ categoryId: string; pricingId: string; data: { priceUsd: number } }, ICategoryPricingEntity>}
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
 *
 * @description
 * Updates the USD price of an existing pricing tier on a category
 * via the catalog repository.
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
     * Executes the update category pricing use case.
     *
     * @param {object} params - The category ID, pricing ID, and updated price data
     * @returns {Promise<Result<ICategoryPricingEntity>>} `ok(ICategoryPricingEntity)` on success, `err(Failure)` on failure
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
