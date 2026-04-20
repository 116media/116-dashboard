import { Flex, Typography } from "antd";
import type { FC } from "react";
import { ENTITY_STATUS_CONFIG } from "@/shared/presentation/constants/entity.status.config";
import { IconSafetyOutlined } from "@/shared/presentation/ui/Icons";
import StatusTag from "@/shared/presentation/ui/StatusTag";
import styles from "./index.module.scss";

const { Text, Title } = Typography;

interface IBulkPermissionHeaderProps {
    roleName: string;
    isActive: boolean;
    totalAssigned: number;
}

/**
 * Header for the bulk permission modal.
 *
 * @component
 *
 * @description
 * Displays the permissions icon, role name, status tag,
 * and total assigned permission count.
 */
const BulkPermissionHeader: FC<IBulkPermissionHeaderProps> = ({
    roleName,
    isActive,
    totalAssigned
}) => (
    <Flex gap={16} align="center">
        <div className={styles.bulkPermissionHeader__icon}>
            <IconSafetyOutlined />
        </div>
        <div>
            <Title level={5} className={styles.bulkPermissionHeader__title}>
                Gestion des permissions — {roleName}
            </Title>
            <Flex align="center" gap={8}>
                <StatusTag
                    status={isActive ? "active" : "inactive"}
                    config={ENTITY_STATUS_CONFIG}
                />
                <Text type="secondary">{totalAssigned} assignées</Text>
            </Flex>
        </div>
    </Flex>
);

export default BulkPermissionHeader;
