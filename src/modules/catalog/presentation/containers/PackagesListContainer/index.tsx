import { Table } from "antd";
import type { FC } from "react";
import { useAuthorization } from "@/modules/auth/presentation/hooks/UseAuthorization";
import PackageForm from "@/modules/catalog/presentation/components/forms/PackageForm";
import { packagesTableColumns } from "@/modules/catalog/presentation/components/tables/PackagesTable/columns";
import PackageActionModal from "@/modules/catalog/presentation/components/ui/PackageActionModal";
import PackageSlotsPanel from "@/modules/catalog/presentation/components/ui/PackageSlotsPanel";
import { PACKAGE_STATUS_OPTIONS } from "@/modules/catalog/presentation/constants/catalog.packages.status";
import { useCreatePackage } from "@/modules/catalog/presentation/hooks/UseCreatePackage";
import { usePackageActions } from "@/modules/catalog/presentation/hooks/UsePackageActions";
import { usePackageModals } from "@/modules/catalog/presentation/hooks/UsePackageModals";
import { usePackagesList } from "@/modules/catalog/presentation/hooks/UsePackagesList";
import { useResizableColumns } from "@/shared/presentation/hooks/UseResizableColumns";
import CreateEditModal from "@/shared/presentation/ui/CreateEditModal";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconInboxOutlined } from "@/shared/presentation/ui/Icons";
import PageHeader from "@/shared/presentation/ui/PageHeader";
import ResizableTitle from "@/shared/presentation/ui/ResizableTable";
import TableToolbar from "@/shared/presentation/ui/TableToolbar";

/**
 * Container for the packages list tab.
 *
 * @component
 *
 * @description
 * Orchestrates the packages table, create modal, action
 * confirmation modal, and slots management drawer. Packages
 * have no edit — only create, activate/deactivate, and
 * slot management. Uses server-side pagination and status filtering.
 */
const PackagesListContainer: FC = () => {
    const list = usePackagesList();
    const modals = usePackageModals(list.reload);
    const createPackage = useCreatePackage(list.reload);
    const actions = usePackageActions(list.reload);
    const { isSuperAdmin, isAdminOrSuperAdmin } = useAuthorization();

    const { columns: tableColumns } = useResizableColumns(
        packagesTableColumns(modals.handleAction, isSuperAdmin, isAdminOrSuperAdmin)
    );

    return (
        <>
            <ErrorAlert banner showIcon closable error={list.error} onClose={list.reload} />

            <PageHeader
                title="Packages"
                subtitle="Gérer les offres groupées."
                icon={<IconInboxOutlined />}
                onCreate={isSuperAdmin ? () => modals.setCreateOpen(true) : undefined}
                createLabel="Créer un package"
            />

            <TableToolbar
                statusFilter={list.statusFilter}
                onStatusFilterChange={list.onStatusFilterChange}
                statusOptions={PACKAGE_STATUS_OPTIONS}
                searchValue={list.searchValue}
                onSearchChange={list.onSearchChange}
                onSearch={list.onSearch}
                searchLoading={list.loading}
            />

            <Table
                rowKey="id"
                scroll={{ x: 200 }}
                loading={list.loading}
                columns={tableColumns}
                dataSource={list.packages?.items ?? []}
                components={{ header: { cell: ResizableTitle } }}
                rowSelection={{ type: "checkbox", columnWidth: 36 }}
                pagination={{
                    showSizeChanger: true,
                    current: (list.packages?.pageIndex ?? 0) + 1,
                    pageSize: list.packages?.pageSize ?? 10,
                    total: list.packages?.count ?? 0,
                    onChange: list.onPageChange
                }}
            />

            {modals.createOpen && (
                <CreateEditModal
                    width={480}
                    formContext="CREATE"
                    open={modals.createOpen}
                    loading={createPackage.loading}
                    success={createPackage.success}
                    onClose={() => modals.setCreateOpen(false)}
                    onSubmit={() => createPackage.form.submit()}
                    afterClose={() => createPackage.resetCreate()}
                    title={{
                        create: "Créer un package",
                        edit: "Modifier le package"
                    }}
                    onSuccessClose={() => {
                        modals.setCreateOpen(false);
                        createPackage.resetCreate();
                        list.reload();
                    }}
                >
                    <PackageForm
                        form={createPackage.form}
                        error={createPackage.error}
                        onSubmit={createPackage.onSubmit}
                    />
                </CreateEditModal>
            )}

            <PackageActionModal
                open={modals.actionOpen}
                bundle={modals.selectedEntity}
                action={modals.currentAction}
                loading={actions.loading}
                error={actions.error}
                onConfirm={() =>
                    modals.handleActionConfirm({
                        activate: actions.onActivate,
                        deactivate: actions.onDeactivate
                    })
                }
                onCancel={() => modals.setActionOpen(false)}
                onAfterClose={actions.resetActionError}
            />

            <PackageSlotsPanel
                open={modals.slotsOpen}
                loading={modals.refreshLoading}
                bundle={modals.selectedEntity}
                onClose={() => modals.setSlotsOpen(false)}
                onSuccess={modals.refreshSelectedEntity}
            />
        </>
    );
};

export default PackagesListContainer;
