import { Table } from "antd";
import { type FC, useCallback, useEffect, useState } from "react";
import { useAuthorization } from "@/modules/auth/presentation/hooks/UseAuthorization";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import CategoryForm from "@/modules/catalog/presentation/components/forms/CategoryForm";
import type { CategoryAction } from "@/modules/catalog/presentation/components/tables/CategoriesTable/columns";
import { categoriesTableColumns } from "@/modules/catalog/presentation/components/tables/CategoriesTable/columns";
import CategoryActionModal from "@/modules/catalog/presentation/components/ui/CategoryActionModal";
import { CATEGORY_STATUS_OPTIONS } from "@/modules/catalog/presentation/constants/catalog.categories.status";
import { useCategoriesList } from "@/modules/catalog/presentation/hooks/UseCategoriesList";
import { useCategoryActions } from "@/modules/catalog/presentation/hooks/UseCategoryActions";
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

const CategoriesListContainer: FC = () => {
    const dispatch = useAppDispatch();
    const list = useCategoriesList();

    useEffect(() => {
        dispatch(getContentTypesAction());
        dispatch(getPricingTiersAction());
    }, [dispatch]);
    const createCategory = useCreateCategory(list.reload);
    const [selectedEntity, setSelectedEntity] = useState<ICategoryEntity | null>(null);
    const updateCategory = useUpdateCategory(selectedEntity, list.reload);
    const actions = useCategoryActions(list.reload);

    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [actionOpen, setActionOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState<CategoryAction | null>(null);

    const { isSuperAdmin, isAdminOrSuperAdmin } = useAuthorization();

    const handleAction = useCallback((action: CategoryAction, entity: ICategoryEntity) => {
        setSelectedEntity(entity);

        switch (action) {
            case "edit":
                setEditOpen(true);
                break;
            default:
                setCurrentAction(action);
                setActionOpen(true);
                break;
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
        categoriesTableColumns(handleAction, isSuperAdmin, isAdminOrSuperAdmin)
    );

    return (
        <>
            <ErrorAlert banner showIcon closable error={list.error} onClose={list.reload} />

            <PageHeader
                title="Catégories"
                subtitle="Gérer les catégories de contenu."
                icon={<IconFolderOutlined />}
                onCreate={isSuperAdmin ? () => setCreateOpen(true) : undefined}
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
                loading={list.loading}
                dataSource={list.categories?.items ?? []}
                columns={tableColumns}
                components={{ header: { cell: ResizableTitle } }}
                rowSelection={{ type: "checkbox", columnWidth: 36 }}
                scroll={{ x: "max-content" }}
                pagination={{
                    showSizeChanger: true,
                    current: (list.categories?.pageIndex ?? 0) + 1,
                    pageSize: list.categories?.pageSize ?? 10,
                    total: list.categories?.count ?? 0,
                    onChange: list.onPageChange
                }}
            />

            {createOpen && (
                <CreateEditModal
                    width={480}
                    open={createOpen}
                    formContext="CREATE"
                    loading={createCategory.loading}
                    success={createCategory.success}
                    onClose={() => setCreateOpen(false)}
                    onSubmit={() => createCategory.form.submit()}
                    title={{
                        create: "Créer une catégorie",
                        edit: "Modifier la catégorie"
                    }}
                    onSuccessClose={() => {
                        setCreateOpen(false);
                        createCategory.resetCreate();
                        list.reload();
                    }}
                >
                    <CategoryForm
                        form={createCategory.form}
                        error={createCategory.error}
                        formContext="CREATE"
                        onSubmit={createCategory.onSubmit}
                    />
                </CreateEditModal>
            )}

            {editOpen && (
                <CreateEditModal
                    width={480}
                    open={editOpen}
                    formContext="EDIT"
                    loading={updateCategory.loading}
                    success={updateCategory.success}
                    onClose={() => {
                        setEditOpen(false);
                        updateCategory.resetUpdate();
                    }}
                    onSubmit={() => updateCategory.form.submit()}
                    title={{
                        create: "Créer une catégorie",
                        edit: "Modifier la catégorie"
                    }}
                    onSuccessClose={() => {
                        setEditOpen(false);
                        updateCategory.resetUpdate();
                        list.reload();
                    }}
                >
                    <CategoryForm
                        formContext="EDIT"
                        form={updateCategory.form}
                        error={updateCategory.error}
                        initialValues={selectedEntity}
                        onSubmit={updateCategory.onSubmit}
                    />
                </CreateEditModal>
            )}

            <CategoryActionModal
                open={actionOpen}
                category={selectedEntity}
                action={currentAction}
                loading={actions.loading}
                error={actions.error}
                onConfirm={handleActionConfirm}
                onCancel={() => setActionOpen(false)}
            />
        </>
    );
};

export default CategoriesListContainer;
