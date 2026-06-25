import { Table } from "antd";
import { type FC, useEffect } from "react";
import { useAuthorization } from "@/modules/auth/presentation/hooks/UseAuthorization";
import CategoryForm from "@/modules/catalog/presentation/components/forms/CategoryForm";
import { categoriesTableColumns } from "@/modules/catalog/presentation/components/tables/CategoriesTable/columns";
import CategoryActionModal from "@/modules/catalog/presentation/components/ui/CategoryActionModal";
import CategoryPricingPanel from "@/modules/catalog/presentation/components/ui/CategoryPricingPanel";
import { CATEGORY_STATUS_OPTIONS } from "@/modules/catalog/presentation/constants/catalog.categories.status";
import { useCategoriesList } from "@/modules/catalog/presentation/hooks/UseCategoriesList";
import { useCategoryActions } from "@/modules/catalog/presentation/hooks/UseCategoryActions";
import { useCategoryModals } from "@/modules/catalog/presentation/hooks/UseCategoryModals";
import { useCreateCategory } from "@/modules/catalog/presentation/hooks/UseCreateCategory";
import { useUpdateCategory } from "@/modules/catalog/presentation/hooks/UseUpdateCategory";
import { getContentTypesAction } from "@/modules/lookup/presentation/store/getcontenttypes.action";
import { getPricingTiersAction } from "@/modules/lookup/presentation/store/getpricingtiers.action";
import { useResizableColumns } from "@/shared/presentation/hooks/UseResizableColumns";
import { useAppDispatch } from "@/shared/presentation/store/store";
import CreateEditModal from "@/shared/presentation/ui/CreateEditModal";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconFolderOutlined } from "@/shared/presentation/ui/Icons";
import PageHeader from "@/shared/presentation/ui/PageHeader";
import ResizableTitle from "@/shared/presentation/ui/ResizableTable";
import TableToolbar from "@/shared/presentation/ui/TableToolbar";

/**
 * Container for the categories list tab.
 *
 * @component
 *
 * @description
 * Orchestrates the categories table, create/edit modals, action
 * confirmation modal, and pricing management drawer. Fetches
 * lookup data (content types, pricing tiers) on mount for form
 * Select dropdowns. Uses server-side pagination and status filtering.
 */
const CategoriesListContainer: FC = () => {
    const dispatch = useAppDispatch();
    const list = useCategoriesList();
    const modals = useCategoryModals(list.reload);
    const createCategory = useCreateCategory(list.reload);
    const updateCategory = useUpdateCategory(modals.selectedEntity, list.reload);
    const actions = useCategoryActions(list.reload);
    const { isSuperAdmin, isAdminOrSuperAdmin } = useAuthorization();

    useEffect(() => {
        dispatch(getContentTypesAction());
        dispatch(getPricingTiersAction());
    }, [dispatch]);

    const { columns: tableColumns } = useResizableColumns(
        categoriesTableColumns(modals.handleAction, isSuperAdmin, isAdminOrSuperAdmin)
    );

    return (
        <>
            <ErrorAlert banner showIcon closable error={list.error} onClose={list.reload} />

            <PageHeader
                title="Catégories"
                subtitle="Gérer les catégories de contenu."
                icon={<IconFolderOutlined />}
                onCreate={isSuperAdmin ? () => modals.setCreateOpen(true) : undefined}
                createLabel="Créer une catégorie"
            />

            <TableToolbar
                statusFilter={list.statusFilter}
                onStatusFilterChange={list.onStatusFilterChange}
                statusOptions={CATEGORY_STATUS_OPTIONS}
                searchValue={list.searchValue}
                onSearchChange={list.onSearchChange}
                onSearch={list.onSearch}
                searchLoading={list.loading}
            />

            <Table
                rowKey="id"
                scroll={{ x: "200" }}
                loading={list.loading}
                columns={tableColumns}
                dataSource={list.categories?.items ?? []}
                components={{ header: { cell: ResizableTitle } }}
                rowSelection={{ type: "checkbox", columnWidth: 36 }}
                pagination={{
                    showSizeChanger: true,
                    current: (list.categories?.pageIndex ?? 0) + 1,
                    pageSize: list.categories?.pageSize ?? 10,
                    total: list.categories?.count ?? 0,
                    onChange: list.onPageChange
                }}
            />

            {modals.createOpen && (
                <CreateEditModal
                    width={480}
                    formContext="CREATE"
                    open={modals.createOpen}
                    loading={createCategory.loading}
                    success={createCategory.success}
                    onClose={() => modals.setCreateOpen(false)}
                    onSubmit={() => createCategory.form.submit()}
                    afterClose={() => createCategory.resetCreate()}
                    title={{
                        create: "Créer une catégorie",
                        edit: "Modifier la catégorie"
                    }}
                    onSuccessClose={() => {
                        modals.setCreateOpen(false);
                        createCategory.resetCreate();
                        list.reload();
                    }}
                >
                    <CategoryForm
                        form={createCategory.form}
                        error={createCategory.error}
                        formContext="CREATE"
                        posterFile={createCategory.posterFile}
                        onSubmit={createCategory.onSubmit}
                        onPosterFileChange={createCategory.setPosterFile}
                    />
                </CreateEditModal>
            )}

            {modals.editOpen && (
                <CreateEditModal
                    width={480}
                    formContext="EDIT"
                    open={modals.editOpen}
                    loading={updateCategory.loading}
                    success={updateCategory.success}
                    onClose={() => {
                        modals.setEditOpen(false);
                        updateCategory.resetUpdate();
                    }}
                    onSubmit={() => updateCategory.form.submit()}
                    afterClose={() => updateCategory.resetUpdate()}
                    title={{
                        create: "Créer une catégorie",
                        edit: "Modifier la catégorie"
                    }}
                    onSuccessClose={() => {
                        modals.setEditOpen(false);
                        updateCategory.resetUpdate();
                        list.reload();
                    }}
                >
                    <CategoryForm
                        formContext="EDIT"
                        form={updateCategory.form}
                        error={updateCategory.error}
                        initialValues={modals.selectedEntity}
                        posterFile={updateCategory.posterFile}
                        posterUrl={updateCategory.posterUrl ?? modals.selectedEntity?.posterUrl}
                        onSubmit={updateCategory.onSubmit}
                        onPosterFileChange={updateCategory.setPosterFile}
                    />
                </CreateEditModal>
            )}

            <CategoryActionModal
                open={modals.actionOpen}
                category={modals.selectedEntity}
                action={modals.currentAction}
                loading={actions.loading}
                error={actions.error}
                onConfirm={() =>
                    modals.handleActionConfirm({
                        activate: actions.onActivate,
                        deactivate: actions.onDeactivate,
                        setExclusive: actions.onSetExclusive
                    })
                }
                onCancel={() => modals.setActionOpen(false)}
                onAfterClose={actions.resetActionError}
            />

            <CategoryPricingPanel
                open={modals.pricingOpen}
                loading={modals.refreshLoading}
                category={modals.selectedEntity}
                onClose={() => modals.setPricingOpen(false)}
                onSuccess={modals.refreshSelectedEntity}
            />
        </>
    );
};

export default CategoriesListContainer;
