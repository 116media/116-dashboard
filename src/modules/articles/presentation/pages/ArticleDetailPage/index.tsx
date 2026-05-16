import type { FC } from "react";
import ArticleDetailContainer from "@/modules/articles/presentation/containers/ArticleDetailContainer";
import { APP_NAME } from "@/shared/infrastructure/constants/common";
import styles from "./index.module.scss";

/**
 * Article detail page.
 *
 * @component
 *
 * @description
 * Wraps the article detail container in a white card layout
 * matching the dashboard page style.
 */
const ArticleDetailPage: FC = () => (
    <div className={styles.page}>
        <title>{`Détail de l'article | ${APP_NAME}`}</title>
        <ArticleDetailContainer />
    </div>
);

export default ArticleDetailPage;
