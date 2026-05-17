import type { IOrderItemEntity } from "@/modules/commerce/domain/entities/IOrderItemEntity";
import type { IPaymentEntity } from "@/modules/commerce/domain/entities/IPaymentEntity";
import type { EnumOrderStatus } from "@/shared/infrastructure/api/generated/116.api";

/**
 * Domain entity for a full order detail view.
 *
 * @interface IOrderDetailEntity
 *
 * @property {string} id - Unique identifier (UUID)
 * @property {string} customerName - Display name of the B2B customer
 * @property {EnumOrderStatus} status - Current order status
 * @property {boolean} hasPayment - True when status is PendingPayment or Paid; derived in the mapper
 * @property {number} totalAmountUsd - Total order amount in USD
 * @property {IOrderItemEntity[]} items - Commissioned content items
 * @property {IPaymentEntity | null} payment - Attached payment record
 * @property {string | null} createdAt - ISO creation timestamp
 * @property {string | null} createdBy - UUID of the creating admin
 * @property {string | null} updatedAt - ISO last-update timestamp
 * @property {string | null} updatedBy - UUID of the last-updating admin
 */
export interface IOrderDetailEntity {
    id: string;
    customerId: string;
    customerName: string;
    packageId?: string | null;
    status: EnumOrderStatus;
    hasPayment: boolean;
    totalAmountUsd: number;
    items: IOrderItemEntity[];
    payment?: IPaymentEntity | null;
    createdAt?: string | null;
    createdBy?: string | null;
    updatedAt?: string | null;
    updatedBy?: string | null;
}
