import type { ICommerceRepositoryPort } from "@/modules/commerce/application/repositories/commerce.repository.port";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IVerifyPaymentUseCase
 * @extends {IResultUseCase<{ orderId: string; receiptUrl: string }, { isSuccess: boolean }>}
 */
interface IVerifyPaymentUseCase
    extends IResultUseCase<{ orderId: string; receiptUrl: string }, { isSuccess: boolean }> {}

/**
 * Use case for verifying an order payment.
 *
 * @class VerifyPaymentUseCase
 * @implements {IVerifyPaymentUseCase}
 *
 * @description
 * Marks an order's payment as verified by an admin after reviewing
 * the attached proof of payment. A receipt URL is recorded for
 * audit purposes.
 */
export class VerifyPaymentUseCase implements IVerifyPaymentUseCase {
    private readonly commerceRepository: ICommerceRepositoryPort;
    /**
     * @param {ICommerceRepositoryPort} commerceRepository - Repository for commerce operations (injected)
     */
    constructor({ commerceRepository }: { commerceRepository: ICommerceRepositoryPort }) {
        this.commerceRepository = commerceRepository;
    }
    /**
     * Executes the verify payment use case.
     *
     * @param {object} params - Verification parameters including orderId and receiptUrl
     * @returns {Promise<Result<{ isSuccess: boolean }>>} `ok({ isSuccess: boolean })` on success, `err(Failure)` on failure
     */
    async execute(params: {
        orderId: string;
        receiptUrl: string;
    }): Promise<Result<{ isSuccess: boolean }>> {
        return this.commerceRepository.verifyPayment(params.orderId, {
            receiptUrl: params.receiptUrl
        });
    }
}
