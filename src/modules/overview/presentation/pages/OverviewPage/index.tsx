import { Typography } from "antd";
import type { FC } from "react";
import { APP_NAME } from "@/shared/infrastructure/constants/common";

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
        <>
            <title>{`Accueil | ${APP_NAME}`}</title>
            <Title level={3}>Accueil</Title>
        </>
    );
};

export default OverviewPage;
