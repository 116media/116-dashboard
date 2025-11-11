import { Typography } from "antd";
import type { FC } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { APP_NAME } from "@/shared/lib/constants/common";

const { Title } = Typography;

/**
 * User accounts management page.
 *
 * @component
 * @returns The users page
 */
const UsersPage: FC = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Utilisateurs | {APP_NAME}</title>
            </Helmet>
            <Title level={3}>Utilisateurs</Title>
        </HelmetProvider>
    );
};

export default UsersPage;
