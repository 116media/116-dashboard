import type { ICommerceRepositoryPort } from "@/modules/commerce/application/repositories/commerce.repository.port";
import type { IOrderSummaryEntity } from "@/modules/commerce/domain/entities/IOrderSummaryEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";

/**
 * @interface IListPendingPaymentOrdersUseCase
 * @extends {IResultUseCase<{ pageIndex: number; pageSize: number }, IPaginatedResult<IOrderSummaryEntity>>}
 */
interface IListPendingPaymentOrdersUseCase
    extends IResultUseCase<
        { pageIndex: number; pageSize: number },
        IPaginatedResult<IOrderSummaryEntity>
    > {}

/**
 * Use case for listing orders awaiting payment.
 *
 * @class ListPendingPaymentOrdersUseCase
 * @implements {IListPendingPaymentOrdersUseCase}
 *
 * @description
 * Returns a paginated list of orders whose payment is still
 * pending. Used by the finance team to prioritise payment
 * review and follow-up.
 */
export class ListPendingPaymentOrdersUseCase implements IListPendingPaymentOrdersUseCase {
    private readonly commerceRepository: ICommerceRepositoryPort;
    /**
     * @param {ICommerceRepositoryPort} commerceRepository - Repository for commerce operations (injected)
     */
    constructor({ commerceRepository }: { commerceRepository: ICommerceRepositoryPort }) {
        this.commerceRepository = commerceRepository;
    }
    /**
     * Executes the list pending payment orders use case.
     *
     * @param {object} params - Pagination parameters
     * @returns {Promise<Result<IPaginatedResult<IOrderSummaryEntity>>>} `ok(IPaginatedResult<IOrderSummaryEntity>)` on success, `err(Failure)` on failure
     */
    async execute(params: {
        pageIndex: number;
        pageSize: number;
    }): Promise<Result<IPaginatedResult<IOrderSummaryEntity>>> {
        return this.commerceRepository.listPendingPaymentOrders(params);
    }
}
