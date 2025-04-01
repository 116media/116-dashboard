import { Table } from "antd";
import { type FC, useCallback, useState } from "react";
import type { IRoleEntity } from "@/modules/roles/domain/entities/IRole";
import RoleForm from "@/modules/roles/presentation/components/forms/RoleForm";
import type { RoleAction } from "@/modules/roles/presentation/components/tables/RolesTable/columns";
import { rolesTableColumns } from "@/modules/roles/presentation/components/tables/RolesTable/columns";
import RoleActionModal from "@/modules/roles/presentation/components/ui/RoleActionModal";
import { ROLE_STATUS_OPTIONS } from "@/modules/roles/presentation/constants/roles.status";
import { useCreateRole } from "@/modules/roles/presentation/hooks/UseCreateRole";
import { useRoleActions } from "@/modules/roles/presentation/hooks/UseRoleActions";
import { useRolesList } from "@/modules/roles/presentation/hooks/UseRolesList";
import { useUpdateRole } from "@/modules/roles/presentation/hooks/UseUpdateRole";
import CreateEditModal from "@/shared/presentation/ui/CreateEditModal";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconSafetyOutlined } from "@/shared/presentation/ui/Icons";
import PageHeader from "@/shared/presentation/ui/PageHeader";
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
    const createRole = useCreateRole();
    const [selectedRole, setSelectedRole] = useState<IRoleEntity | null>(null);
    const updateRole = useUpdateRole(selectedRole);
    const roleActions = useRoleActions(rolesList.reload);

    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [actionOpen, setActionOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState<RoleAction | null>(null);

    // TODO: implement useIsSuperAdmin hook
    const isSuperAdmin = true;

    const handleAction = useCallback((action: RoleAction, role: IRoleEntity) => {
        setSelectedRole(role);
        if (action === "edit") {
            setEditOpen(true);
        } else {
            setCurrentAction(action);
            setActionOpen(true);
        }
    }, []);

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
                columns={rolesTableColumns(handleAction, isSuperAdmin)}
                loading={rolesList.loading}
                rowSelection={{ type: "checkbox", columnWidth: 48 }}
                pagination={{
                    showSizeChanger: true,
                    current: (rolesList.roles?.pageIndex ?? 0) + 1,
                    pageSize: rolesList.roles?.pageSize ?? 10,
                    total: rolesList.roles?.count ?? 0,
                    onChange: rolesList.onPageChange
                }}
            />

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
                <RoleForm form={createRole.form} error={createRole.error} formContext="CREATE" />
            </CreateEditModal>

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
                />
            </CreateEditModal>

            <RoleActionModal
                open={actionOpen}
                role={selectedRole}
                action={currentAction}
                loading={roleActions.loading}
                error={roleActions.error}
                onConfirm={handleActionConfirm}
                onCancel={() => setActionOpen(false)}
            />
        </>
    );
};

export default RolesListContainer;
