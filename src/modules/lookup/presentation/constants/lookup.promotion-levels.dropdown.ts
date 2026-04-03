import type { IPromotionLevelEntity } from "@/modules/lookup/domain/entities/IPromotionLevelEntity";

/**
 * Available action types for a promotion level record.
 */
export type PromotionLevelAction = "edit" | "activate" | "deactivate";

interface IPromotionLevelDropdownItem {
    key: PromotionLevelAction;
    label: string;
    danger?: boolean;
    hidden: (record: IPromotionLevelEntity, isSuperAdmin: boolean) => boolean;
}

/**
 * Dropdown menu items for the promotion levels table actions column.
 *
 * @description
 * Static configuration for each action's label, danger state,
 * and visibility logic. The `onClick` handler is wired at
 * render time in the columns definition.
 *
 * @remarks
 * All mutations are restricted to SuperAdmin only.
 */
export const PROMOTION_LEVEL_DROPDOWN_ITEMS: IPromotionLevelDropdownItem[] = [
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
