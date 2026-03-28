import { Typography } from "antd";
import type { FC } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { APP_NAME } from "@/shared/lib/constants/common";

const { Title } = Typography;

/**
 * Popup advertisements management page.
 *
 * @component
 * @returns The ads popup page
 */
const AdsPopupPage: FC = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Popups | {APP_NAME}</title>
            </Helmet>
            <Title level={3}>Popups</Title>
        </HelmetProvider>
    );
};

export default AdsPopupPage;
