import type { FC } from "react";
import { useNavigate, useParams } from "react-router";
import LookupSidebar, {
    type LookupTab
} from "@/modules/lookup/presentation/components/ui/LookupSidebar";
import ContentTypesListContainer from "@/modules/lookup/presentation/containers/ContentTypesListContainer";
import PricingTiersListContainer from "@/modules/lookup/presentation/containers/PricingTiersListContainer";
import PromotionLevelsListContainer from "@/modules/lookup/presentation/containers/PromotionLevelsListContainer";
import TagsListContainer from "@/modules/lookup/presentation/containers/TagsListContainer";
import { APP_NAME } from "@/shared/infrastructure/constants/common";
import { REFERENCES_PATH } from "@/shared/presentation/constants/paths";
import styles from "./index.module.scss";

const containerMap: Record<LookupTab, FC> = {
    "content-types": ContentTypesListContainer,
    "pricing-tiers": PricingTiersListContainer,
    "promotion-levels": PromotionLevelsListContainer,
    tags: TagsListContainer
};

const VALID_TABS: LookupTab[] = ["content-types", "pricing-tiers", "promotion-levels", "tags"];

const TAB_LABELS: Record<LookupTab, string> = {
    "content-types": "Types de contenu",
    "pricing-tiers": "Niveaux tarifaires",
    "promotion-levels": "Promotions",
    tags: "Tags"
};

/**
 * Main lookup page with URL-driven tab navigation.
 *
 * @component
 *
 * @description
 * Reads the active tab from the URL param (`/references/:tab`).
 * Defaults to "content-types" if the param is missing or invalid.
 * Sidebar clicks update the URL, keeping browser history in sync.
 */
const LookupPage: FC = () => {
    const { tab } = useParams<{ tab: string }>();
    const navigate = useNavigate();

    const activeTab: LookupTab = VALID_TABS.includes(tab as LookupTab)
        ? (tab as LookupTab)
        : "content-types";

    const handleTabChange = (newTab: LookupTab) => {
        navigate(`${REFERENCES_PATH}/${newTab}`, { replace: true });
    };

    const ActiveContainer = containerMap[activeTab];

    return (
        <div className={styles.page}>
            <title>{`Références - ${TAB_LABELS[activeTab]} | ${APP_NAME}`}</title>

            <LookupSidebar activeTab={activeTab} onChange={handleTabChange} />
            <div className={styles.page__content}>
                <ActiveContainer />
            </div>
        </div>
    );
};

export default LookupPage;
