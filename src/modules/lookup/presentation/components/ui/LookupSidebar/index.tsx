import { Menu } from "antd";
import type { FC } from "react";
import {
    IconAppstoreOutlined,
    IconDollarOutlined,
    IconStarOutlined,
    IconTagOutlined
} from "@/shared/presentation/ui/Icons";
import styles from "./index.module.scss";

/** Available tab keys for the lookup sidebar navigation. */
export type LookupTab = "content-types" | "pricing-tiers" | "promotion-levels" | "tags";

/**
 * Props for the LookupSidebar component.
 *
 * @interface ILookupSidebarProps
 * @property {LookupTab} activeTab - The currently selected tab
 * @property {(tab: LookupTab) => void} onChange - Callback when a tab is selected
 */
interface ILookupSidebarProps {
    activeTab: LookupTab;
    onChange: (tab: LookupTab) => void;
}

/** Tab definitions for the lookup sidebar menu. */
const LOOKUP_TABS = [
    { key: "content-types", label: "Types de contenu", icon: <IconAppstoreOutlined /> },
    { key: "pricing-tiers", label: "Niveaux tarifaires", icon: <IconDollarOutlined /> },
    { key: "promotion-levels", label: "Promotions", icon: <IconStarOutlined /> },
    { key: "tags", label: "Tags", icon: <IconTagOutlined /> }
];

/**
 * Vertical sidebar navigation for the lookup page.
 *
 * @component
 *
 * @description
 * Renders an Ant Design Menu with four tabs: Content Types,
 * Pricing Tiers, Promotion Levels, and Tags. Highlights the
 * active tab and notifies the parent on selection change.
 */
const LookupSidebar: FC<ILookupSidebarProps> = ({ activeTab, onChange }) => {
    return (
        <div className={styles.sidebar}>
            <Menu
                mode="vertical"
                items={LOOKUP_TABS}
                selectedKeys={[activeTab]}
                onClick={({ key }) => onChange(key as LookupTab)}
            />
        </div>
    );
};

export default LookupSidebar;
