import { BellOutlined, LockOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import type { FC } from "react";
import styles from "./index.module.scss";

export type SettingsTab = "profile" | "security" | "notification" | "account";

interface ISettingsSidebarProps {
    activeTab: SettingsTab;
    onChange: (tab: SettingsTab) => void;
}

const SETTINGS_TABS = [
    { key: "profile", label: "Profil", icon: <UserOutlined /> },
    { key: "security", label: "Sécurité", icon: <LockOutlined /> },
    { key: "notification", label: "Notifications", icon: <BellOutlined /> },
    { key: "account", label: "Compte", icon: <SettingOutlined /> }
];

const SettingsSidebar: FC<ISettingsSidebarProps> = ({ activeTab, onChange }) => {
    return (
        <div className={styles.sidebar}>
            <Menu
                mode="inline"
                selectedKeys={[activeTab]}
                items={SETTINGS_TABS}
                onClick={({ key }) => onChange(key as SettingsTab)}
            />
        </div>
    );
};

export default SettingsSidebar;
