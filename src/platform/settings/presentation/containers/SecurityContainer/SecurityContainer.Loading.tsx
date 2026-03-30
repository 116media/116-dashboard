import { Card, Flex, Skeleton } from "antd";
import type { FC } from "react";

const RoleCardSkeleton: FC = () => (
    <Card>
        <Flex align="center" gap={12}>
            <Skeleton.Avatar active size="small" shape="square" />
            <Skeleton active title={{ width: "30%" }} paragraph={{ rows: 1, width: "60%" }} />
        </Flex>
    </Card>
);

const SessionCardSkeleton: FC = () => (
    <Card>
        <Flex align="center" gap={12}>
            <Skeleton.Avatar active size={40} shape="circle" />
            <Skeleton active title={{ width: "40%" }} paragraph={{ rows: 1, width: "30%" }} />
        </Flex>
    </Card>
);

export const RolesLoading: FC = () => (
    <Flex vertical gap={16}>
        <RoleCardSkeleton />
        <RoleCardSkeleton />
        <RoleCardSkeleton />
    </Flex>
);

export const SessionsLoading: FC = () => (
    <Flex vertical gap={16}>
        <SessionCardSkeleton />
        <SessionCardSkeleton />
    </Flex>
);
