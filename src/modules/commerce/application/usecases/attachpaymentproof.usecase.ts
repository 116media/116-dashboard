import type { ICommerceRepositoryPort } from "@/modules/commerce/application/repositories/commerce.repository.port";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";
import type { EnumPaymentMethod } from "@/shared/infrastructure/api/generated/116.api";

/**
 * @interface IAttachPaymentProofUseCase
 * @extends {IResultUseCase<{ orderId: string; file: File; paymentMethod: EnumPaymentMethod }, { id: string; fileName: string; storageUrl: string }>}
 */
interface IAttachPaymentProofUseCase
    extends IResultUseCase<
        {
            orderId: string;
            file: File;
            paymentMethod: EnumPaymentMethod;
        },
        { id: string; fileName: string; storageUrl: string }
    > {}

/**
 * Use case for attaching a payment proof to an order.
 *
 * @class AttachPaymentProofUseCase
 * @implements {IAttachPaymentProofUseCase}
 *
 * @description
 * Uploads a payment-proof document (e.g. bank transfer receipt)
 * and links it to the specified order. The returned metadata
 * includes the storage URL for later retrieval during payment
 * verification.
 */
export class AttachPaymentProofUseCase implements IAttachPaymentProofUseCase {
    private readonly commerceRepository: ICommerceRepositoryPort;
    /**
     * @param {ICommerceRepositoryPort} commerceRepository - Repository for commerce operations (injected)
     */
    constructor({ commerceRepository }: { commerceRepository: ICommerceRepositoryPort }) {
        this.commerceRepository = commerceRepository;
    }
    /**
     * Executes the attach payment proof use case.
     *
     * @param {object} params - Payment proof parameters including orderId, file, and paymentMethod
     * @returns {Promise<Result<{ id: string; fileName: string; storageUrl: string }>>} `ok({ id, fileName, storageUrl })` on success, `err(Failure)` on failure
     */
    async execute(params: {
        orderId: string;
        file: File;
        paymentMethod: EnumPaymentMethod;
    }): Promise<Result<{ id: string; fileName: string; storageUrl: string }>> {
        return this.commerceRepository.attachPaymentProof(params.orderId, {
            file: params.file,
            paymentMethod: params.paymentMethod
        });
    }
}
