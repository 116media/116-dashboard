import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICatalogActionResponse } from "@/modules/catalog/domain/entities/ICatalogActionResponse";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IRemoveCategoryPricingUseCase
 * @extends {IResultUseCase<{ categoryId: string; pricingId: string }, ICatalogActionResponse>}
 */
interface IRemoveCategoryPricingUseCase
    extends IResultUseCase<{ categoryId: string; pricingId: string }, ICatalogActionResponse> {}

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
     * @param {object} request - The category ID and pricing ID to remove
     * @returns {Promise<Result<ICatalogActionResponse>>} `ok(ICatalogActionResponse)` on success, `err(Failure)` on failure
     */
    async execute(request: {
        categoryId: string;
        pricingId: string;
    }): Promise<Result<ICatalogActionResponse>> {
        return this.catalogRepository.removeCategoryPricing(request.categoryId, request.pricingId);
    }
}
