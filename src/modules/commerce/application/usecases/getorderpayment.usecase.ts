import type { ICommerceRepositoryPort } from "@/modules/commerce/application/repositories/commerce.repository.port";
import type { IPaymentEntity } from "@/modules/commerce/domain/entities/IPaymentEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IGetOrderPaymentUseCase
 * @extends {IResultUseCase<string, IPaymentEntity>}
 */
interface IGetOrderPaymentUseCase extends IResultUseCase<string, IPaymentEntity> {}

/**
 * Use case for fetching an order's payment record.
 *
 * @class GetOrderPaymentUseCase
 * @implements {IGetOrderPaymentUseCase}
 *
 * @description
 * Retrieves the payment record associated with an order,
 * including payment method, proof documents, and current
 * verification status.
 */
export class GetOrderPaymentUseCase implements IGetOrderPaymentUseCase {
    private readonly commerceRepository: ICommerceRepositoryPort;
    /**
     * @param {ICommerceRepositoryPort} commerceRepository - Repository for commerce operations (injected)
     */
    constructor({ commerceRepository }: { commerceRepository: ICommerceRepositoryPort }) {
        this.commerceRepository = commerceRepository;
    }
    /**
     * Executes the get order payment use case.
     *
     * @param {string} orderId - The order ID whose payment record to retrieve
     * @returns {Promise<Result<IPaymentEntity>>} `ok(IPaymentEntity)` on success, `err(Failure)` on failure
     */
    async execute(orderId: string): Promise<Result<IPaymentEntity>> {
        return this.commerceRepository.getOrderPayment(orderId);
    }
}
