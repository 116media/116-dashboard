import { Table } from "antd";
import { type FC, useCallback, useState } from "react";
import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import PermissionForm from "@/modules/permissions/presentation/components/forms/PermissionForm";
import type { PermissionAction } from "@/modules/permissions/presentation/components/tables/PermissionsTable/columns";
import { permissionsTableColumns } from "@/modules/permissions/presentation/components/tables/PermissionsTable/columns";
import PermissionActionModal from "@/modules/permissions/presentation/components/ui/PermissionActionModal";
import { PERMISSION_STATUS_OPTIONS } from "@/modules/permissions/presentation/constants/permissions.status";
import { useCreatePermission } from "@/modules/permissions/presentation/hooks/UseCreatePermission";
import { usePermissionActions } from "@/modules/permissions/presentation/hooks/UsePermissionActions";
import { usePermissionsList } from "@/modules/permissions/presentation/hooks/UsePermissionsList";
import { useUpdatePermission } from "@/modules/permissions/presentation/hooks/UseUpdatePermission";
import CreateEditModal from "@/shared/presentation/ui/CreateEditModal";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconUnlockOutlined } from "@/shared/presentation/ui/Icons";
import PageHeader from "@/shared/presentation/ui/PageHeader";
import TableToolbar from "@/shared/presentation/ui/TableToolbar";

/**
 * Container for the permissions list page.
 *
 * @component
 *
 * @description
 * Orchestrates the permissions table, create/edit modals, and action
 * confirmation modal. Wires all hooks and manages modal state.
 */
const PermissionsListContainer: FC = () => {
    const permissionsList = usePermissionsList();
    const createPermission = useCreatePermission();
    const [selectedPermission, setSelectedPermission] = useState<IPermissionEntity | null>(null);
    const updatePermission = useUpdatePermission(selectedPermission);
    const permissionActions = usePermissionActions(permissionsList.reload);

    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [actionOpen, setActionOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState<PermissionAction | null>(null);

    // TODO: implement useIsSuperAdmin hook
    const isSuperAdmin = true;

    const handleAction = useCallback((action: PermissionAction, permission: IPermissionEntity) => {
        setSelectedPermission(permission);
        if (action === "edit") setEditOpen(true);
        else {
            setCurrentAction(action);
            setActionOpen(true);
        }
    }, []);

    const handleActionConfirm = async () => {
        if (!selectedPermission || !currentAction) return;

        const actionMap = {
            activate: permissionActions.onActivate,
            deactivate: permissionActions.onDeactivate,
            softDelete: permissionActions.onSoftDelete,
            hardDelete: permissionActions.onHardDelete,
            restore: permissionActions.onRestore
        } as const;

        const handler = actionMap[currentAction as keyof typeof actionMap];
        if (handler) {
            await handler(selectedPermission.id);
            setActionOpen(false);
        }
    };

    return (
        <div>
            <ErrorAlert
                banner
                showIcon
                closable
                error={permissionsList.error}
                onClose={permissionsList.reload}
            />

            <PageHeader
                title="Permissions"
                subtitle="Gérer les permissions et les accès."
                icon={<IconUnlockOutlined />}
                onCreate={isSuperAdmin ? () => setCreateOpen(true) : undefined}
                createLabel="Créer une permission"
            />

            <TableToolbar
                statusFilter={permissionsList.statusFilter}
                onStatusFilterChange={permissionsList.onStatusFilterChange}
                statusOptions={PERMISSION_STATUS_OPTIONS}
                searchValue={permissionsList.searchValue}
                onSearchChange={permissionsList.onSearchChange}
                onSearch={permissionsList.onSearch}
                searchLoading={permissionsList.loading}
            />

            <Table
                rowKey="id"
                dataSource={permissionsList.permissions?.items ?? []}
                columns={permissionsTableColumns(handleAction, isSuperAdmin)}
                loading={permissionsList.loading}
                rowSelection={{ type: "checkbox", columnWidth: 48 }}
                pagination={{
                    showSizeChanger: true,
                    current: (permissionsList.permissions?.pageIndex ?? 0) + 1,
                    pageSize: permissionsList.permissions?.pageSize ?? 10,
                    total: permissionsList.permissions?.count ?? 0,
                    onChange: permissionsList.onPageChange
                }}
            />

            <CreateEditModal
                open={createOpen}
                loading={createPermission.loading}
                formContext="CREATE"
                success={createPermission.success}
                onClose={() => setCreateOpen(false)}
                onSubmit={() => createPermission.form.submit()}
                title={{
                    create: "Créer une permission",
                    edit: "Modifier la permission"
                }}
                onSuccessClose={() => {
                    setCreateOpen(false);
                    createPermission.resetCreate();
                    permissionsList.reload();
                }}
            >
                <PermissionForm
                    form={createPermission.form}
                    error={createPermission.error}
                    formContext="CREATE"
                />
            </CreateEditModal>

            <CreateEditModal
                open={editOpen}
                loading={updatePermission.loading}
                formContext="EDIT"
                success={updatePermission.success}
                onClose={() => {
                    setEditOpen(false);
                    updatePermission.resetUpdate();
                }}
                onSubmit={() => updatePermission.form.submit()}
                title={{
                    create: "Créer une permission",
                    edit: "Modifier la permission"
                }}
                onSuccessClose={() => {
                    setEditOpen(false);
                    updatePermission.resetUpdate();
                    permissionsList.reload();
                }}
            >
                <PermissionForm
                    formContext="EDIT"
                    form={updatePermission.form}
                    error={updatePermission.error}
                    initialValues={selectedPermission}
                />
            </CreateEditModal>

            <PermissionActionModal
                open={actionOpen}
                permission={selectedPermission}
                action={currentAction}
                loading={permissionActions.loading}
                error={permissionActions.error}
                onConfirm={handleActionConfirm}
                onCancel={() => setActionOpen(false)}
            />
        </div>
    );
};

export default PermissionsListContainer;
