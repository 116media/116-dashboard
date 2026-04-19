import { Typography } from "antd";
import type { FC } from "react";
import { APP_NAME } from "@/shared/infrastructure/constants/common";

const { Title } = Typography;

/**
 * Videos management page.
 *
 * @component
 * @returns The videos page
 */
const VideosPage: FC = () => {
    return (
        <>
            <title>{`Vidéos | ${APP_NAME}`}</title>
            <Title level={3}>Vidéos</Title>
        </>
    );
};

export default VideosPage;
