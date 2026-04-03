import { Avatar, Button, Flex, Layout, Popover, Tooltip } from "antd";
import { type FC, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuthorization } from "@/modules/auth/presentation/hooks/UseAuthorization";
import { type INavigationItem, NAVIGATION_ITEMS } from "@/shared/presentation/constants/navigation";
import NavPopoverMenu from "@/shared/presentation/layouts/DashboardLayout/NavPopoverMenu";
import { SettingsDropdownMenu } from "@/shared/presentation/layouts/DashboardLayout/SettingsDropdownMenu";
import { useAppSelector } from "@/shared/presentation/store/store";
import { IconUserOutlined } from "@/shared/presentation/ui/Icons";
import { Logo } from "@/shared/presentation/ui/Logo";

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
 * - Navigation icons with tooltips or NavPopoverMenu
 * - Items with `children` delegate to `NavPopoverMenu`
 * - Items without `children` navigate directly with a tooltip
 * - Active route highlighting
 * - User avatar at the bottom
 *
 * @returns The side navigation
 */
export const SideNav: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { hasPermission } = useAuthorization();
    const user = useAppSelector(({ session: { currentUser } }) => currentUser.data);

    const visibleItems = useMemo(
        () => NAVIGATION_ITEMS.filter((item) => !item.permission || hasPermission(item.permission)),
        [hasPermission]
    );

    const getIsActive = (item: INavigationItem) =>
        item.children
            ? item.children.some((child) => location.pathname.startsWith(child.path))
            : location.pathname.startsWith(item.path);

    return (
        <Sider width={56} className={styles.sideNav}>
            <Flex vertical align="center" justify="space-between" className={styles.sideNav__inner}>
                <Flex vertical align="center" gap={8}>
                    <Logo className={styles.sideNav__logo} canRedirect />

                    <Flex vertical align="center" gap={4} className={styles.sideNav__nav}>
                        {visibleItems.map((item) => {
                            const { path, label, icon: Icon, children } = item;
                            const isActive = getIsActive(item);
                            const btnClass = `${styles.sideNav__item} ${isActive ? styles.sideNav__item__active : ""}`;

                            if (children) {
                                const visibleChildren = children.filter(
                                    (child) => !child.permission || hasPermission(child.permission)
                                );

                                if (visibleChildren.length === 0) return null;

                                return (
                                    <NavPopoverMenu
                                        key={path}
                                        icon={Icon}
                                        label={label}
                                        isActive={isActive}
                                        className={btnClass}
                                        items={visibleChildren}
                                    />
                                );
                            }

                            return (
                                <Tooltip key={path} title={label} placement="right">
                                    <Button
                                        size="large"
                                        icon={<Icon />}
                                        onClick={() => navigate(path)}
                                        type={isActive ? "primary" : "text"}
                                        className={btnClass}
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
