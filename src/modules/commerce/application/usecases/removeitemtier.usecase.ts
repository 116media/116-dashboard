import type { ICommerceRepositoryPort } from "@/modules/commerce/application/repositories/commerce.repository.port";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IRemoveItemTierUseCase
 * @extends {IResultUseCase<{ orderId: string; itemId: string; tierId: string }, { isSuccess: boolean }>}
 */
interface IRemoveItemTierUseCase
    extends IResultUseCase<
        { orderId: string; itemId: string; tierId: string },
        { isSuccess: boolean }
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
     * @param {object} params - Parameters including orderId, itemId, and tierId
     * @returns {Promise<Result<{ isSuccess: boolean }>>} `ok({ isSuccess: boolean })` on success, `err(Failure)` on failure
     */
    async execute(params: {
        orderId: string;
        itemId: string;
        tierId: string;
    }): Promise<Result<{ isSuccess: boolean }>> {
        return this.commerceRepository.removeItemTier(params.orderId, params.itemId, params.tierId);
    }
}
