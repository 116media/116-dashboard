import type { ICommerceRepositoryPort } from "@/modules/commerce/application/repositories/commerce.repository.port";
import type { ICommerceActionResponse } from "@/modules/commerce/domain/entities/ICommerceActionResponse";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IRemoveItemTierUseCase
 * @extends {IResultUseCase<{ orderId: string; itemId: string; tierId: string }, ICommerceActionResponse>}
 */
interface IRemoveItemTierUseCase
    extends IResultUseCase<
        { orderId: string; itemId: string; tierId: string },
        ICommerceActionResponse
    > {}

/**
 * Use case for removing a pricing tier from an order item.
 *
 * @class RemoveItemTierUseCase
 * @implements {IRemoveItemTierUseCase}
 *
 * @description
 * Removes a pricing tier snapshot from an order item via the commerce
 * repository. Only orders in Draft status allow tier removal.
 */
export class RemoveItemTierUseCase implements IRemoveItemTierUseCase {
    private readonly commerceRepository: ICommerceRepositoryPort;
    /**
     * @param {ICommerceRepositoryPort} commerceRepository - Repository for commerce operations (injected)
     */
    constructor({ commerceRepository }: { commerceRepository: ICommerceRepositoryPort }) {
        this.commerceRepository = commerceRepository;
    }
    /**
     * Executes the remove item tier use case.
     *
     * @param {object} request - Parameters including orderId, itemId, and tierId
     * @returns {Promise<Result<ICommerceActionResponse>>} `ok(ICommerceActionResponse)` on success, `err(Failure)` on failure
     */
    async execute(request: {
        orderId: string;
        itemId: string;
        tierId: string;
    }): Promise<Result<ICommerceActionResponse>> {
        return this.commerceRepository.removeItemTier(
            request.orderId,
            request.itemId,
            request.tierId
        );
    }
}
