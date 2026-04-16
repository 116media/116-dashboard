import type { ICommerceRepositoryPort } from "@/modules/commerce/application/repositories/commerce.repository.port";
import type { ICommerceActionResponse } from "@/modules/commerce/domain/entities/ICommerceActionResponse";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface ISubmitOrderUseCase
 * @extends {IResultUseCase<string, ICommerceActionResponse>}
 */
interface ISubmitOrderUseCase extends IResultUseCase<string, ICommerceActionResponse> {}

/**
 * Use case for submitting a draft order for payment.
 *
 * @class SubmitOrderUseCase
 * @implements {ISubmitOrderUseCase}
 *
 * @description
 * Transitions a draft order to the submitted state, signalling
 * that the client has finalised line-items and the order is
 * ready for payment processing.
 */
export class SubmitOrderUseCase implements ISubmitOrderUseCase {
    private readonly commerceRepository: ICommerceRepositoryPort;
    /**
     * @param {ICommerceRepositoryPort} commerceRepository - Repository for commerce operations (injected)
     */
    constructor({ commerceRepository }: { commerceRepository: ICommerceRepositoryPort }) {
        this.commerceRepository = commerceRepository;
    }
    /**
     * Executes the submit order use case.
     *
     * @param {string} id - The order ID to submit
     * @returns {Promise<Result<ICommerceActionResponse>>} `ok(ICommerceActionResponse)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<ICommerceActionResponse>> {
        return this.commerceRepository.submitOrder(id);
    }
}
