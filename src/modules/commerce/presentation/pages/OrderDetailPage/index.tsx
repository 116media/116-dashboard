import type { FC } from "react";
import OrderDetailContainer from "@/modules/commerce/presentation/containers/OrderDetailContainer";
import { APP_NAME } from "@/shared/infrastructure/constants/common";

/**
 * Page wrapper for the order detail view.
 *
 * @component
 */
const OrderDetailPage: FC = () => {
    return (
        <>
            <title>{`Détail de la commande | ${APP_NAME}`}</title>
            <OrderDetailContainer />
        </>
    );
};

export default OrderDetailPage;
