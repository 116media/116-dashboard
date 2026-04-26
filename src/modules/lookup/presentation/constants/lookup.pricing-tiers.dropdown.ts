import type { IPricingTierEntity } from "@/modules/lookup/domain/entities/IPricingTierEntity";

/**
 * Available action types for a pricing tier record.
 */
export type PricingTierAction = "edit" | "activate" | "deactivate";

interface IPricingTierDropdownItem {
    key: PricingTierAction;
    label: string;
    danger?: boolean;
    hidden: (record: IPricingTierEntity, isSuperAdmin: boolean) => boolean;
}

/**
 * Dropdown menu items for the pricing tiers table actions column.
 *
 * @description
 * Static configuration for each action's label, danger state,
 * and visibility logic. The `onClick` handler is wired at
 * render time in the columns definition.
 *
 * @remarks
 * All mutations are restricted to SuperAdmin only.
 */
export const PRICING_TIER_DROPDOWN_ITEMS: IPricingTierDropdownItem[] = [
    {
        key: "edit",
        label: "Modifier",
        hidden: (_, isSuperAdmin) => !isSuperAdmin
    },
    {
        key: "activate",
        label: "Activer",
        hidden: (record, isSuperAdmin) => !isSuperAdmin || record.isActive
    },
    {
        key: "deactivate",
        label: "Désactiver",
        hidden: (record, isSuperAdmin) => !isSuperAdmin || !record.isActive
    }
];
