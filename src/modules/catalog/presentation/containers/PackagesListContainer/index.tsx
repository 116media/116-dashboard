import { Table } from "antd";
import { type FC, useCallback, useState } from "react";
import { useAuthorization } from "@/modules/auth/presentation/hooks/UseAuthorization";
import type { IPackageEntity } from "@/modules/catalog/domain/entities/IPackageEntity";
import PackageForm from "@/modules/catalog/presentation/components/forms/PackageForm";
import type { PackageAction } from "@/modules/catalog/presentation/components/tables/PackagesTable/columns";
import { packagesTableColumns } from "@/modules/catalog/presentation/components/tables/PackagesTable/columns";
import PackageActionModal from "@/modules/catalog/presentation/components/ui/PackageActionModal";
import PackageSlotsPanel from "@/modules/catalog/presentation/components/ui/PackageSlotsPanel";
import { PACKAGE_STATUS_OPTIONS } from "@/modules/catalog/presentation/constants/catalog.packages.status";
import { useCreatePackage } from "@/modules/catalog/presentation/hooks/UseCreatePackage";
import { usePackageActions } from "@/modules/catalog/presentation/hooks/UsePackageActions";
import { usePackagesList } from "@/modules/catalog/presentation/hooks/UsePackagesList";
import { getPackageByIdAction } from "@/modules/catalog/presentation/store/getpackagebyid.action";
import { useResizableColumns } from "@/shared/presentation/hooks/UseResizableColumns";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
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
    const dispatch = useAppDispatch();
    const list = usePackagesList();
    const { loading: packageLoading } = useAppSelector(
        ({ catalog: { getPackageById } }) => getPackageById
    );
    const createPackage = useCreatePackage(list.reload);
    const actions = usePackageActions(list.reload);

    const [selectedEntity, setSelectedEntity] = useState<IPackageEntity | null>(null);
    const [createOpen, setCreateOpen] = useState(false);
    const [actionOpen, setActionOpen] = useState(false);
    const [slotsOpen, setSlotsOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState<PackageAction | null>(null);

    const { isSuperAdmin, isAdminOrSuperAdmin } = useAuthorization();

    const refreshSelectedPackage = useCallback(async () => {
        if (!selectedEntity) return;
        const result = await dispatch(getPackageByIdAction(selectedEntity.id));
        if (getPackageByIdAction.fulfilled.match(result)) {
            setSelectedEntity(result.payload);
        }
        list.reload();
    }, [dispatch, selectedEntity, list.reload]);

    const handleAction = useCallback((action: PackageAction, entity: IPackageEntity) => {
        setSelectedEntity(entity);

        if (action === "manageSlots") setSlotsOpen(true);
        else {
            setCurrentAction(action);
            setActionOpen(true);
        }
    }, []);

    const handleActionConfirm = async () => {
        if (!selectedEntity || !currentAction) return;

        const actionMap = {
            activate: actions.onActivate,
            deactivate: actions.onDeactivate
        } as const;

        const handler = actionMap[currentAction as keyof typeof actionMap];
        if (handler) {
            await handler(selectedEntity.id);
            setActionOpen(false);
        }
    };

    const { columns: tableColumns } = useResizableColumns(
        packagesTableColumns(handleAction, isSuperAdmin, isAdminOrSuperAdmin)
    );

    return (
        <>
            <ErrorAlert banner showIcon closable error={list.error} onClose={list.reload} />

            <PageHeader
                title="Packages"
                subtitle="Gérer les offres groupées."
                icon={<IconInboxOutlined />}
                onCreate={isSuperAdmin ? () => setCreateOpen(true) : undefined}
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

            {createOpen && (
                <CreateEditModal
                    width={480}
                    open={createOpen}
                    formContext="CREATE"
                    loading={createPackage.loading}
                    success={createPackage.success}
                    onClose={() => setCreateOpen(false)}
                    onSubmit={() => createPackage.form.submit()}
                    title={{
                        create: "Créer un package",
                        edit: "Modifier le package"
                    }}
                    onSuccessClose={() => {
                        setCreateOpen(false);
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
                open={actionOpen}
                bundle={selectedEntity}
                action={currentAction}
                loading={actions.loading}
                error={actions.error}
                onConfirm={handleActionConfirm}
                onCancel={() => setActionOpen(false)}
            />

            <PackageSlotsPanel
                open={slotsOpen}
                loading={packageLoading}
                bundle={selectedEntity}
                onClose={() => setSlotsOpen(false)}
                onSuccess={refreshSelectedPackage}
            />
        </>
    );
};

export default PackagesListContainer;
