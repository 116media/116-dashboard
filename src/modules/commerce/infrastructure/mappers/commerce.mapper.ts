import type { IItemTierEntity } from "@/modules/commerce/domain/entities/IItemTierEntity";
import type { IOrderDetailEntity } from "@/modules/commerce/domain/entities/IOrderDetailEntity";
import type { IOrderItemEntity } from "@/modules/commerce/domain/entities/IOrderItemEntity";
import type { IOrderSummaryEntity } from "@/modules/commerce/domain/entities/IOrderSummaryEntity";
import type { IPaymentEntity } from "@/modules/commerce/domain/entities/IPaymentEntity";
import type { IPaymentSummaryEntity } from "@/modules/commerce/domain/entities/IPaymentSummaryEntity";
import { mapCoreContentType } from "@/modules/commerce/infrastructure/mappers/core-content-type.mapper";
import { mapOrderStatus } from "@/modules/commerce/infrastructure/mappers/order-status.mapper";
import { mapPaymentMethod } from "@/modules/commerce/infrastructure/mappers/payment-method.mapper";
import { mapPaymentStatus } from "@/modules/commerce/infrastructure/mappers/payment-status.mapper";
import { CoreContentType } from "@/shared/domain/enums/core-content-type.enum";
import { OrderStatus } from "@/shared/domain/enums/order-status.enum";
import type {
    ContentOrderDetailDto,
    ContentOrderSummaryDto,
    EnumOrderStatus,
    EnumPaymentMethod,
    EnumPaymentStatus,
    ItemTierDto,
    OrderItemDto,
    PaymentDto
} from "@/shared/infrastructure/api/generated/116.api";

/**
 * Temporary DTO type for payment summaries until the API client is regenerated.
 * Matches the backend's `PaymentSummaryDto` record shape.
 */
export interface PaymentSummaryDto {
    id: string;
    orderId: string;
    customerName: string;
    amountUsd: number;
    paymentMethod?: EnumPaymentMethod | null;
    status: EnumPaymentStatus;
    orderStatus: EnumOrderStatus;
    verifiedBy?: string | null;
    verifiedByUserName?: string | null;
    verifiedAt?: string | null;
    createdAt?: string | null;
    createdBy?: string | null;
    updatedAt?: string | null;
    updatedBy?: string | null;
}

/**
 * Mapper for converting API DTOs to domain entities in the commerce module.
 *
 * @description
 * Provides pure transformation functions to map data transfer objects (DTOs)
 * from the API layer to clean domain entities. Handles nested object mappings
 * for items within orders and proof files within payments.
 *
 * @remarks
 * - All methods are stateless pure functions
 * - Marked as const to prevent accidental mutation
 * - Part of the infrastructure layer
 */
export const CommerceMapper = {
    /**
     * Maps ItemTierDto to IItemTierEntity domain entity.
     *
     * @param {ItemTierDto} dto - Pricing tier snapshot data from API
     * @returns {IItemTierEntity} Mapped item tier entity
     */
    itemTierFromDto(dto: ItemTierDto & { id?: string }): IItemTierEntity {
        return {
            id: dto.id ?? "",
            tierName: dto.tierName,
            priceSnapshotUsd: dto.priceSnapshotUsd
        };
    },

    /**
     * Maps OrderItemDto to IOrderItemEntity domain entity.
     *
     * @param {OrderItemDto} dto - Order item data from API
     * @returns {IOrderItemEntity} Mapped order item entity with nested tier snapshots
     */
    orderItemFromDto(dto: OrderItemDto): IOrderItemEntity {
        const contentKind = mapCoreContentType(dto.contentKind);
        return {
            id: dto.id,
            contentKind,
            isVideoType: contentKind === CoreContentType.Video,
            isArticleType: contentKind === CoreContentType.Article,
            categoryId: dto.categoryId,
            categoryName: dto.categoryName,
            promotionLevelId: dto.promotionLevelId,
            promotionLevelName: dto.promotionLevelName,
            promoPriceUsd: dto.promoPriceUsd,
            socialBoost: dto.socialBoost,
            isBonus: dto.isBonus,
            tiers: dto.tiers.map(CommerceMapper.itemTierFromDto)
        };
    },

    /**
     * Maps PaymentDto to IPaymentEntity domain entity.
     *
     * @param {PaymentDto} dto - Payment record data from API
     * @returns {IPaymentEntity} Mapped payment entity with nested proof file
     */
    paymentFromDto(dto: PaymentDto): IPaymentEntity {
        return {
            id: dto.id,
            amountUsd: dto.amountUsd,
            paymentMethod: dto.paymentMethod ? mapPaymentMethod(dto.paymentMethod) : null,
            paymentProof: dto.paymentProof
                ? {
                      id: dto.paymentProof.id,
                      fileName: dto.paymentProof.fileName,
                      storageUrl: dto.paymentProof.storageUrl
                  }
                : null,
            status: mapPaymentStatus(dto.status),
            verifiedBy: dto.verifiedBy,
            verifiedByUserName: dto.verifiedByUserName,
            verifiedAt: dto.verifiedAt,
            receiptUrl: dto.receiptUrl
        };
    },

    /**
     * Maps ContentOrderSummaryDto to IOrderSummaryEntity domain entity.
     *
     * @param {ContentOrderSummaryDto} dto - Order summary data from API
     * @returns {IOrderSummaryEntity} Mapped order summary entity with audit timestamps
     */
    orderSummaryFromDto(dto: ContentOrderSummaryDto): IOrderSummaryEntity {
        const status = mapOrderStatus(dto.status);
        return {
            id: dto.id,
            customerName: dto.customerName,
            status,
            canAddItem: status === OrderStatus.Draft,
            canSubmit: status === OrderStatus.Draft,
            canCancel: status !== OrderStatus.Paid && status !== OrderStatus.Cancelled,
            totalAmountUsd: dto.totalAmountUsd,
            itemCount: dto.itemCount,
            createdAt: dto.createdAt,
            createdBy: dto.createdBy,
            updatedAt: dto.updatedAt,
            updatedBy: dto.updatedBy
        };
    },

    /**
     * Maps ContentOrderDetailDto to IOrderDetailEntity domain entity.
     *
     * @param {ContentOrderDetailDto} dto - Full order detail data from API
     * @returns {IOrderDetailEntity} Mapped order detail entity with nested items and payment
     */
    orderDetailFromDto(dto: ContentOrderDetailDto): IOrderDetailEntity {
        const status = mapOrderStatus(dto.status);
        return {
            id: dto.id,
            customerId: dto.customerId,
            customerName: dto.customerName,
            packageId: dto.packageId,
            status,
            hasPayment: status === OrderStatus.PendingPayment || status === OrderStatus.Paid,
            totalAmountUsd: dto.totalAmountUsd,
            items: dto.items.map(CommerceMapper.orderItemFromDto),
            payment: dto.payment ? CommerceMapper.paymentFromDto(dto.payment) : null,
            createdAt: dto.createdAt,
            createdBy: dto.createdBy,
            updatedAt: dto.updatedAt,
            updatedBy: dto.updatedBy
        };
    },

    /**
     * Maps PaymentSummaryDto to IPaymentSummaryEntity domain entity.
     *
     * @param {PaymentSummaryDto} dto - Payment summary data from API
     * @returns {IPaymentSummaryEntity} Mapped payment summary entity with order and customer info
     */
    paymentSummaryFromDto(dto: PaymentSummaryDto): IPaymentSummaryEntity {
        return {
            id: dto.id,
            orderId: dto.orderId,
            customerName: dto.customerName,
            amountUsd: dto.amountUsd,
            paymentMethod: dto.paymentMethod ? mapPaymentMethod(dto.paymentMethod) : null,
            status: mapPaymentStatus(dto.status),
            orderStatus: mapOrderStatus(dto.orderStatus),
            verifiedBy: dto.verifiedBy,
            verifiedByUserName: dto.verifiedByUserName,
            verifiedAt: dto.verifiedAt,
            createdAt: dto.createdAt,
            createdBy: dto.createdBy,
            updatedAt: dto.updatedAt,
            updatedBy: dto.updatedBy
        };
    }
} as const;
