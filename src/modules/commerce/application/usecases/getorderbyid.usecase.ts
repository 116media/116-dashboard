import type { ICommerceRepositoryPort } from "@/modules/commerce/application/repositories/commerce.repository.port";
import type { IOrderDetailEntity } from "@/modules/commerce/domain/entities/IOrderDetailEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IGetOrderByIdUseCase
 * @extends {IResultUseCase<string, IOrderDetailEntity>}
 */
interface IGetOrderByIdUseCase extends IResultUseCase<string, IOrderDetailEntity> {}

/**
 * Use case for fetching a single order by ID.
 *
 * @class GetOrderByIdUseCase
 * @implements {IGetOrderByIdUseCase}
 *
 * @description
 * Retrieves the full detail view of a single order, including
 * line-items and pricing information. Used to render the order
 * detail page in the dashboard.
 */
export class GetOrderByIdUseCase implements IGetOrderByIdUseCase {
    private readonly commerceRepository: ICommerceRepositoryPort;
    /**
     * @param {ICommerceRepositoryPort} commerceRepository - Repository for commerce operations (injected)
     */
    constructor({ commerceRepository }: { commerceRepository: ICommerceRepositoryPort }) {
        this.commerceRepository = commerceRepository;
    }
    /**
     * Executes the get order by ID use case.
     *
     * @param {string} id - The order ID to retrieve
     * @returns {Promise<Result<IOrderDetailEntity>>} `ok(IOrderDetailEntity)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<IOrderDetailEntity>> {
        return this.commerceRepository.getOrderById(id);
    }
}
