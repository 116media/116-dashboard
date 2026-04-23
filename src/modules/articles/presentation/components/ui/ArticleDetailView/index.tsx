import { Button, Col, Flex, Row } from "antd";
import type { FC } from "react";
import { useNavigate } from "react-router";
import type { IArticleEntity } from "@/modules/articles/domain/entities/IArticleEntity";
import ArticleMetaSidebar from "@/modules/articles/presentation/components/ui/ArticleMetaSidebar";
import ArticlePreview from "@/modules/articles/presentation/components/ui/ArticlePreview";
import { ARTICLE_PATH } from "@/shared/presentation/constants/paths";
import { IconArrowLeftOutlined } from "@/shared/presentation/ui/Icons";
import styles from "./index.module.scss";

interface IArticleDetailViewProps {
    article: IArticleEntity;
}

/**
 * Full article detail view — two-column layout.
 *
 * @component
 *
 * @description
 * Left column: article reading experience (cover, title, byline,
 * headline, rich text body, tags) — rendered like a published article.
 * Right column: admin sidebar with informations, SEO, options, images.
 * Back button navigates to the articles list.
 */
const ArticleDetailView: FC<IArticleDetailViewProps> = ({ article }) => {
    const navigate = useNavigate();

    return (
        <>
            <Flex align="center" className={styles.articleDetail__back}>
                <Button
                    type="link"
                    variant="text"
                    icon={<IconArrowLeftOutlined />}
                    onClick={() => navigate(ARTICLE_PATH)}
                >
                    Retour aux articles
                </Button>
            </Flex>

            <Row gutter={[24, 24]}>
                <Col xs={24} lg={14}>
                    <ArticlePreview article={article} />
                </Col>
                <Col xs={24} lg={10}>
                    <ArticleMetaSidebar article={article} />
                </Col>
            </Row>
        </>
    );
};

export default ArticleDetailView;
