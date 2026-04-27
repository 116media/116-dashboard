import { Table } from "antd";
import { type FC, useCallback, useState } from "react";
import { useAuthorization } from "@/modules/auth/presentation/hooks/UseAuthorization";
import type { IRoleEntity } from "@/modules/roles/domain/entities/IRole";
import RoleForm from "@/modules/roles/presentation/components/forms/RoleForm";
import type { RoleAction } from "@/modules/roles/presentation/components/tables/RolesTable/columns";
import { rolesTableColumns } from "@/modules/roles/presentation/components/tables/RolesTable/columns";
import BulkPermissionModal from "@/modules/roles/presentation/components/ui/BulkPermissionModal";
import RoleActionModal from "@/modules/roles/presentation/components/ui/RoleActionModal";
import SinglePermissionModal from "@/modules/roles/presentation/components/ui/SinglePermissionModal";
import { ROLE_STATUS_OPTIONS } from "@/modules/roles/presentation/constants/roles.status";
import { useCreateRole } from "@/modules/roles/presentation/hooks/UseCreateRole";
import { useRoleActions } from "@/modules/roles/presentation/hooks/UseRoleActions";
import { useRolePermissions } from "@/modules/roles/presentation/hooks/UseRolePermissions";
import { useRolesList } from "@/modules/roles/presentation/hooks/UseRolesList";
import { useUpdateRole } from "@/modules/roles/presentation/hooks/UseUpdateRole";
import { useResizableColumns } from "@/shared/presentation/hooks/UseResizableColumns";
import CreateEditModal from "@/shared/presentation/ui/CreateEditModal";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconSafetyOutlined } from "@/shared/presentation/ui/Icons";
import PageHeader from "@/shared/presentation/ui/PageHeader";
import ResizableTitle from "@/shared/presentation/ui/ResizableTable";
import TableToolbar from "@/shared/presentation/ui/TableToolbar";

/**
 * Container for the roles list page.
 *
 * @component
 *
 * @description
 * Orchestrates the roles table, create/edit modals, and action
 * confirmation modal. Wires all hooks and manages modal state.
 * Matches the dashboard table design with toolbar, checkbox
 * selection, and pagination.
 */
const RolesListContainer: FC = () => {
    const rolesList = useRolesList();
    const createRole = useCreateRole(rolesList.reload);
    const [selectedRole, setSelectedRole] = useState<IRoleEntity | null>(null);
    const updateRole = useUpdateRole(selectedRole, rolesList.reload);
    const roleActions = useRoleActions(rolesList.reload);
    const rolePermissions = useRolePermissions(rolesList.reload);

    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [actionOpen, setActionOpen] = useState(false);
    const [permissionOpen, setPermissionOpen] = useState(false);
    const [permissionMode, setPermissionMode] = useState<"assign" | "remove">("assign");
    const [bulkPermissionOpen, setBulkPermissionOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState<RoleAction | null>(null);

    const { isSuperAdmin } = useAuthorization();

    const handleAction = useCallback(
        (action: RoleAction, role: IRoleEntity) => {
            setSelectedRole(role);

            switch (action) {
                case "edit":
                    setEditOpen(true);
                    break;
                case "managePermissions":
                    rolePermissions.fetchRole(role.id);
                    rolePermissions.fetchAllPermissions();
                    setBulkPermissionOpen(true);
                    break;
                case "assignPermission":
                    setPermissionMode("assign");
                    rolePermissions.fetchRole(role.id);
                    rolePermissions.fetchAllPermissions();
                    setPermissionOpen(true);
                    break;
                case "removePermission":
                    setPermissionMode("remove");
                    rolePermissions.fetchRole(role.id);
                    setPermissionOpen(true);
                    break;
                default:
                    setCurrentAction(action);
                    setActionOpen(true);
                    break;
            }
        },
        [rolePermissions]
    );

    const handleBulkSave = async (permissionIds: string[]) => {
        if (!selectedRole) return;

        await rolePermissions.onBulkUpdate(selectedRole.id, permissionIds);
        setBulkPermissionOpen(false);
    };

    const handlePermissionConfirm = async (permissionId: string) => {
        if (!selectedRole) return;

        if (permissionMode === "assign") {
            await rolePermissions.onAssign(selectedRole.id, permissionId);
        } else await rolePermissions.onRemove(selectedRole.id, permissionId);

        setPermissionOpen(false);
    };

    const handleActionConfirm = async () => {
        if (!selectedRole || !currentAction) return;

        const actionMap = {
            activate: roleActions.onActivate,
            deactivate: roleActions.onDeactivate,
            softDelete: roleActions.onSoftDelete,
            hardDelete: roleActions.onHardDelete,
            restore: roleActions.onRestore
        } as const;

        const handler = actionMap[currentAction as keyof typeof actionMap];
        if (handler) {
            await handler(selectedRole.id);
            setActionOpen(false);
        }
    };

    const { columns: tableColumns } = useResizableColumns(
        rolesTableColumns(handleAction, isSuperAdmin)
    );

    return (
        <>
            <ErrorAlert
                banner
                showIcon
                closable
                error={rolesList.error}
                onClose={rolesList.reload}
            />

            <PageHeader
                title="Rôles"
                subtitle="Gérer les rôles et les accès."
                icon={<IconSafetyOutlined />}
                onCreate={isSuperAdmin ? () => setCreateOpen(true) : undefined}
                createLabel="Créer un rôle"
            />

            <TableToolbar
                statusFilter={rolesList.statusFilter}
                onStatusFilterChange={rolesList.onStatusFilterChange}
                statusOptions={ROLE_STATUS_OPTIONS}
                searchValue={rolesList.searchValue}
                onSearchChange={rolesList.onSearchChange}
                onSearch={rolesList.onSearch}
                searchLoading={rolesList.loading}
            />

            <Table
                rowKey="id"
                dataSource={rolesList.roles?.items ?? []}
                columns={tableColumns}
                loading={rolesList.loading}
                components={{ header: { cell: ResizableTitle } }}
                rowSelection={{ type: "checkbox", columnWidth: 36 }}
                scroll={{ x: "max-content" }}
                pagination={{
                    showSizeChanger: true,
                    current: (rolesList.roles?.pageIndex ?? 0) + 1,
                    pageSize: rolesList.roles?.pageSize ?? 10,
                    total: rolesList.roles?.count ?? 0,
                    onChange: rolesList.onPageChange
                }}
            />

            {createOpen && (
                <CreateEditModal
                    open={createOpen}
                    formContext="CREATE"
                    loading={createRole.loading}
                    success={createRole.success}
                    onClose={() => setCreateOpen(false)}
                    onSubmit={() => createRole.form.submit()}
                    title={{ create: "Créer un rôle", edit: "Modifier le rôle" }}
                    onSuccessClose={() => {
                        setCreateOpen(false);
                        createRole.resetCreate();
                        rolesList.reload();
                    }}
                >
                    <RoleForm
                        form={createRole.form}
                        error={createRole.error}
                        formContext="CREATE"
                        onSubmit={createRole.onSubmit}
                    />
                </CreateEditModal>
            )}

            {editOpen && (
                <CreateEditModal
                    open={editOpen}
                    formContext="EDIT"
                    loading={updateRole.loading}
                    success={updateRole.success}
                    onClose={() => {
                        setEditOpen(false);
                        updateRole.resetUpdate();
                    }}
                    onSubmit={() => updateRole.form.submit()}
                    title={{ create: "Créer un rôle", edit: "Modifier le rôle" }}
                    onSuccessClose={() => {
                        setEditOpen(false);
                        updateRole.resetUpdate();
                        rolesList.reload();
                    }}
                >
                    <RoleForm
                        form={updateRole.form}
                        error={updateRole.error}
                        formContext="EDIT"
                        initialValues={selectedRole}
                        onSubmit={updateRole.onSubmit}
                    />
                </CreateEditModal>
            )}

            <RoleActionModal
                open={actionOpen}
                role={selectedRole}
                action={currentAction}
                loading={roleActions.loading}
                error={roleActions.error}
                onConfirm={handleActionConfirm}
                onCancel={() => setActionOpen(false)}
            />

            {bulkPermissionOpen && (
                <BulkPermissionModal
                    open={bulkPermissionOpen}
                    loading={rolePermissions.bulkLoading}
                    error={rolePermissions.bulkError}
                    role={rolePermissions.role}
                    permissions={rolePermissions.allPermissions}
                    onSave={handleBulkSave}
                    onCancel={() => setBulkPermissionOpen(false)}
                />
            )}

            <SinglePermissionModal
                open={permissionOpen}
                mode={permissionMode}
                role={rolePermissions.role}
                permissions={rolePermissions.allPermissions}
                permissionsLoading={rolePermissions.permissionsLoading}
                loading={
                    permissionMode === "assign"
                        ? rolePermissions.assignLoading
                        : rolePermissions.removeLoading
                }
                error={
                    permissionMode === "assign"
                        ? rolePermissions.assignError
                        : rolePermissions.removeError
                }
                onConfirm={handlePermissionConfirm}
                onCancel={() => setPermissionOpen(false)}
            />
        </>
    );
};

export default RolesListContainer;
