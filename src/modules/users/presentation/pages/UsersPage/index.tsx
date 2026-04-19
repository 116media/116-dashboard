import { Typography } from "antd";
import type { FC } from "react";
import { APP_NAME } from "@/shared/infrastructure/constants/common";

const { Title } = Typography;

/**
 * User accounts management page.
 *
 * @component
 * @returns The users page
 */
const UsersPage: FC = () => {
    return (
        <>
            <title>{`Utilisateurs | ${APP_NAME}`}</title>
            <Title level={3}>Utilisateurs</Title>
        </>
    );
};

export default UsersPage;
