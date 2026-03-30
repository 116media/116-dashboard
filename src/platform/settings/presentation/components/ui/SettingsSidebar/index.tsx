import { Menu } from "antd";
import type { FC } from "react";
import {
    IconBellOutlined,
    IconLockOutlined,
    IconSettingOutlined,
    IconUserOutlined
} from "@/shared/presentation/ui/Icons";
import styles from "./index.module.scss";

/** Available tab keys for the settings sidebar navigation. */
export type SettingsTab = "profile" | "security" | "notification" | "account";

/**
 * Props for the SettingsSidebar component.
 *
 * @interface ISettingsSidebarProps
 * @property {SettingsTab} activeTab - The currently selected tab
 * @property {(tab: SettingsTab) => void} onChange - Callback when a tab is selected
 */
interface ISettingsSidebarProps {
    activeTab: SettingsTab;
    onChange: (tab: SettingsTab) => void;
}

/** Tab definitions for the settings sidebar menu. */
const SETTINGS_TABS = [
    { key: "profile", label: "Profil", icon: <IconUserOutlined /> },
    { key: "security", label: "Sécurité", icon: <IconLockOutlined /> },
    { key: "notification", label: "Notifications", icon: <IconBellOutlined /> },
    { key: "account", label: "Compte", icon: <IconSettingOutlined /> }
];

/**
 * Vertical sidebar navigation for the settings page.
 *
 * @component
 *
 * @description
 * Renders an Ant Design Menu with four tabs: Profile, Security,
 * Notifications, and Account. Highlights the active tab and
 * notifies the parent on selection change.
 */
const SettingsSidebar: FC<ISettingsSidebarProps> = ({ activeTab, onChange }) => {
    return (
        <div className={styles.sidebar}>
            <Menu
                mode="vertical"
                selectedKeys={[activeTab]}
                items={SETTINGS_TABS}
                onClick={({ key }) => onChange(key as SettingsTab)}
            />
        </div>
    );
};

export default SettingsSidebar;
