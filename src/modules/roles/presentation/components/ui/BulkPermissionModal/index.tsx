import { Button, Flex, Modal } from "antd";
import type { FC } from "react";
import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import type { IRoleWithPermissions } from "@/modules/roles/domain/entities/IRoleWithPermissions";
import BulkPermissionFooter from "@/modules/roles/presentation/components/ui/BulkPermissionFooter";
import BulkPermissionHeader from "@/modules/roles/presentation/components/ui/BulkPermissionHeader";
import PermissionPanel from "@/modules/roles/presentation/components/ui/PermissionPanel";
import PermissionTransferControls from "@/modules/roles/presentation/components/ui/PermissionTransferControls";
import ResourceFilter from "@/modules/roles/presentation/components/ui/ResourceFilter";
import { useBulkPermissionTransfer } from "@/modules/roles/presentation/hooks/UseBulkPermissionTransfer";
import type { Failure } from "@/shared/domain/failures/failure";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconCaretLeftOutlined, IconCaretRightOutlined } from "@/shared/presentation/ui/Icons";
import styles from "./index.module.scss";

interface IBulkPermissionModalProps {
    open: boolean;
    loading: boolean;
    error: Failure | null | undefined;
    role: IRoleWithPermissions | null;
    permissions: IPermissionEntity[];
    onSave: (permissionIds: string[]) => void;
    onCancel: () => void;
}

/**
 * Modal for bulk managing permissions assigned to a role.
 *
 * @component
 *
 * @description
 * Displays a dual-panel layout with available and assigned permissions.
 * Supports resource-based tab filtering, search, checkbox selection,
 * and local transfer between panels. Changes are saved in bulk via
 * the `PUT /api/v1/admin/roles/{id}/permissions` endpoint.
 */
const BulkPermissionModal: FC<IBulkPermissionModalProps> = ({
    open,
    loading,
    error,
    role,
    permissions,
    onSave,
    onCancel
}) => {
    const transfer = useBulkPermissionTransfer(role, permissions, onSave, onCancel);

    if (!role?.name) return null;

    return (
        <Modal
            centered
            open={open}
            width={980}
            destroyOnHidden
            onCancel={transfer.handleCancel}
            title={
                <BulkPermissionHeader
                    roleName={role.name}
                    isActive={role.isActive}
                    totalAssigned={transfer.totalAssigned}
                />
            }
            footer={
                <BulkPermissionFooter
                    totalAssigned={transfer.totalAssigned}
                    hasPendingChanges={transfer.hasPendingChanges}
                    loading={loading}
                    onCancel={transfer.handleCancel}
                    onSave={transfer.handleSave}
                />
            }
        >
            <ErrorAlert error={error} banner showIcon closable={false} />

            <ResourceFilter
                resources={transfer.resources}
                activeResource={transfer.activeResource}
                onSelect={transfer.handleTabClick}
            />

            <Flex className={styles.bulkPermission__panels}>
                <PermissionPanel
                    title="Disponibles"
                    permissions={transfer.availablePermissions}
                    checkedIds={transfer.checkedAvailable}
                    searchValue={transfer.availableSearch}
                    emptyText="Aucune permission disponible"
                    onSearchChange={transfer.setAvailableSearch}
                    onToggle={transfer.toggleAvailable}
                    onSelectAll={transfer.selectAllAvailable}
                />

                <PermissionTransferControls
                    assignDisabled={transfer.checkedAvailable.size === 0}
                    removeDisabled={transfer.checkedAssigned.size === 0}
                    onAssign={transfer.handleAssign}
                    onRemove={transfer.handleRemove}
                />

                <PermissionPanel
                    title="Assignées"
                    permissions={transfer.assignedPermissions}
                    checkedIds={transfer.checkedAssigned}
                    searchValue={transfer.assignedSearch}
                    emptyText="Aucune permission assignée"
                    onSearchChange={transfer.setAssignedSearch}
                    onToggle={transfer.toggleAssigned}
                    onSelectAll={transfer.selectAllAssigned}
                />
            </Flex>

            <Flex justify="space-around" className={styles.bulkPermission__actions}>
                <Button
                    color="primary"
                    variant="filled"
                    iconPlacement="end"
                    icon={<IconCaretRightOutlined />}
                    disabled={transfer.checkedAvailable.size === 0}
                    onClick={transfer.handleAssign}
                >
                    Assigner ({transfer.checkedAvailable.size})
                </Button>
                <Button
                    color="pink"
                    variant="filled"
                    icon={<IconCaretLeftOutlined />}
                    disabled={transfer.checkedAssigned.size === 0}
                    onClick={transfer.handleRemove}
                >
                    Retirer ({transfer.checkedAssigned.size})
                </Button>
            </Flex>
        </Modal>
    );
};

export default BulkPermissionModal;
