import type { ICommerceRepositoryPort } from "@/modules/commerce/application/repositories/commerce.repository.port";
import type { IOrderSummaryEntity } from "@/modules/commerce/domain/entities/IOrderSummaryEntity";
import type { IOrdersQueryParams } from "@/modules/commerce/presentation/model/IOrdersQueryParams";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";

/**
 * @interface IListOrdersUseCase
 * @extends {IResultUseCase<IOrdersQueryParams, IPaginatedResult<IOrderSummaryEntity>>}
 */
interface IListOrdersUseCase
    extends IResultUseCase<IOrdersQueryParams, IPaginatedResult<IOrderSummaryEntity>> {}

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
     * @param {IOrdersQueryParams} params - Pagination and optional filter parameters
     * @returns {Promise<Result<IPaginatedResult<IOrderSummaryEntity>>>} `ok(IPaginatedResult<IOrderSummaryEntity>)` on success, `err(Failure)` on failure
     */
    async execute(
        params: IOrdersQueryParams
    ): Promise<Result<IPaginatedResult<IOrderSummaryEntity>>> {
        return this.commerceRepository.listOrders(params);
    }
}
