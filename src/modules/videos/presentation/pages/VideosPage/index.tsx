import { Typography } from "antd";
import type { FC } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { APP_NAME } from "@/shared/infrastructure/constants/common";

const { Title } = Typography;

/**
 * Videos management page.
 *
 * @component
 * @returns The videos page
 */
const VideosPage: FC = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Vidéos | {APP_NAME}</title>
            </Helmet>
            <Title level={3}>Vidéos</Title>
        </HelmetProvider>
    );
};

export default VideosPage;
