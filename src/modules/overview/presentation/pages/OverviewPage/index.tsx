import { Typography } from "antd";
import type { FC } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { APP_NAME } from "@/shared/lib/constants/common";

const { Title } = Typography;

/**
 * Overview page — the dashboard home displaying stats, charts, and summaries.
 *
 * @component
 *
 * @description
 * Landing page after authentication. Will display key metrics,
 * orders, invoices, and other business data.
 *
 * @returns The overview page
 */
const OverviewPage: FC = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Accueil | {APP_NAME}</title>
            </Helmet>
            <Title level={3}>Accueil</Title>
        </HelmetProvider>
    );
};

export default OverviewPage;
