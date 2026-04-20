import type { ICommerceRepositoryPort } from "@/modules/commerce/application/repositories/commerce.repository.port";
import type { ICommerceActionResponse } from "@/modules/commerce/domain/entities/ICommerceActionResponse";
import type { IRejectPaymentCredentials } from "@/modules/commerce/presentation/model/IRejectPaymentCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IRejectPaymentUseCase
 * @extends {IResultUseCase<{ orderId: string; data: IRejectPaymentCredentials }, ICommerceActionResponse>}
 */
interface IRejectPaymentUseCase
    extends IResultUseCase<
        { orderId: string; data: IRejectPaymentCredentials },
        ICommerceActionResponse
    > {}

/**
 * Use case for rejecting an order payment.
 *
 * @class RejectPaymentUseCase
 * @implements {IRejectPaymentUseCase}
 *
 * @description
 * Rejects a previously submitted payment proof for an order.
 * An optional notes field allows the admin to explain the
 * rejection reason, prompting the client to re-upload.
 */
export class RejectPaymentUseCase implements IRejectPaymentUseCase {
    private readonly commerceRepository: ICommerceRepositoryPort;
    /**
     * @param {ICommerceRepositoryPort} commerceRepository - Repository for commerce operations (injected)
     */
    constructor({ commerceRepository }: { commerceRepository: ICommerceRepositoryPort }) {
        this.commerceRepository = commerceRepository;
    }
    /**
     * Executes the reject payment use case.
     *
     * @param {object} request - Rejection parameters including orderId and optional notes
     * @returns {Promise<Result<ICommerceActionResponse>>} `ok(ICommerceActionResponse)` on success, `err(Failure)` on failure
     */
    async execute(request: {
        orderId: string;
        data: IRejectPaymentCredentials;
    }): Promise<Result<ICommerceActionResponse>> {
        return this.commerceRepository.rejectPayment(request.orderId, request.data);
    }
}
