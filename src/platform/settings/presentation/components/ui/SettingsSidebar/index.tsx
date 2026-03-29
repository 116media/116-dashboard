import { Menu } from "antd";
import type { FC } from "react";
import {
    IconBellOutlined,
    IconLockOutlined,
    IconSettingOutlined,
    IconUserOutlined
} from "@/shared/presentation/ui/Icons";
import styles from "./index.module.scss";

export type SettingsTab = "profile" | "security" | "notification" | "account";

interface ISettingsSidebarProps {
    activeTab: SettingsTab;
    onChange: (tab: SettingsTab) => void;
}

const SETTINGS_TABS = [
    { key: "profile", label: "Profil", icon: <IconUserOutlined /> },
    { key: "security", label: "Sécurité", icon: <IconLockOutlined /> },
    { key: "notification", label: "Notifications", icon: <IconBellOutlined /> },
    { key: "account", label: "Compte", icon: <IconSettingOutlined /> }
];

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
