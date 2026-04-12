import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICategoryPricingEntity } from "@/modules/catalog/domain/entities/ICategoryPricingEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IAddCategoryPricingUseCase
 * @extends {IResultUseCase<{ categoryId: string; data: { pricingTierId: string; priceUsd: number } }, ICategoryPricingEntity>}
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
 *
 * @description
 * Adds a new pricing tier with a USD price to the specified category
 * via the catalog repository.
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
     * Executes the add category pricing use case.
     *
     * @param {object} params - The category ID and pricing data
     * @returns {Promise<Result<ICategoryPricingEntity>>} `ok(ICategoryPricingEntity)` on success, `err(Failure)` on failure
     */
    async execute(params: {
        categoryId: string;
        data: { pricingTierId: string; priceUsd: number };
    }): Promise<Result<ICategoryPricingEntity>> {
        return this.catalogRepository.addCategoryPricing(params.categoryId, params.data);
    }
}
