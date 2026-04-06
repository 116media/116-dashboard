import { Typography } from "antd";
import type { FC } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
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
        <HelmetProvider>
            <Helmet>
                <title>Articles | {APP_NAME}</title>
            </Helmet>
            <Title level={3}>Articles</Title>
        </HelmetProvider>
    );
};

export default ArticlesPage;
