import type { OrderStatus } from "@/shared/domain/enums/order-status.enum";

/**
 * Domain entity for an order list summary.
 *
 * @interface IOrderSummaryEntity
 *
 * @property {string} id - Unique identifier (UUID)
 * @property {string} customerName - Display name of the B2B customer
 * @property {OrderStatus} status - Current order status
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
    status: OrderStatus;
    totalAmountUsd: number;
    itemCount: number;
    createdAt?: string | null;
    createdBy?: string | null;
    updatedAt?: string | null;
    updatedBy?: string | null;
}
