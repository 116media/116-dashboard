import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";

/**
 * Available action types for a category record.
 */
export type CategoryAction =
    | "edit"
    | "activate"
    | "deactivate"
    | "managePricing"
    | "setExclusive"
    | "pinToFeed"
    | "unpinFromFeed";

interface ICategoryDropdownItem {
    key: CategoryAction;
    label: string;
    danger?: boolean;
    hidden: (
        record: ICategoryEntity,
        isSuperAdmin: boolean,
        isAdminOrSuperAdmin: boolean
    ) => boolean;
}

/**
 * Dropdown menu items for the categories table actions column.
 *
 * @description
 * Static configuration for each action's label, danger state,
 * and visibility logic. The `onClick` handler is wired at
 * render time in the columns definition.
 *
 * @remarks
 * - "edit" is restricted to SuperAdmin only.
 * - "activate" and "deactivate" are available to Admin and SuperAdmin.
 * - "setExclusive" is SuperAdmin-only and limited to active video categories
 *   that are not already the exclusive show.
 * - "pinToFeed" is SuperAdmin-only and limited to active video categories that
 *   are not already pinned to the feed.
 * - "unpinFromFeed" is SuperAdmin-only and shown only for categories currently
 *   pinned to the feed.
 */
export const CATEGORY_DROPDOWN_ITEMS: ICategoryDropdownItem[] = [
    {
        key: "edit",
        label: "Modifier",
        hidden: (_, isSuperAdmin) => !isSuperAdmin
    },
    {
        key: "activate",
        label: "Activer",
        hidden: (record, _, isAdminOrSuperAdmin) => !isAdminOrSuperAdmin || record.isActive
    },
    {
        key: "setExclusive",
        label: "Mettre en exclusivité",
        hidden: (record, isSuperAdmin) =>
            !isSuperAdmin || !record.isVideoType || !record.isActive || record.isExclusive
    },
    {
        key: "pinToFeed",
        label: "Épingler au fil d'actualité",
        hidden: (record, isSuperAdmin) =>
            !isSuperAdmin || !record.isVideoType || !record.isActive || record.isPinnedToFeed
    },
    {
        key: "unpinFromFeed",
        label: "Détacher du fil d'actualité",
        danger: true,
        hidden: (record, isSuperAdmin) => !isSuperAdmin || !record.isPinnedToFeed
    },
    {
        key: "managePricing",
        label: "Gérer les tarifs",
        hidden: (record, isSuperAdmin) => !isSuperAdmin || record.isFree
    },
    {
        key: "deactivate",
        label: "Désactiver",
        danger: true,
        hidden: (record, _, isAdminOrSuperAdmin) => !isAdminOrSuperAdmin || !record.isActive
    }
];
