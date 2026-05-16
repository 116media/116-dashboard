import { Col, Flex, Row, Skeleton } from "antd";
import type { FC } from "react";
import styles from "./index.module.scss";

/**
 * Skeleton placeholder for the article detail page.
 *
 * @component
 *
 * @description
 * Mirrors the two-column article detail layout with animated
 * skeleton blocks: cover image, title, byline, body paragraphs
 * on the left, and info/SEO/options sections on the right.
 */
const ArticleDetailSkeleton: FC = () => (
    <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
            <div className={styles.articleSkeleton__cover} />
            <Skeleton active title={{ width: "60%" }} paragraph={false} />
            <Flex gap={12} className={styles.articleSkeleton__byline}>
                <Skeleton.Button active size="small" shape="round" />
                <Skeleton.Button active size="small" shape="round" />
                <Skeleton.Button active size="small" shape="round" />
            </Flex>
            <Skeleton active paragraph={{ rows: 3 }} />
            <Skeleton active paragraph={{ rows: 4 }} />
        </Col>
        <Col xs={24} lg={8}>
            <Flex vertical gap={16}>
                <div className={styles.articleSkeleton__section}>
                    <Skeleton active title={{ width: "40%" }} paragraph={{ rows: 4 }} />
                </div>
                <div className={styles.articleSkeleton__section}>
                    <Skeleton active title={{ width: "30%" }} paragraph={{ rows: 2 }} />
                </div>
                <div className={styles.articleSkeleton__section}>
                    <Skeleton active title={{ width: "35%" }} paragraph={{ rows: 1 }} />
                </div>
            </Flex>
        </Col>
    </Row>
);

export default ArticleDetailSkeleton;
