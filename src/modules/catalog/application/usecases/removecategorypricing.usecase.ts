import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IRemoveCategoryPricingUseCase
 * @extends {IResultUseCase<{ categoryId: string; pricingId: string }, { isSuccess: boolean }>}
 */
interface IRemoveCategoryPricingUseCase
    extends IResultUseCase<{ categoryId: string; pricingId: string }, { isSuccess: boolean }> {}

/**
 * Use case for removing a pricing tier from a category.
 *
 * @class RemoveCategoryPricingUseCase
 * @implements {IRemoveCategoryPricingUseCase}
 *
 * @description
 * Removes an existing pricing tier from a category
 * via the catalog repository.
 */
export class RemoveCategoryPricingUseCase implements IRemoveCategoryPricingUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    /**
     * @param {ICatalogRepositoryPort} catalogRepository - Repository for catalog operations (injected)
     */
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    /**
     * Executes the remove category pricing use case.
     *
     * @param {object} params - The category ID and pricing ID to remove
     * @returns {Promise<Result<{ isSuccess: boolean }>>} `ok({ isSuccess: boolean })` on success, `err(Failure)` on failure
     */
    async execute(params: {
        categoryId: string;
        pricingId: string;
    }): Promise<Result<{ isSuccess: boolean }>> {
        return this.catalogRepository.removeCategoryPricing(params.categoryId, params.pricingId);
    }
}
