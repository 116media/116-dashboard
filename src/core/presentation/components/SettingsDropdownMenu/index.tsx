import { Avatar, Badge, Button, Divider, Flex, Tag, Typography } from "antd";
import type { FC } from "react";
import { useNavigate } from "react-router";
import { persistor, useAppSelector } from "@/core/presentation/store/store";
import { AuthStorageService } from "@/modules/auth/infrastructure/storage/authstorage.service";
import { LOGIN_PATH, SETTING_PATH } from "@/shared/lib/constants/paths";
import {
    IconBellOutlined,
    IconLockOutlined,
    IconLogoutOutlined,
    IconUserOutlined
} from "@/shared/ui/Icons";

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

    //TODO: should make a backend request for logout
    const handleLogout = () => {
        AuthStorageService.clearToken();
        persistor.purge();
        navigate(LOGIN_PATH, { replace: true });
    };

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

                <div className={styles.settingsDropdownMenu__role}>
                    <Tag
                        variant="outlined"
                        className={styles.settingsDropdownMenu__role}
                        onClick={() => navigate(SETTING_PATH)}
                    >
                        {user?.roles?.[0]?.name}
                    </Tag>

                    {user?.roles?.length >= 1 && (
                        <Badge
                            size="small"
                            color="volcano"
                            offset={[-6, -20]}
                            count={user.roles.length}
                        />
                    )}
                </div>
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
                onClick={handleLogout}
                icon={<IconLogoutOutlined />}
                className={styles.settingsDropdownMenu__menuItem__danger}
            >
                Déconnexion
            </Button>
        </div>
    );
};
