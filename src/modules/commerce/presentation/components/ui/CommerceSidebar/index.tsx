import { Menu } from "antd";
import type { FC } from "react";
import { IconCreditCardOutlined, IconOrderedListOutlined } from "@/shared/presentation/ui/Icons";
import styles from "./index.module.scss";

/**
 * Available tab keys for the commerce sidebar navigation.
 *
 * @description
 * Union type representing the valid tab values for URL-driven
 * navigation within the commerce module.
 */
export type CommerceTab = "orders" | "payments";

/**
 * Props for the CommerceSidebar component.
 *
 * @interface ICommerceSidebarProps
 *
 * @property {CommerceTab} activeTab - Currently selected tab key
 * @property {(tab: CommerceTab) => void} onChange - Tab change handler
 */
interface ICommerceSidebarProps {
    activeTab: CommerceTab;
    onChange: (tab: CommerceTab) => void;
}

/**
 * Static tab configuration for the commerce sidebar menu.
 */
const COMMERCE_TABS = [
    { key: "orders", label: "Commandes", icon: <IconOrderedListOutlined /> },
    { key: "payments", label: "Paiements", icon: <IconCreditCardOutlined /> }
];

/**
 * Sidebar navigation for the commerce module.
 *
 * @component
 *
 * @description
 * Renders a vertical Ant Design Menu with commerce tab options.
 * Highlights the active tab and invokes `onChange` when the user
 * selects a different tab.
 *
 * @param {ICommerceSidebarProps} props - Component props
 * @returns {JSX.Element} The commerce sidebar menu
 */
const CommerceSidebar: FC<ICommerceSidebarProps> = ({ activeTab, onChange }) => {
    return (
        <div className={styles.sidebar}>
            <Menu
                mode="vertical"
                items={COMMERCE_TABS}
                selectedKeys={[activeTab]}
                onClick={({ key }) => onChange(key as CommerceTab)}
            />
        </div>
    );
};

export default CommerceSidebar;
