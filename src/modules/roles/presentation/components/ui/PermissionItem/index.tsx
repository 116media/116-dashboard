import { Card, Checkbox, Flex, Tag, Typography } from "antd";
import type { FC } from "react";
import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import styles from "./index.module.scss";

const { Text } = Typography;

interface IPermissionItemProps {
    checked: boolean;
    permission: IPermissionEntity;
    onToggle: (id: string, checked: boolean) => void;
}

/**
 * Single permission card with checkbox, resource.action tag, and description.
 *
 * @component
 */
const PermissionItem: FC<IPermissionItemProps> = ({ permission, checked, onToggle }) => (
    <Card size="small" className={styles.permissionItem}>
        <Flex vertical gap={12}>
            <Flex align="flex-start" gap={8}>
                <Checkbox
                    checked={checked}
                    onChange={(e) => onToggle(permission.id, e.target.checked)}
                />
                <Tag color="blue" variant="filled">
                    {permission.resource}:{permission.action}
                </Tag>
            </Flex>
            {permission.description && (
                <Text type="secondary" className={styles.permissionItem__description}>
                    {permission.description}
                </Text>
            )}
        </Flex>
    </Card>
);

export default PermissionItem;
