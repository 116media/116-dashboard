import { Card, Flex, Skeleton, Space } from "antd";
import type { FC } from "react";
import styles from "./index.module.scss";

/**
 * Skeleton loading state for the PackageSlotsList component.
 *
 * @component
 *
 * @description
 * Renders placeholder cards matching the shape of slot cards
 * (category name + quantity + tag on the left, delete button on the right).
 */
const PackageSlotsListLoading: FC = () => (
    <Space direction="vertical" style={{ width: "100%" }} size="small" className={styles.packageSlotsList}>
        {Array.from({ length: 3 }, (_, i) => i).map((key) => (
            <Card key={key} size="small" hoverable>
                <Flex justify="space-between" align="center">
                    <Flex gap={12} align="center">
                        <Skeleton.Input active size="small" style={{ width: 120 }} />
                        <Skeleton.Input active size="small" style={{ width: 40 }} />
                        <Skeleton.Button active size="small" style={{ width: 80 }} />
                    </Flex>
                    <Skeleton.Button active size="small" shape="square" />
                </Flex>
            </Card>
        ))}
    </Space>
);

export default PackageSlotsListLoading;