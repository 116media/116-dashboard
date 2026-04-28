import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";

/**
 * Available action types for a customer record.
 */
export type CustomerAction = "edit";

interface ICustomerDropdownItem {
    key: CustomerAction;
    label: string;
    danger?: boolean;
    hidden: (
        record: ICustomerEntity,
        isSuperAdmin: boolean,
        isAdminOrSuperAdmin: boolean
    ) => boolean;
}

/**
 * Dropdown menu items for the customers table actions column.
 *
 * @description
 * Static configuration for each action's label, danger state,
 * and visibility logic. The `onClick` handler is wired at
 * render time in the columns definition.
 *
 * @remarks
 * - "edit" is available to Admin and SuperAdmin.
 */
export const CUSTOMER_DROPDOWN_ITEMS: ICustomerDropdownItem[] = [
    {
        key: "edit",
        label: "Modifier",
        hidden: (_, _isSuperAdmin, isAdminOrSuperAdmin) => !isAdminOrSuperAdmin
    }
];
