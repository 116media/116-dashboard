import type { FC } from "react";
import {
    IconAppstoreOutlined,
    IconCommentOutlined,
    IconDollarOutlined,
    IconFireFilled,
    IconGroupOutlined,
    IconHomeFilled,
    IconReadOutlined,
    IconSafetyOutlined,
    IconSettingOutlined,
    IconStarOutlined,
    IconTagOutlined,
    IconUnlockOutlined,
    IconUserAddOutlined,
    IconUserOutlined,
    IconVideoCameraFilled
} from "@/shared/presentation/ui/Icons";
import {
    ADMIN_PATH,
    ADS_BANNER_PATH,
    ADS_POPUP_PATH,
    ARTICLE_PATH,
    CONTENT_TYPES_PATH,
    OVERVIEW_PATH,
    PERMISSIONS_PATH,
    PRICING_TIERS_PATH,
    PROMOTION_LEVELS_PATH,
    REFERENCES_PATH,
    ROLES_PATH,
    SETTING_PATH,
    TAGS_PATH,
    USER_PATH,
    VIDEO_PATH
} from "./paths";

/**
 * Child navigation item for grouped SideNav entries.
 *
 * @interface INavigationChildItem
 * @property {string} path - Route path
 * @property {string} label - French display label
 * @property {FC} icon - Icon component
 * @property {{ resource: string; action: string }} [permission] - Required permission
 */
export interface INavigationChildItem {
    icon: FC;
    path: string;
    label: string;
    permission?: { resource: string; action: string };
}

/**
 * Navigation item configuration.
 *
 * @interface INavigationItem
 * @property {string} path - Route path matching a constant from paths.ts
 * @property {string} label - French display label (used in SideNav tooltips and Navbar title)
 * @property {FC} icon - Icon component from shared/ui/Icons
 * @property {{ resource: string; action: string }} [permission] - Required permission to show this item
 * @property {INavigationChildItem[]} [children] - Sub-items rendered in a Popover
 */
export interface INavigationItem {
    icon: FC;
    path: string;
    label: string;
    permission?: { resource: string; action: string };
    children?: INavigationChildItem[];
}

/**
 * Main navigation items for the dashboard SideNav.
 *
 * @description
 * Ordered list of navigation entries rendered in the SideNav.
 * Items with `children` render a Popover with sub-items on click.
 * Items without `children` render a direct navigation button with tooltip.
 */
export const NAVIGATION_ITEMS: INavigationItem[] = [
    { path: OVERVIEW_PATH, label: "Accueil", icon: IconHomeFilled },

    {
        path: REFERENCES_PATH,
        label: "Références",
        icon: IconGroupOutlined,
        children: [
            {
                path: CONTENT_TYPES_PATH,
                label: "Types de contenu",
                icon: IconAppstoreOutlined,
                permission: { resource: "content-types", action: "read" }
            },
            {
                path: PRICING_TIERS_PATH,
                label: "Niveaux tarifaires",
                icon: IconDollarOutlined,
                permission: { resource: "pricing-tiers", action: "read" }
            },
            {
                path: PROMOTION_LEVELS_PATH,
                label: "Promotions",
                icon: IconStarOutlined,
                permission: { resource: "promotion-levels", action: "read" }
            },
            {
                path: TAGS_PATH,
                label: "Tags",
                icon: IconTagOutlined,
                permission: { resource: "tags", action: "read" }
            }
        ]
    },

    {
        label: "Vidéos",
        path: VIDEO_PATH,
        icon: IconVideoCameraFilled,
        permission: { resource: "videos", action: "read" }
    },
    {
        label: "Articles",
        path: ARTICLE_PATH,
        icon: IconReadOutlined,
        permission: { resource: "articles", action: "read" }
    },
    {
        label: "Bannières",
        path: ADS_BANNER_PATH,
        icon: IconFireFilled,
        permission: { resource: "ads", action: "read" }
    },
    {
        label: "Popups",
        path: ADS_POPUP_PATH,
        icon: IconCommentOutlined,
        permission: { resource: "ads", action: "read" }
    },
    {
        path: ADMIN_PATH,
        label: "Administrateurs",
        icon: IconUserAddOutlined,
        permission: { resource: "admins", action: "read" }
    },
    {
        path: USER_PATH,
        label: "Utilisateurs",
        icon: IconUserOutlined,
        permission: { resource: "users", action: "read" }
    },
    {
        label: "Rôles",
        path: ROLES_PATH,
        icon: IconSafetyOutlined,
        permission: { resource: "roles", action: "read" }
    },
    {
        label: "Permissions",
        path: PERMISSIONS_PATH,
        icon: IconUnlockOutlined,
        permission: { resource: "permissions", action: "read" }
    },
    { path: SETTING_PATH, label: "Paramètres", icon: IconSettingOutlined }
];
