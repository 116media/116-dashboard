import { Layout } from "antd";
import { type FC, Suspense, useState } from "react";
import { Outlet } from "react-router";
import { PageLoader } from "@/shared/ui/PageLoader";
import { ActivityPanel } from "./ActivityPanel";
import styles from "./index.module.scss";
import { Navbar } from "./Navbar";
import { SideNav } from "./SideNav";

/**
 * Main dashboard layout shell for all authenticated pages.
 *
 * @component
 *
 * @description
 * Composes the three structural regions of the dashboard:
 * - SideNav: narrow icon-only navigation on the far left
 * - ActivityPanel: collapsible contextual panel with user info and widgets
 * - Navbar + Content: page title bar and routed page content
 *
 * Manages the ActivityPanel collapsed state, toggled via the Navbar hamburger menu.
 * Child routes render inside Layout.Content via Outlet.
 *
 * @returns The dashboard layout shell
 */
export const DashboardLayout: FC = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);

    return (
        <Layout className={styles.dashboardLayout}>
            <SideNav />
            <ActivityPanel collapsed={sidebarCollapsed} />
            <Layout>
                <Navbar onToggleSidebar={toggleSidebar} />
                <Layout.Content className={styles.dashboardLayout__content}>
                    <Suspense fallback={<PageLoader />}>
                        <Outlet />
                    </Suspense>
                </Layout.Content>
            </Layout>
        </Layout>
    );
};
