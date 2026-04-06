import { Badge, Breadcrumb, Button, Flex, Layout } from "antd";
import type { FC } from "react";
import { useLocation } from "react-router";
import { NAVIGATION_ITEMS } from "@/shared/infrastructure/constants/navigation";
import { OVERVIEW_PATH } from "@/shared/infrastructure/constants/paths";
import { IconBellFilled, IconHomeFilled, IconMenuOutlined } from "@/shared/presentation/ui/Icons";

import styles from "./index.module.scss";

const { Header } = Layout;

/**
 * Props for the Navbar component.
 *
 * @interface INavbarProps
 * @property {boolean} sidebarCollapsed - Whether the ActivityPanel is currently collapsed
 * @property {() => void} onToggleSidebar - Callback to toggle the ActivityPanel visibility
 */
interface INavbarProps {
    onToggleSidebar: () => void;
}

/**
 * Top navigation bar with hamburger toggle, breadcrumb navigation, and notification icon.
 *
 * @component
 *
 * @description
 * Derives breadcrumb items from the current route by matching against
 * NAVIGATION_ITEMS. Always shows a home icon as root crumb, followed by
 * the current page label. Includes a hamburger menu button to toggle the
 * ActivityPanel and a notification bell icon.
 *
 * @returns The navbar header
 */
export const Navbar: FC<INavbarProps> = ({ onToggleSidebar }) => {
    const location = useLocation();

    const currentNav = NAVIGATION_ITEMS.find((item) => location.pathname.startsWith(item.path));

    const breadcrumbItems = [
        {
            href: OVERVIEW_PATH,
            title: (
                <Flex align="center" component="span">
                    <IconHomeFilled />
                </Flex>
            )
        },
        ...(currentNav
            ? [
                  {
                      title: (
                          <Flex align="center" gap={4} component="span">
                              {currentNav.label}
                          </Flex>
                      )
                  }
              ]
            : [])
    ];

    return (
        <Header className={styles.navbar}>
            <Flex align="center" justify="space-between" style={{ height: "100%" }}>
                <Flex align="center" gap={12}>
                    <Button
                        type="text"
                        htmlType="button"
                        onClick={onToggleSidebar}
                        aria-label="Basculer le panneau latéral"
                        icon={<IconMenuOutlined />}
                    />

                    <Breadcrumb items={breadcrumbItems} className={styles.navbar__breadcrumbs} />
                </Flex>

                <Badge count={3} size="small" offset={[-6, 6]}>
                    <Button type="text" icon={<IconBellFilled />} />
                </Badge>
            </Flex>
        </Header>
    );
};
