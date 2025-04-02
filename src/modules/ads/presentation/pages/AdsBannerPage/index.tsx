import { Typography } from "antd";
import type { FC } from "react";
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
        <>
            <title>{`Bannières | ${APP_NAME}`}</title>
            <Title level={3}>Bannières</Title>
        </>
    );
};

export default AdsBannerPage;
