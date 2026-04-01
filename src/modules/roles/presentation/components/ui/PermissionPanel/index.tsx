import { Alert, Button, Empty, Flex, Input, Typography } from "antd";
import type { FC } from "react";
import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import PermissionItem from "@/modules/roles/presentation/components/ui/PermissionItem";
import { IconSearchOutlined } from "@/shared/presentation/ui/Icons";
import styles from "./index.module.scss";

const { Text } = Typography;

interface IPermissionPanelProps {
    title: string;
    permissions: IPermissionEntity[];
    checkedIds: Set<string>;
    searchValue: string;
    emptyText: string;
    onSearchChange: (value: string) => void;
    onToggle: (id: string, checked: boolean) => void;
    onSelectAll: () => void;
}

/**
 * Reusable panel displaying a filterable, selectable list of permissions.
 *
 * @component
 *
 * @description
 * Renders an info alert header with count, a select-all toggle,
 * a search input, and a scrollable permission list with checkboxes.
 * Used for both the available and assigned sides of BulkPermissionModal.
 */
const PermissionPanel: FC<IPermissionPanelProps> = ({
    title,
    permissions,
    checkedIds,
    searchValue,
    emptyText,
    onSearchChange,
    onToggle,
    onSelectAll
}) => {
    const allSelected = permissions.length > 0 && checkedIds.size === permissions.length;

    return (
        <div className={styles.permissionPanel}>
            <Alert
                type="info"
                showIcon
                className={styles.permissionPanel__header}
                title={
                    <Flex justify="space-between" align="center">
                        <Text>{title}</Text>
                        <Text strong>
                            {permissions.length} permission
                            {permissions.length > 1 ? "s" : ""}
                        </Text>
                    </Flex>
                }
            />
            <Flex justify="flex-end" className={styles.permissionPanel__selectAll}>
                <Button
                    type="link"
                    size="small"
                    onClick={onSelectAll}
                    disabled={permissions.length === 0}
                >
                    {allSelected ? "Tout désélectionner" : "Tout sélectionner"}
                </Button>
            </Flex>
            <div className={styles.permissionPanel__search}>
                <Input
                    allowClear
                    value={searchValue}
                    placeholder="Rechercher..."
                    prefix={<IconSearchOutlined />}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
            <Flex vertical gap={12} className={styles.permissionPanel__list}>
                {permissions.length === 0 ? (
                    <div className={styles.permissionPanel__empty}>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={emptyText} />
                    </div>
                ) : (
                    permissions.map((p) => (
                        <PermissionItem
                            key={p.id}
                            permission={p}
                            checked={checkedIds.has(p.id)}
                            onToggle={onToggle}
                        />
                    ))
                )}
            </Flex>
        </div>
    );
};

export default PermissionPanel;
