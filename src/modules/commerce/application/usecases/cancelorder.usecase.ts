import type { ICommerceRepositoryPort } from "@/modules/commerce/application/repositories/commerce.repository.port";
import type { ICommerceActionResponse } from "@/modules/commerce/domain/entities/ICommerceActionResponse";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface ICancelOrderUseCase
 * @extends {IResultUseCase<string, ICommerceActionResponse>}
 */
interface ICancelOrderUseCase extends IResultUseCase<string, ICommerceActionResponse> {}

/**
 * Use case for cancelling an order.
 *
 * @class CancelOrderUseCase
 * @implements {ICancelOrderUseCase}
 *
 * @description
 * Cancels an existing order so it can no longer be submitted or
 * paid. This is a terminal action and the order cannot be
 * reactivated after cancellation.
 */
export class CancelOrderUseCase implements ICancelOrderUseCase {
    private readonly commerceRepository: ICommerceRepositoryPort;
    /**
     * @param {ICommerceRepositoryPort} commerceRepository - Repository for commerce operations (injected)
     */
    constructor({ commerceRepository }: { commerceRepository: ICommerceRepositoryPort }) {
        this.commerceRepository = commerceRepository;
    }
    /**
     * Executes the cancel order use case.
     *
     * @param {string} id - The order ID to cancel
     * @returns {Promise<Result<ICommerceActionResponse>>} `ok(ICommerceActionResponse)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<ICommerceActionResponse>> {
        return this.commerceRepository.cancelOrder(id);
    }
}
