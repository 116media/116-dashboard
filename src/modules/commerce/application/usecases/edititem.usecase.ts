import type { ICommerceRepositoryPort } from "@/modules/commerce/application/repositories/commerce.repository.port";
import type { IOrderItemEntity } from "@/modules/commerce/domain/entities/IOrderItemEntity";
import type { IEditItemCredentials } from "@/modules/commerce/presentation/model/IEditItemCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IEditItemUseCase
 * @extends {IResultUseCase<{ orderId: string; itemId: string; data: IEditItemCredentials }, IOrderItemEntity>}
 */
interface IEditItemUseCase
    extends IResultUseCase<
        { orderId: string; itemId: string; data: IEditItemCredentials },
        IOrderItemEntity
    > {}

/**
 * Use case for editing a content item within an order.
 *
 * @class EditItemUseCase
 * @implements {IEditItemUseCase}
 *
 * @description
 * Updates an existing line-item in a draft order via the commerce
 * repository. Allows changing content kind, category, promotion
 * level, social boost, and bonus flags.
 */
export class EditItemUseCase implements IEditItemUseCase {
    private readonly commerceRepository: ICommerceRepositoryPort;
    /**
     * @param {ICommerceRepositoryPort} commerceRepository - Repository for commerce operations (injected)
     */
    constructor({ commerceRepository }: { commerceRepository: ICommerceRepositoryPort }) {
        this.commerceRepository = commerceRepository;
    }
    /**
     * Executes the edit item use case.
     *
     * @param {object} request - Item edit parameters including orderId, itemId, and fields to update
     * @returns {Promise<Result<IOrderItemEntity>>} `ok(IOrderItemEntity)` on success, `err(Failure)` on failure
     */
    async execute(request: { orderId: string; itemId: string; data: IEditItemCredentials }): Promise<Result<IOrderItemEntity>> {
        return this.commerceRepository.editItem(request.orderId, request.itemId, request.data);
    }
}
