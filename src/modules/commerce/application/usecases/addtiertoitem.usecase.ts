import type { ICommerceRepositoryPort } from "@/modules/commerce/application/repositories/commerce.repository.port";
import type { IItemTierEntity } from "@/modules/commerce/domain/entities/IItemTierEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IAddTierToItemUseCase
 * @extends {IResultUseCase<{ orderId: string; itemId: string; pricingTierId: string }, IItemTierEntity>}
 */
interface IAddTierToItemUseCase
    extends IResultUseCase<
        { orderId: string; itemId: string; pricingTierId: string },
        IItemTierEntity
    > {}

/**
 * Use case for attaching a pricing tier to an order item.
 *
 * @class AddTierToItemUseCase
 * @implements {IAddTierToItemUseCase}
 *
 * @description
 * Associates a pricing tier with a specific line-item inside an
 * order. The tier determines the unit price applied when the
 * order total is calculated.
 */
export class AddTierToItemUseCase implements IAddTierToItemUseCase {
    private readonly commerceRepository: ICommerceRepositoryPort;
    /**
     * @param {ICommerceRepositoryPort} commerceRepository - Repository for commerce operations (injected)
     */
    constructor({ commerceRepository }: { commerceRepository: ICommerceRepositoryPort }) {
        this.commerceRepository = commerceRepository;
    }
    /**
     * Executes the add tier to item use case.
     *
     * @param {object} params - Tier assignment parameters including orderId, itemId, and pricingTierId
     * @returns {Promise<Result<IItemTierEntity>>} `ok(IItemTierEntity)` on success, `err(Failure)` on failure
     */
    async execute(params: {
        orderId: string;
        itemId: string;
        pricingTierId: string;
    }): Promise<Result<IItemTierEntity>> {
        return this.commerceRepository.addTierToItem(params.orderId, params.itemId, {
            pricingTierId: params.pricingTierId
        });
    }
}
