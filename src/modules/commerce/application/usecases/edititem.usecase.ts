import type { ICommerceRepositoryPort } from "@/modules/commerce/application/repositories/commerce.repository.port";
import type { IOrderItemEntity } from "@/modules/commerce/domain/entities/IOrderItemEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";
import type { EnumCoreContentType } from "@/shared/infrastructure/api/generated/116.api";

/**
 * @interface IEditItemUseCase
 * @extends {IResultUseCase<{ orderId: string; itemId: string; contentKind?: EnumCoreContentType; categoryId?: string; promotionLevelId?: string | null; socialBoost?: boolean; isBonus?: boolean }, IOrderItemEntity>}
 */
interface IEditItemUseCase
    extends IResultUseCase<
        {
            orderId: string;
            itemId: string;
            contentKind?: EnumCoreContentType;
            categoryId?: string;
            promotionLevelId?: string | null;
            socialBoost?: boolean;
            isBonus?: boolean;
        },
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
     * @param {object} params - Item edit parameters including orderId, itemId, and fields to update
     * @returns {Promise<Result<IOrderItemEntity>>} `ok(IOrderItemEntity)` on success, `err(Failure)` on failure
     */
    async execute(params: {
        orderId: string;
        itemId: string;
        contentKind?: EnumCoreContentType;
        categoryId?: string;
        promotionLevelId?: string | null;
        socialBoost?: boolean;
        isBonus?: boolean;
    }): Promise<Result<IOrderItemEntity>> {
        return this.commerceRepository.editItem(params.orderId, params.itemId, {
            contentKind: params.contentKind,
            categoryId: params.categoryId,
            promotionLevelId: params.promotionLevelId,
            socialBoost: params.socialBoost,
            isBonus: params.isBonus
        });
    }
}
