import type { FC } from "react";
import ArticlesListContainer from "@/modules/articles/presentation/containers/ArticlesListContainer";
import { APP_NAME } from "@/shared/infrastructure/constants/common";

/**
 * Articles management page.
 *
 * @component
 *
 * @description
 * Renders the articles list container with page title.
 *
 * @returns The articles page
 */
const ArticlesPage: FC = () => (
    <>
        <title>{`Articles | ${APP_NAME}`}</title>
        <ArticlesListContainer />
    </>
);

export default ArticlesPage;
