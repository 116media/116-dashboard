import type { ICommerceRepositoryPort } from "@/modules/commerce/application/repositories/commerce.repository.port";
import type { IItemTierEntity } from "@/modules/commerce/domain/entities/IItemTierEntity";
import type { IAddItemTierCredentials } from "@/modules/commerce/presentation/model/IAddItemTierCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IAddTierToItemUseCase
 * @extends {IResultUseCase<{ orderId: string; itemId: string; data: IAddItemTierCredentials }, IItemTierEntity>}
 */
interface IAddTierToItemUseCase
    extends IResultUseCase<
        { orderId: string; itemId: string; data: IAddItemTierCredentials },
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
     * @param {object} request - Tier assignment parameters including orderId, itemId, and tier data
     * @returns {Promise<Result<IItemTierEntity>>} `ok(IItemTierEntity)` on success, `err(Failure)` on failure
     */
    async execute(request: {
        orderId: string;
        itemId: string;
        data: IAddItemTierCredentials;
    }): Promise<Result<IItemTierEntity>> {
        return this.commerceRepository.addTierToItem(request.orderId, request.itemId, request.data);
    }
}
