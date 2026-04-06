import type { FC } from "react";
import {
    IconCommentOutlined,
    IconDesktopOutlined,
    IconFileTextOutlined,
    IconFireFilled,
    IconHomeFilled,
    IconSettingOutlined,
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
 */
export interface INavigationItem {
    path: string;
    label: string;
    icon: FC;
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
    { path: CONTENT_PATH, label: "Contenus", icon: IconDesktopOutlined },
    { path: VIDEO_PATH, label: "Vidéos", icon: IconVideoCameraFilled },
    { path: ARTICLE_PATH, label: "Articles", icon: IconFileTextOutlined },
    { path: ADS_BANNER_PATH, label: "Bannières", icon: IconFireFilled },
    { path: ADS_POPUP_PATH, label: "Popups", icon: IconCommentOutlined },
    { path: ADMIN_PATH, label: "Administrateurs", icon: IconUserAddOutlined },
    { path: USER_PATH, label: "Utilisateurs", icon: IconUserOutlined },
    { path: SETTING_PATH, label: "Paramètres", icon: IconSettingOutlined }
];
