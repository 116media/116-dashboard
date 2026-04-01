import { Flex, Tag, Typography } from "antd";
import type { FC } from "react";
import { IconSafetyOutlined } from "@/shared/presentation/ui/Icons";
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
            <Title level={4} className={styles.bulkPermissionHeader__title}>
                Gestion des permissions — {roleName}
            </Title>
            <Flex align="center" gap={8}>
                {isActive ? (
                    <Tag color="success" variant="outlined">
                        Actif
                    </Tag>
                ) : (
                    <Tag color="warning" variant="outlined">
                        Inactif
                    </Tag>
                )}
                <Text type="secondary">{totalAssigned} assignées</Text>
            </Flex>
        </div>
    </Flex>
);

export default BulkPermissionHeader;
