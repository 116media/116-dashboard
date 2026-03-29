import { Avatar, Button, Divider, Flex, Typography } from "antd";
import type { FC } from "react";
import { useNavigate } from "react-router";
import { useSignOut } from "@/modules/auth/presentation/hooks/UseSignOut";
import { SETTING_PATH } from "@/shared/infrastructure/constants/paths";
import { useAppSelector } from "@/shared/presentation/store/store";
import {
    IconBellOutlined,
    IconLockOutlined,
    IconLogoutOutlined,
    IconUserOutlined
} from "@/shared/presentation/ui/Icons";
import RoleBadge from "@/shared/presentation/ui/RoleBadge";

import styles from "./index.module.scss";

const { Text } = Typography;

/**
 * User menu items displayed in the settings dropdown.
 */
const USER_MENU_ITEMS = [
    { key: "profile", label: "Mon profil", icon: IconUserOutlined, path: SETTING_PATH },
    { key: "notifications", label: "Notifications", icon: IconBellOutlined, path: null },
    { key: "password", label: "Changer mot de passe", icon: IconLockOutlined, path: null }
];

/**
 * Dropdown menu for user settings, displayed in the side navigation popover.
 *
 * @component
 *
 * @description
 * Renders user profile info, navigation menu items, and a logout button.
 *
 * @returns The settings dropdown menu
 */
export const SettingsDropdownMenu: FC = () => {
    const navigate = useNavigate();
    const user = useAppSelector(({ auth: { login } }) => login.data?.user);
    const { loading, onSignOut } = useSignOut();

    const handleMenuClick = (path: string | null) => {
        if (path) navigate(path);
    };

    return (
        <div className={styles.settingsDropdownMenu}>
            <Flex vertical align="center" gap={2} className={styles.settingsDropdownMenu__header}>
                <Avatar
                    size={48}
                    src={user?.avatar?.storageUrl}
                    icon={!user?.avatar?.storageUrl && <IconUserOutlined />}
                />
                <Text strong ellipsis>
                    {user?.userName}
                </Text>
                <Text type="secondary">{user?.email}</Text>

                {user?.roles && (
                    <RoleBadge roles={user.roles} onClick={() => navigate(SETTING_PATH)} />
                )}
            </Flex>

            <Divider size="small" />

            <Flex vertical gap={2}>
                {USER_MENU_ITEMS.map(({ key, label, icon: Icon, path }) => (
                    <Button
                        key={key}
                        type="text"
                        icon={<Icon />}
                        onClick={() => handleMenuClick(path)}
                        className={styles.settingsDropdownMenu__menuItem}
                    >
                        {label}
                    </Button>
                ))}
            </Flex>

            <Divider size="small" />

            <Button
                block
                type="text"
                loading={loading}
                onClick={onSignOut}
                icon={<IconLogoutOutlined />}
                className={styles.settingsDropdownMenu__menuItem__danger}
            >
                Déconnexion
            </Button>
        </div>
    );
};
