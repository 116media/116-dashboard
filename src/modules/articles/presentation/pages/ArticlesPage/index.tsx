import { Typography } from "antd";
import type { FC } from "react";
import { APP_NAME } from "@/shared/infrastructure/constants/common";

const { Title } = Typography;

/**
 * Articles management page.
 *
 * @component
 * @returns The articles page
 */
const ArticlesPage: FC = () => {
    return (
        <>
            <title>{`Articles | ${APP_NAME}`}</title>
            <Title level={3}>Articles</Title>
        </>
    );
};

export default ArticlesPage;
