import { Typography } from "antd";
import type { FC } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { APP_NAME } from "@/shared/infrastructure/constants/common";

const { Title } = Typography;

/**
 * Banner advertisements management page.
 *
 * @component
 * @returns The ads banner page
 */
const AdsBannerPage: FC = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Bannières | {APP_NAME}</title>
            </Helmet>
            <Title level={3}>Bannières</Title>
        </HelmetProvider>
    );
};

export default AdsBannerPage;
