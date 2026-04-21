import type { FC } from "react";
import {
    IconCommentOutlined,
    IconDesktopOutlined,
    IconFileTextOutlined,
    IconFireFilled,
    IconHomeFilled,
    IconSafetyOutlined,
    IconSettingOutlined,
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
    CONTENT_PATH,
    OVERVIEW_PATH,
    PERMISSIONS_PATH,
    ROLES_PATH,
    SETTING_PATH,
    USER_PATH,
    VIDEO_PATH
} from "./paths";

/**
 * Navigation item configuration.
 *
 * @interface INavigationItem
 * @property {string} path - Route path matching a constant from paths.ts
 * @property {string} label - French display label (used in SideNav tooltips and Navbar title)
 * @property {FC} icon - Icon component from shared/ui/Icons
 * @property {{ resource: string; action: string }} [permission] - Required permission to show this item
 */
export interface INavigationItem {
    icon: FC;
    path: string;
    label: string;
    permission?: { resource: string; action: string };
}

/**
 * Main navigation items for the dashboard SideNav.
 *
 * @description
 * Ordered list of navigation entries rendered in the SideNav.
 * Each item maps a route path to its French label and icon.
 * Used by both SideNav (tooltips + active state) and Navbar (page title).
 */
export const NAVIGATION_ITEMS: INavigationItem[] = [
    { path: OVERVIEW_PATH, label: "Accueil", icon: IconHomeFilled },
    {
        label: "Contenus",
        path: CONTENT_PATH,
        icon: IconDesktopOutlined,
        permission: { resource: "contents", action: "read" }
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
        icon: IconFileTextOutlined,
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
