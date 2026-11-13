import { Typography } from "antd";
import { type FC, Fragment } from "react";
import { APP_NAME } from "@/shared/infrastructure/constants/common";

const { Title } = Typography;

/**
 * Contents management page.
 *
 * @component
 * @returns The contents page
 */
const ContentsPage: FC = () => {
    return (
        <Fragment>
            <title>{`Contenus | ${APP_NAME}`}</title>
            <Title level={3}>Contenus</Title>
        </Fragment>
    );
};

export default ContentsPage;
