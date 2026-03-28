import { Avatar, Button, Flex, Layout, Popover, Tooltip } from "antd";
import type { FC } from "react";
import { useLocation, useNavigate } from "react-router";
import { SettingsDropdownMenu } from "@/core/presentation/components/SettingsDropdownMenu";
import { useAppSelector } from "@/core/presentation/store/store";
import { NAVIGATION_ITEMS } from "@/shared/lib/constants/navigation";
import { IconUserOutlined } from "@/shared/ui/Icons";
import { Logo } from "@/shared/ui/Logo";

import styles from "./index.module.scss";

const { Sider } = Layout;

/**
 * Narrow icon-only navigation rail on the far left of the dashboard.
 *
 * @component
 *
 * @description
 * Renders a vertical strip with:
 * - App logo at the top
 * - Navigation icons with tooltips showing the French route label on hover
 * - Active route highlighting
 * - User avatar at the bottom opening a popover with profile info, menu, and logout
 *
 * @returns The side navigation
 */
export const SideNav: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useAppSelector(({ auth: { login } }) => login.data?.user);

    return (
        <Sider width={56} className={styles.sideNav}>
            <Flex vertical align="center" justify="space-between" className={styles.sideNav__inner}>
                <Flex vertical align="center" gap={8}>
                    <Logo className={styles.sideNav__logo} canRedirect />

                    <Flex vertical align="center" gap={4} className={styles.sideNav__nav}>
                        {NAVIGATION_ITEMS.map(({ path, label, icon: Icon }) => {
                            const isActive = location.pathname.startsWith(path);

                            return (
                                <Tooltip key={path} title={label} placement="right">
                                    <Button
                                        size="large"
                                        icon={<Icon />}
                                        onClick={() => navigate(path)}
                                        type={isActive ? "primary" : "text"}
                                        className={`${styles.sideNav__item} ${isActive ? styles["sideNav__item--active"] : ""}`}
                                    />
                                </Tooltip>
                            );
                        })}
                    </Flex>
                </Flex>

                <Popover
                    arrow
                    trigger="click"
                    placement="rightBottom"
                    content={<SettingsDropdownMenu />}
                >
                    <Button
                        type="text"
                        className={styles.sideNav__avatar}
                        icon={
                            <Avatar
                                size={36}
                                src={user?.avatar?.storageUrl}
                                icon={!user?.avatar?.storageUrl && <IconUserOutlined />}
                            />
                        }
                    />
                </Popover>
            </Flex>
        </Sider>
    );
};
