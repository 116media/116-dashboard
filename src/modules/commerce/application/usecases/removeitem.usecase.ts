import type { ICommerceRepositoryPort } from "@/modules/commerce/application/repositories/commerce.repository.port";
import type { ICommerceActionResponse } from "@/modules/commerce/domain/entities/ICommerceActionResponse";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IRemoveItemUseCase
 * @extends {IResultUseCase<{ orderId: string; itemId: string }, ICommerceActionResponse>}
 */
interface IRemoveItemUseCase
    extends IResultUseCase<{ orderId: string; itemId: string }, ICommerceActionResponse> {}

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
     * @param {object} request - Parameters including orderId and itemId
     * @returns {Promise<Result<ICommerceActionResponse>>} `ok(ICommerceActionResponse)` on success, `err(Failure)` on failure
     */
    async execute(request: {
        orderId: string;
        itemId: string;
    }): Promise<Result<ICommerceActionResponse>> {
        return this.commerceRepository.removeItem(request.orderId, request.itemId);
    }
}
