import { Card, Col, Flex, Row, Skeleton, Space } from "antd";
import type { FC } from "react";

const DetailFieldSkeleton = () => (
    <Flex align="center" gap={12}>
        <Skeleton.Avatar active size={48} shape="square" />
        <Skeleton active title={false} paragraph={{ rows: 2, width: "30%" }} />
    </Flex>
);

/**
 * Skeleton placeholder for the order detail page.
 *
 * @component
 *
 * @description
 * Mirrors the order detail layout: header card with customer name,
 * status badge, and 2x2 detail fields grid; products table;
 * and payment section with detail fields and action button.
 */
const OrderDetailLoading: FC = () => (
    <Space orientation="vertical" size="large" style={{ width: "100%" }}>
        <Card>
            <Flex justify="space-between" align="center">
                <Skeleton active title={{ width: "20%" }} paragraph={false} />
                <Flex gap={8} align="center">
                    <Skeleton.Button active size="small" />
                    <Skeleton.Button active />
                </Flex>
            </Flex>

            <Row gutter={[48, 12]} style={{ marginTop: 16 }}>
                <Col span={12}>
                    <DetailFieldSkeleton />
                </Col>
                <Col span={12}>
                    <DetailFieldSkeleton />
                </Col>
                <Col span={12}>
                    <DetailFieldSkeleton />
                </Col>
                <Col span={12}>
                    <DetailFieldSkeleton />
                </Col>
            </Row>
        </Card>

        <Card>
            <Skeleton active title={false} paragraph={{ rows: 2 }} />
        </Card>

        <Card>
            <Flex justify="space-between" align="center">
                <Skeleton active title={{ width: "15%" }} paragraph={false} />
                <Skeleton.Button active size="small" shape="round" />
            </Flex>

            <Row gutter={[48, 12]} style={{ marginTop: 16 }}>
                <Col span={12}>
                    <DetailFieldSkeleton />
                </Col>
                <Col span={12}>
                    <DetailFieldSkeleton />
                </Col>
                <Col span={12}>
                    <DetailFieldSkeleton />
                </Col>
                <Col span={12}>
                    <DetailFieldSkeleton />
                </Col>
            </Row>

            <Skeleton.Button active size="default" style={{ marginTop: 16 }} />
        </Card>
    </Space>
);

export default OrderDetailLoading;
