import { Typography } from "antd";
import type { FC } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { APP_NAME } from "@/shared/lib/constants/common";

const { Title } = Typography;

/**
 * Settings page for user preferences and configuration.
 *
 * @component
 * @returns The settings page
 */
const SettingsPage: FC = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Paramètres | {APP_NAME}</title>
            </Helmet>
            <Title level={3}>Paramètres</Title>
        </HelmetProvider>
    );
};

export default SettingsPage;
