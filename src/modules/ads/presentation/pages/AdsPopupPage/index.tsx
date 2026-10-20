import { Typography } from "antd";
import { type FC, Fragment } from "react";
import { APP_NAME } from "@/shared/infrastructure/constants/common";

const { Title } = Typography;

/**
 * Popup advertisements management page.
 *
 * @component
 * @returns The ads popup page
 */
const AdsPopupPage: FC = () => {
    return (
        <Fragment>
            <title>{`Popups | ${APP_NAME}`}</title>
            <Title level={3}>Popups</Title>
        </Fragment>
    );
};

export default AdsPopupPage;
