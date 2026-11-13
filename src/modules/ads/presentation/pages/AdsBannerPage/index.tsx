import { Typography } from "antd";
import { type FC, Fragment } from "react";
import { APP_NAME } from "@/shared/infrastructure/constants/common";

const { Title } = Typography;

/**
 * Banner advertisements management page.
 *
 * @component
 * @returns The ads banner page
 */
const AdsBannerPage: FC = () => {
    return (
        <Fragment>
            <title>{`Bannières | ${APP_NAME}`}</title>
            <Title level={3}>Bannières</Title>
        </Fragment>
    );
};

export default AdsBannerPage;
