import type { ICommerceRepositoryPort } from "@/modules/commerce/application/repositories/commerce.repository.port";
import type { IOrderItemEntity } from "@/modules/commerce/domain/entities/IOrderItemEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";
import type { EnumCoreContentType } from "@/shared/infrastructure/api/generated/116.api";

/**
 * @interface IAddItemToOrderUseCase
 * @extends {IResultUseCase<{ orderId: string; contentKind: EnumCoreContentType; categoryId: string; promotionLevelId?: string | null; socialBoost: boolean; isBonus: boolean }, IOrderItemEntity>}
 */
interface IAddItemToOrderUseCase
    extends IResultUseCase<
        {
            orderId: string;
            contentKind: EnumCoreContentType;
            categoryId: string;
            promotionLevelId?: string | null;
            socialBoost: boolean;
            isBonus: boolean;
        },
        IOrderItemEntity
    > {}

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
     * @param {object} params - Item details including orderId, contentKind, categoryId, and flags
     * @returns {Promise<Result<IOrderItemEntity>>} `ok(IOrderItemEntity)` on success, `err(Failure)` on failure
     */
    async execute(params: {
        orderId: string;
        contentKind: EnumCoreContentType;
        categoryId: string;
        promotionLevelId?: string | null;
        socialBoost: boolean;
        isBonus: boolean;
    }): Promise<Result<IOrderItemEntity>> {
        return this.commerceRepository.addItemToOrder(params.orderId, {
            contentKind: params.contentKind,
            categoryId: params.categoryId,
            promotionLevelId: params.promotionLevelId,
            socialBoost: params.socialBoost,
            isBonus: params.isBonus
        });
    }
}
