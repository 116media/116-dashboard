import { Typography } from "antd";
import { type FC, Fragment } from "react";
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
        <Fragment>
            <title>{`Administrateurs | ${APP_NAME}`}</title>
            <Title level={3}>Administrateurs</Title>
        </Fragment>
    );
};

export default AdminsPage;
