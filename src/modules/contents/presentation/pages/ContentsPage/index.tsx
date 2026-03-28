import { Typography } from "antd";
import type { FC } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { APP_NAME } from "@/shared/lib/constants/common";

const { Title } = Typography;

/**
 * Contents management page.
 *
 * @component
 * @returns The contents page
 */
const ContentsPage: FC = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Contenus | {APP_NAME}</title>
            </Helmet>
            <Title level={3}>Contenus</Title>
        </HelmetProvider>
    );
};

export default ContentsPage;
