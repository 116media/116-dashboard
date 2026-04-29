import type { FC } from "react";
import { useNavigate, useParams } from "react-router";
import CatalogSidebar, {
    type CatalogTab
} from "@/modules/catalog/presentation/components/ui/CatalogSidebar";
import CategoriesListContainer from "@/modules/catalog/presentation/containers/CategoriesListContainer";
import CustomersListContainer from "@/modules/catalog/presentation/containers/CustomersListContainer";
import PackagesListContainer from "@/modules/catalog/presentation/containers/PackagesListContainer";
import { APP_NAME } from "@/shared/infrastructure/constants/common";
import { CATALOG_PATH } from "@/shared/presentation/constants/paths";
import styles from "./index.module.scss";

const containerMap: Record<CatalogTab, FC> = {
    categories: CategoriesListContainer,
    customers: CustomersListContainer,
    packages: PackagesListContainer
};

const VALID_TABS: CatalogTab[] = ["categories", "customers", "packages"];

const TAB_LABELS: Record<CatalogTab, string> = {
    categories: "Catégories",
    customers: "Clients",
    packages: "Packages"
};

/**
 * Main catalog page with URL-driven tab navigation.
 *
 * @component
 *
 * @description
 * Reads the active tab from the URL param (`/catalog/:tab`).
 * Defaults to "categories" if the param is missing or invalid.
 * Sidebar clicks update the URL, keeping browser history in sync.
 */
const CatalogPage: FC = () => {
    const { tab } = useParams<{ tab: string }>();
    const navigate = useNavigate();

    const activeTab: CatalogTab = VALID_TABS.includes(tab as CatalogTab)
        ? (tab as CatalogTab)
        : "categories";

    const handleTabChange = (newTab: CatalogTab) => {
        navigate(`${CATALOG_PATH}/${newTab}`, { replace: true });
    };

    const ActiveContainer = containerMap[activeTab];

    return (
        <div className={styles.page}>
            <title>{`Catalogue - ${TAB_LABELS[activeTab]} | ${APP_NAME}`}</title>

            <CatalogSidebar activeTab={activeTab} onChange={handleTabChange} />
            <div className={styles.page__content}>
                <ActiveContainer />
            </div>
        </div>
    );
};

export default CatalogPage;
