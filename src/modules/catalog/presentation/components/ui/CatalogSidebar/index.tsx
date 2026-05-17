import { Menu } from "antd";
import type { FC } from "react";
import {
    IconFolderOutlined,
    IconInboxOutlined,
    IconTeamOutlined
} from "@/shared/presentation/ui/Icons";
import styles from "./index.module.scss";

/**
 * Available tab keys for the catalog sidebar navigation.
 */
export type CatalogTab = "categories" | "customers" | "packages";

interface ICatalogSidebarProps {
    activeTab: CatalogTab;
    onChange: (tab: CatalogTab) => void;
}

const CATALOG_TABS = [
    { key: "categories", label: "Catégories", icon: <IconFolderOutlined /> },
    { key: "customers", label: "Clients", icon: <IconTeamOutlined /> },
    { key: "packages", label: "Packages", icon: <IconInboxOutlined /> }
];

const CatalogSidebar: FC<ICatalogSidebarProps> = ({ activeTab, onChange }) => {
    return (
        <div className={styles.sidebar}>
            <Menu
                mode="vertical"
                items={CATALOG_TABS}
                selectedKeys={[activeTab]}
                onClick={({ key }) => onChange(key as CatalogTab)}
            />
        </div>
    );
};

export default CatalogSidebar;
