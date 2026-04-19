import { Typography } from "antd";
import type { FC } from "react";
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
        <>
            <title>{`Contenus | ${APP_NAME}`}</title>
            <Title level={3}>Contenus</Title>
        </>
    );
};

export default ContentsPage;
