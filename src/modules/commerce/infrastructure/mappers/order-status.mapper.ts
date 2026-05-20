import { OrderStatus } from "@/shared/domain/enums/order-status.enum";
import { EnumOrderStatus } from "@/shared/infrastructure/api/generated/116.api";

/**
 * Exhaustive map from API enum to domain enum.
 * TypeScript will error here if the backend adds a new status that isn't handled.
 */
const orderStatusMap: Record<EnumOrderStatus, OrderStatus> = {
    [EnumOrderStatus.Draft]: OrderStatus.Draft,
    [EnumOrderStatus.PendingPayment]: OrderStatus.PendingPayment,
    [EnumOrderStatus.Paid]: OrderStatus.Paid,
    [EnumOrderStatus.Cancelled]: OrderStatus.Cancelled
};

/**
 * Maps a generated API order status to the domain OrderStatus enum.
 *
 * @param {EnumOrderStatus} status - API order status value
 * @returns {OrderStatus} Corresponding domain enum value
 */
export const mapOrderStatus = (status: EnumOrderStatus): OrderStatus => orderStatusMap[status];
