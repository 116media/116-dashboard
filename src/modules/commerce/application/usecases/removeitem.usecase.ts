import type { ICommerceRepositoryPort } from "@/modules/commerce/application/repositories/commerce.repository.port";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IRemoveItemUseCase
 * @extends {IResultUseCase<{ orderId: string; itemId: string }, { isSuccess: boolean }>}
 */
interface IRemoveItemUseCase
    extends IResultUseCase<{ orderId: string; itemId: string }, { isSuccess: boolean }> {}

/**
 * Use case for removing a content item from an order.
 *
 * @class RemoveItemUseCase
 * @implements {IRemoveItemUseCase}
 *
 * @description
 * Removes a line-item from an existing draft order via the commerce
 * repository. Only orders in Draft status allow item removal.
 */
export class RemoveItemUseCase implements IRemoveItemUseCase {
    private readonly commerceRepository: ICommerceRepositoryPort;
    /**
     * @param {ICommerceRepositoryPort} commerceRepository - Repository for commerce operations (injected)
     */
    constructor({ commerceRepository }: { commerceRepository: ICommerceRepositoryPort }) {
        this.commerceRepository = commerceRepository;
    }
    /**
     * Executes the remove item use case.
     *
     * @param {object} params - Parameters including orderId and itemId
     * @returns {Promise<Result<{ isSuccess: boolean }>>} `ok({ isSuccess: boolean })` on success, `err(Failure)` on failure
     */
    async execute(params: {
        orderId: string;
        itemId: string;
    }): Promise<Result<{ isSuccess: boolean }>> {
        return this.commerceRepository.removeItem(params.orderId, params.itemId);
    }
}
