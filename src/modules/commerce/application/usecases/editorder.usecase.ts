import type { ICommerceRepositoryPort } from "@/modules/commerce/application/repositories/commerce.repository.port";
import type { IOrderSummaryEntity } from "@/modules/commerce/domain/entities/IOrderSummaryEntity";
import type { IEditOrderCredentials } from "@/modules/commerce/presentation/model/IEditOrderCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IEditOrderUseCase
 * @extends {IResultUseCase<{ id: string; data: IEditOrderCredentials }, IOrderSummaryEntity>}
 */
interface IEditOrderUseCase
    extends IResultUseCase<{ id: string; data: IEditOrderCredentials }, IOrderSummaryEntity> {}

/**
 * Use case for editing a draft order.
 *
 * @class EditOrderUseCase
 * @implements {IEditOrderUseCase}
 *
 * @description
 * Updates an existing draft order's customer or package assignment
 * via the commerce repository. Only orders in Draft status can be
 * edited.
 */
export class EditOrderUseCase implements IEditOrderUseCase {
    private readonly commerceRepository: ICommerceRepositoryPort;
    /**
     * @param {ICommerceRepositoryPort} commerceRepository - Repository for commerce operations (injected)
     */
    constructor({ commerceRepository }: { commerceRepository: ICommerceRepositoryPort }) {
        this.commerceRepository = commerceRepository;
    }
    /**
     * Executes the edit order use case.
     *
     * @param {object} request - Order edit parameters including id, customerId, and packageId
     * @returns {Promise<Result<IOrderSummaryEntity>>} `ok(IOrderSummaryEntity)` on success, `err(Failure)` on failure
     */
    async execute(request: { id: string; data: IEditOrderCredentials }): Promise<Result<IOrderSummaryEntity>> {
        return this.commerceRepository.editOrder(request.id, request.data);
    }
}
