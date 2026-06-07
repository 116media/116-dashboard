import { Flex } from "antd";
import type { FC } from "react";
import type { IArticleEntity } from "@/modules/articles/domain/entities/IArticleEntity";
import ArticleMetaImages from "@/modules/articles/presentation/components/ui/ArticleMetaImages";
import ArticleMetaInfo from "@/modules/articles/presentation/components/ui/ArticleMetaInfo";
import ArticleMetaOptions from "@/modules/articles/presentation/components/ui/ArticleMetaOptions";
import ArticleMetaSeo from "@/modules/articles/presentation/components/ui/ArticleMetaSeo";

interface IArticleMetaSidebarProps {
    article: IArticleEntity;
}

/**
 * Admin sidebar for the article detail page.
 *
 * @component
 *
 * @description
 * Four sections stacked vertically:
 * 1. Informations — status, category, author, dates
 * 2. SEO — meta title, meta description
 * 3. Options — promotion status (read-only)
 * 4. Images — masonry grid of uploaded images
 */
const ArticleMetaSidebar: FC<IArticleMetaSidebarProps> = ({ article }) => (
    <Flex vertical gap={16}>
        <ArticleMetaInfo article={article} />
        <ArticleMetaSeo article={article} />
        <ArticleMetaOptions article={article} />
        {article.images?.length > 0 && <ArticleMetaImages images={article.images} />}
    </Flex>
);

export default ArticleMetaSidebar;
