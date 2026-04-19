import type { FC } from "react";
import {
    IconAppstoreOutlined,
    IconCommentOutlined,
    IconCreditCardOutlined,
    IconDollarOutlined,
    IconEditFilled,
    IconFireFilled,
    IconFolderOutlined,
    IconGroupOutlined,
    IconHomeFilled,
    IconInboxOutlined,
    IconNotificationOutlined,
    IconOrderedListOutlined,
    IconPlaySquareOutlined,
    IconReadOutlined,
    IconSafetyOutlined,
    IconSettingOutlined,
    IconShopOutlined,
    IconShoppingCartOutlined,
    IconSoundOutlined,
    IconStarOutlined,
    IconTagOutlined,
    IconTeamOutlined,
    IconUnlockOutlined,
    IconUserAddOutlined,
    IconUserOutlined,
    IconVideoCameraFilled
} from "@/shared/presentation/ui/Icons";
import {
    ADMIN_PATH,
    ADS_BANNER_PATH,
    ADS_PATH,
    ADS_POPUP_PATH,
    ARTICLE_PATH,
    CATALOG_PATH,
    CATEGORIES_PATH,
    CONTENT_TYPES_PATH,
    CUSTOMERS_PATH,
    LYRICS_PATH,
    ORDERS_PATH,
    OVERVIEW_PATH,
    PACKAGES_PATH,
    PAYMENTS_PATH,
    PERMISSIONS_PATH,
    PRICING_TIERS_PATH,
    PROMOTION_LEVELS_PATH,
    REFERENCES_PATH,
    ROLES_PATH,
    SETTING_PATH,
    SHORTS_PATH,
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
 *
 * Groups: Références, Catalogue, Édition, Ventes, Publicité
 * Standalone: Accueil, Admins, Utilisateurs, Rôles, Permissions, Paramètres
 */
export const NAVIGATION_ITEMS: INavigationItem[] = [
    { path: OVERVIEW_PATH, label: "Accueil", icon: IconHomeFilled },

    // Références (Lookup)
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

    // Catalogue (Catalog)
    {
        path: CATALOG_PATH,
        label: "Catalogue",
        icon: IconShopOutlined,
        children: [
            {
                path: CATEGORIES_PATH,
                label: "Catégories",
                icon: IconFolderOutlined,
                permission: { resource: "categories", action: "read" }
            },
            {
                path: CUSTOMERS_PATH,
                label: "Clients",
                icon: IconTeamOutlined,
                permission: { resource: "customers", action: "read" }
            },
            {
                path: PACKAGES_PATH,
                label: "Packages",
                icon: IconInboxOutlined,
                permission: { resource: "packages", action: "read" }
            }
        ]
    },

    // Édition (Editorial)
    {
        path: ARTICLE_PATH,
        label: "Édition",
        icon: IconEditFilled,
        children: [
            {
                path: ARTICLE_PATH,
                label: "Articles",
                icon: IconReadOutlined,
                permission: { resource: "articles", action: "read" }
            },
            {
                path: VIDEO_PATH,
                label: "Vidéos",
                icon: IconVideoCameraFilled,
                permission: { resource: "videos", action: "read" }
            },
            {
                path: SHORTS_PATH,
                label: "Réels",
                icon: IconPlaySquareOutlined,
                permission: { resource: "shorts", action: "read" }
            },
            {
                path: LYRICS_PATH,
                label: "Paroles",
                icon: IconSoundOutlined,
                permission: { resource: "lyrics", action: "read" }
            }
        ]
    },

    // Ventes (Commerce)
    {
        path: ORDERS_PATH,
        label: "Ventes",
        icon: IconShoppingCartOutlined,
        children: [
            {
                path: ORDERS_PATH,
                label: "Commandes",
                icon: IconOrderedListOutlined,
                permission: { resource: "orders", action: "read" }
            },
            {
                path: PAYMENTS_PATH,
                label: "Paiements",
                icon: IconCreditCardOutlined,
                permission: { resource: "payments", action: "read" }
            }
        ]
    },

    // Publicité (Ads)
    {
        path: ADS_PATH,
        label: "Publicité",
        icon: IconNotificationOutlined,
        children: [
            {
                path: ADS_BANNER_PATH,
                label: "Bannières",
                icon: IconFireFilled,
                permission: { resource: "ads", action: "read" }
            },
            {
                path: ADS_POPUP_PATH,
                label: "Popups",
                icon: IconCommentOutlined,
                permission: { resource: "ads", action: "read" }
            }
        ]
    },

    // Standalone items
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
