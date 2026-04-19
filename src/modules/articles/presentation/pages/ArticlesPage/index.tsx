import type { FC } from "react";
import ArticlesListContainer from "@/modules/articles/presentation/containers/ArticlesListContainer";
import { APP_NAME } from "@/shared/infrastructure/constants/common";
import styles from "./index.module.scss";

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
    <div className={styles.page}>
        <title>{`Articles | ${APP_NAME}`}</title>
        <ArticlesListContainer />
    </div>
);

export default ArticlesPage;
