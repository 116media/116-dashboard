import { Typography } from "antd";
import type { FC } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { APP_NAME } from "@/shared/infrastructure/constants/common";

const { Title } = Typography;

/**
 * Administrator accounts management page.
 *
 * @component
 * @returns The admins page
 */
const AdminsPage: FC = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Administrateurs | {APP_NAME}</title>
            </Helmet>
            <Title level={3}>Administrateurs</Title>
        </HelmetProvider>
    );
};

export default AdminsPage;
