import type { FC } from "react";
import { useNavigate, useParams } from "react-router";
import CommerceSidebar, {
    type CommerceTab
} from "@/modules/commerce/presentation/components/ui/CommerceSidebar";
import OrdersListContainer from "@/modules/commerce/presentation/containers/OrdersListContainer";
import PaymentsListContainer from "@/modules/commerce/presentation/containers/PaymentsListContainer";
import { APP_NAME } from "@/shared/infrastructure/constants/common";
import { ORDERS_PATH } from "@/shared/presentation/constants/paths";
import styles from "./index.module.scss";

const containerMap: Record<CommerceTab, FC> = {
    orders: OrdersListContainer,
    payments: PaymentsListContainer
};

const VALID_TABS: CommerceTab[] = ["orders", "payments"];

const TAB_LABELS: Record<CommerceTab, string> = {
    orders: "Commandes",
    payments: "Paiements"
};

/**
 * Main commerce page with URL-driven tab navigation.
 *
 * @component
 *
 * @description
 * Reads the active tab from the URL param (`/orders/:tab`).
 * Defaults to "orders" if the param is missing or invalid.
 * Sidebar clicks update the URL, keeping browser history in sync.
 */
const CommercePage: FC = () => {
    const { tab } = useParams<{ tab: string }>();
    const navigate = useNavigate();

    const activeTab: CommerceTab = VALID_TABS.includes(tab as CommerceTab)
        ? (tab as CommerceTab)
        : "orders";

    const handleTabChange = (newTab: CommerceTab) => {
        navigate(`${ORDERS_PATH}/${newTab}`, { replace: true });
    };

    const ActiveContainer = containerMap[activeTab];

    return (
        <div className={styles.page}>
            <title>{`Ventes - ${TAB_LABELS[activeTab]} | ${APP_NAME}`}</title>

            <CommerceSidebar activeTab={activeTab} onChange={handleTabChange} />
            <div className={styles.page__content}>
                <ActiveContainer />
            </div>
        </div>
    );
};

export default CommercePage;
