import { Typography } from "antd";
import type { FC } from "react";
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
        <>
            <title>{`Administrateurs | ${APP_NAME}`}</title>
            <Title level={3}>Administrateurs</Title>
        </>
    );
};

export default AdminsPage;
