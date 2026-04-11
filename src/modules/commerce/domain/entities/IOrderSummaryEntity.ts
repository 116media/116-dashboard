import type { EnumOrderStatus } from "@/shared/infrastructure/api/generated/116.api";

/**
 * Domain entity for an order list summary.
 *
 * @interface IOrderSummaryEntity
 *
 * @property {string} id - Unique identifier (UUID)
 * @property {string} customerName - Display name of the B2B customer
 * @property {EnumOrderStatus} status - Current order status
 * @property {number} totalAmountUsd - Total order amount in USD
 * @property {number} itemCount - Number of content items in the order
 * @property {string | null} createdAt - ISO creation timestamp
 * @property {string | null} createdBy - UUID of the creating admin
 * @property {string | null} updatedAt - ISO last-update timestamp
 * @property {string | null} updatedBy - UUID of the last-updating admin
 */
export interface IOrderSummaryEntity {
    id: string;
    customerName: string;
    status: EnumOrderStatus;
    totalAmountUsd: number;
    itemCount: number;
    createdAt?: string | null;
    createdBy?: string | null;
    updatedAt?: string | null;
    updatedBy?: string | null;
}
