import type { IOrderSummaryEntity } from "@/modules/commerce/domain/entities/IOrderSummaryEntity";

/**
 * Available action types for an order record.
 */
export type OrderAction = "view" | "addItem" | "submit" | "cancel";

interface IOrderDropdownItem {
    key: OrderAction;
    label: string;
    danger?: boolean;
    hidden: (
        record: IOrderSummaryEntity,
        isSuperAdmin: boolean,
        isAdminOrSuperAdmin: boolean
    ) => boolean;
}

/**
 * Dropdown menu items for the orders table actions column.
 *
 * @description
 * Static configuration for each action's label, danger state,
 * and visibility logic. The `onClick` handler is wired at
 * render time in the columns definition.
 *
 * @remarks
 * - "view" is always visible.
 * - "addItem" and "submit" are only visible for Draft orders.
 * - "cancel" is hidden for Paid and Cancelled orders.
 */
export const ORDER_DROPDOWN_ITEMS: IOrderDropdownItem[] = [
    {
        key: "view",
        label: "Voir détails",
        hidden: () => false
    },
    {
        key: "addItem",
        label: "Ajouter un produit",
        hidden: (record) => record.status !== "Draft"
    },
    {
        key: "submit",
        label: "Soumettre",
        hidden: (record) => record.status !== "Draft"
    },
    {
        key: "cancel",
        label: "Annuler",
        danger: true,
        hidden: (record) => record.status === "Paid" || record.status === "Cancelled"
    }
];
