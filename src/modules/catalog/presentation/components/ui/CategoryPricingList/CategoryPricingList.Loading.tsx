import { Card, Flex, Skeleton, Space } from "antd";
import type { FC } from "react";
import styles from "./index.module.scss";

/**
 * Skeleton loading state for the CategoryPricingList component.
 *
 * @component
 *
 * @description
 * Renders placeholder cards matching the shape of pricing tier
 * cards (tier name + price on the left, action buttons on the right).
 */
const CategoryPricingListLoading: FC = () => (
    <Space
        size="small"
        orientation="vertical"
        style={{ width: "100%" }}
        className={styles.categoryPricingList}
    >
        {Array.from({ length: 3 }, (_, i) => i).map((key) => (
            <Card key={key} size="small" hoverable>
                <Flex justify="space-between" align="center">
                    <Flex gap={12} align="center">
                        <Skeleton.Input active size="small" style={{ width: 100 }} />
                        <Skeleton.Input active size="small" style={{ width: 60 }} />
                    </Flex>
                    <Flex gap={6}>
                        <Skeleton.Button active size="small" shape="square" />
                        <Skeleton.Button active size="small" shape="square" />
                    </Flex>
                </Flex>
            </Card>
        ))}
    </Space>
);

export default CategoryPricingListLoading;
