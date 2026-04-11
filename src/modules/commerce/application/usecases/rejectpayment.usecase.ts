import type { ICommerceRepositoryPort } from "@/modules/commerce/application/repositories/commerce.repository.port";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IRejectPaymentUseCase
 * @extends {IResultUseCase<{ orderId: string; notes?: string | null }, { isSuccess: boolean }>}
 */
interface IRejectPaymentUseCase
    extends IResultUseCase<{ orderId: string; notes?: string | null }, { isSuccess: boolean }> {}

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
     * @param {object} params - Rejection parameters including orderId and optional notes
     * @returns {Promise<Result<{ isSuccess: boolean }>>} `ok({ isSuccess: boolean })` on success, `err(Failure)` on failure
     */
    async execute(params: {
        orderId: string;
        notes?: string | null;
    }): Promise<Result<{ isSuccess: boolean }>> {
        return this.commerceRepository.rejectPayment(params.orderId, {
            notes: params.notes
        });
    }
}
