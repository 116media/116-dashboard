import type { FC } from "react";
import { useParams } from "react-router";
import ArticleDetailSkeleton from "@/modules/articles/presentation/components/ui/ArticleDetailSkeleton";
import ArticleDetailView from "@/modules/articles/presentation/components/ui/ArticleDetailView";
import { useArticleDetail } from "@/modules/articles/presentation/hooks/UseArticleDetail";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

/**
 * Container for the article detail page.
 *
 * @component
 *
 * @description
 * Extracts the article ID from the URL params, fetches the full
 * article detail via `useArticleDetail`, and handles loading/error
 * states. Shows a skeleton matching the two-column layout while
 * loading, then renders the pure `ArticleDetailView`.
 */
const ArticleDetailContainer: FC = () => {
    const { id } = useParams<{ id: string }>();
    const { article, loading, error, reload } = useArticleDetail(id ?? "");

    if (loading && !article) {
        return <ArticleDetailSkeleton />;
    }

    if (error && !article) {
        return <ErrorAlert error={error} showIcon closable banner onClose={reload} />;
    }

    if (!article) return null;

    return <ArticleDetailView article={article} />;
};

export default ArticleDetailContainer;
