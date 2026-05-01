import type { ICommerceRepositoryPort } from "@/modules/commerce/application/repositories/commerce.repository.port";
import type { IOrderSummaryEntity } from "@/modules/commerce/domain/entities/IOrderSummaryEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import type { EnumOrderStatus } from "@/shared/infrastructure/api/generated/116.api";

/**
 * @interface IListOrdersUseCase
 * @extends {IResultUseCase<{ pageIndex: number; pageSize: number; status?: EnumOrderStatus; customerId?: string }, IPaginatedResult<IOrderSummaryEntity>>}
 */
interface IListOrdersUseCase
    extends IResultUseCase<
        {
            pageIndex: number;
            pageSize: number;
            status?: EnumOrderStatus;
            customerId?: string;
            search?: string;
        },
        IPaginatedResult<IOrderSummaryEntity>
    > {}

/**
 * Use case for listing all orders.
 *
 * @class ListOrdersUseCase
 * @implements {IListOrdersUseCase}
 *
 * @description
 * Retrieves a paginated list of orders with optional filters for
 * order status and customer. Used by admins to browse and manage
 * the full order backlog.
 */
export class ListOrdersUseCase implements IListOrdersUseCase {
    private readonly commerceRepository: ICommerceRepositoryPort;
    /**
     * @param {ICommerceRepositoryPort} commerceRepository - Repository for commerce operations (injected)
     */
    constructor({ commerceRepository }: { commerceRepository: ICommerceRepositoryPort }) {
        this.commerceRepository = commerceRepository;
    }
    /**
     * Executes the list orders use case.
     *
     * @param {object} params - Pagination and optional filter parameters
     * @returns {Promise<Result<IPaginatedResult<IOrderSummaryEntity>>>} `ok(IPaginatedResult<IOrderSummaryEntity>)` on success, `err(Failure)` on failure
     */
    async execute(params: {
        pageIndex: number;
        pageSize: number;
        status?: EnumOrderStatus;
        customerId?: string;
    }): Promise<Result<IPaginatedResult<IOrderSummaryEntity>>> {
        return this.commerceRepository.listOrders(params);
    }
}
