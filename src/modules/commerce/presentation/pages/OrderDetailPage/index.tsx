import type { FC } from "react";
import OrderDetailContainer from "@/modules/commerce/presentation/containers/OrderDetailContainer";
import { APP_NAME } from "@/shared/infrastructure/constants/common";
import styles from "./index.module.scss";

/**
 * Page wrapper for the order detail view.
 *
 * @component
 *
 * @description
 * Wraps the order detail container in a white card with padding
 * and border-radius matching the dashboard page style.
 */
const OrderDetailPage: FC = () => {
    return (
        <div className={styles.page}>
            <title>{`Détail de la commande | ${APP_NAME}`}</title>
            <OrderDetailContainer />
        </div>
    );
};

export default OrderDetailPage;
