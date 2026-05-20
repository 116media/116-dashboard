import { OrderStatus } from "@/shared/domain/enums/order-status.enum";
import type { IStatusOption } from "@/shared/domain/types/pagination";

/**
 * Status filter values for the orders list.
 */
export type OrderStatusFilter = "all" | OrderStatus;

/**
 * Status filter options for the orders table toolbar.
 *
 * @description
 * Module-specific options with French labels. Passed to the
 * generic `TableStatusFilter` / `TableToolbar` components.
 */
export const ORDER_STATUS_OPTIONS: IStatusOption<OrderStatusFilter>[] = [
    { value: "all", label: "Tous" },
    { value: OrderStatus.Draft, label: "Brouillon" },
    { value: OrderStatus.PendingPayment, label: "Paiement en cours" },
    { value: OrderStatus.Paid, label: "Payé" },
    { value: OrderStatus.Cancelled, label: "Annulé" }
];
