import type { ICommerceRepositoryPort } from "@/modules/commerce/application/repositories/commerce.repository.port";
import type { IOrderSummaryEntity } from "@/modules/commerce/domain/entities/IOrderSummaryEntity";
import type { IPaginationQueryParams } from "@/modules/commerce/presentation/model/IPaginationQueryParams";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";

/**
 * @interface IGetCustomerOrdersUseCase
 * @extends {IResultUseCase<{ customerId: string; data: IPaginationQueryParams }, IPaginatedResult<IOrderSummaryEntity>>}
 */
interface IGetCustomerOrdersUseCase
    extends IResultUseCase<
        { customerId: string; data: IPaginationQueryParams },
        IPaginatedResult<IOrderSummaryEntity>
    > {}

/**
 * Use case for fetching orders for a specific customer.
 *
 * @class GetCustomerOrdersUseCase
 * @implements {IGetCustomerOrdersUseCase}
 *
 * @description
 * Retrieves a paginated list of orders belonging to a single
 * customer. Used on the customer detail page to display their
 * order history.
 */
export class GetCustomerOrdersUseCase implements IGetCustomerOrdersUseCase {
    private readonly commerceRepository: ICommerceRepositoryPort;
    /**
     * @param {ICommerceRepositoryPort} commerceRepository - Repository for commerce operations (injected)
     */
    constructor({ commerceRepository }: { commerceRepository: ICommerceRepositoryPort }) {
        this.commerceRepository = commerceRepository;
    }
    /**
     * Executes the get customer orders use case.
     *
     * @param {object} request - Parameters including customerId and pagination data
     * @returns {Promise<Result<IPaginatedResult<IOrderSummaryEntity>>>} `ok(IPaginatedResult<IOrderSummaryEntity>)` on success, `err(Failure)` on failure
     */
    async execute(request: { customerId: string; data: IPaginationQueryParams }): Promise<Result<IPaginatedResult<IOrderSummaryEntity>>> {
        return this.commerceRepository.getCustomerOrders(request.customerId, request.data);
    }
}
