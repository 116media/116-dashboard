import type { ICommerceRepositoryPort } from "@/modules/commerce/application/repositories/commerce.repository.port";
import type { ICommerceActionResponse } from "@/modules/commerce/domain/entities/ICommerceActionResponse";
import type { IVerifyPaymentCredentials } from "@/modules/commerce/presentation/model/IVerifyPaymentCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IVerifyPaymentUseCase
 * @extends {IResultUseCase<{ orderId: string; data: IVerifyPaymentCredentials }, ICommerceActionResponse>}
 */
interface IVerifyPaymentUseCase
    extends IResultUseCase<
        { orderId: string; data: IVerifyPaymentCredentials },
        ICommerceActionResponse
    > {}

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
     * @param {object} request - Verification parameters including orderId and receiptUrl
     * @returns {Promise<Result<ICommerceActionResponse>>} `ok(ICommerceActionResponse)` on success, `err(Failure)` on failure
     */
    async execute(request: {
        orderId: string;
        data: IVerifyPaymentCredentials;
    }): Promise<Result<ICommerceActionResponse>> {
        return this.commerceRepository.verifyPayment(request.orderId, request.data);
    }
}
