import type { IStatusOption } from "@/shared/domain/types/pagination";
import { EnumOrderStatus } from "@/shared/infrastructure/api/generated/116.api";

/**
 * Status filter values for the orders list.
 */
export type OrderStatusFilter = "all" | EnumOrderStatus;

/**
 * Status filter options for the orders table toolbar.
 *
 * @description
 * Module-specific options with French labels. Passed to the
 * generic `TableStatusFilter` / `TableToolbar` components.
 */
export const ORDER_STATUS_OPTIONS: IStatusOption<OrderStatusFilter>[] = [
    { value: "all", label: "Tous" },
    { value: EnumOrderStatus.Draft, label: "Brouillon" },
    { value: EnumOrderStatus.PendingPayment, label: "Paiement en cours" },
    { value: EnumOrderStatus.Paid, label: "Payé" },
    { value: EnumOrderStatus.Cancelled, label: "Annulé" }
];
