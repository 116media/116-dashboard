import type { ICommerceRepositoryPort } from "@/modules/commerce/application/repositories/commerce.repository.port";
import type { IOrderItemEntity } from "@/modules/commerce/domain/entities/IOrderItemEntity";
import type { IAddOrderItemCredentials } from "@/modules/commerce/presentation/model/IAddOrderItemCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IAddItemToOrderUseCase
 * @extends {IResultUseCase<{ orderId: string; data: IAddOrderItemCredentials }, IOrderItemEntity>}
 */
interface IAddItemToOrderUseCase
    extends IResultUseCase<{ orderId: string; data: IAddOrderItemCredentials }, IOrderItemEntity> {}

/**
 * Use case for adding a content item to an order.
 *
 * @class AddItemToOrderUseCase
 * @implements {IAddItemToOrderUseCase}
 *
 * @description
 * Appends a new line-item to an existing draft order. Each item
 * specifies its content kind, category, optional promotion level,
 * and whether social-boost or bonus flags apply.
 */
export class AddItemToOrderUseCase implements IAddItemToOrderUseCase {
    private readonly commerceRepository: ICommerceRepositoryPort;
    /**
     * @param {ICommerceRepositoryPort} commerceRepository - Repository for commerce operations (injected)
     */
    constructor({ commerceRepository }: { commerceRepository: ICommerceRepositoryPort }) {
        this.commerceRepository = commerceRepository;
    }
    /**
     * Executes the add item to order use case.
     *
     * @param {object} request - Item details including orderId and order item data
     * @returns {Promise<Result<IOrderItemEntity>>} `ok(IOrderItemEntity)` on success, `err(Failure)` on failure
     */
    async execute(request: { orderId: string; data: IAddOrderItemCredentials }): Promise<Result<IOrderItemEntity>> {
        return this.commerceRepository.addItemToOrder(request.orderId, request.data);
    }
}
