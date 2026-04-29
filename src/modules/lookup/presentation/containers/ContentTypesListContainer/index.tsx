import { Table } from "antd";
import type { FC } from "react";
import { useAuthorization } from "@/modules/auth/presentation/hooks/UseAuthorization";
import type { IContentTypeEntity } from "@/modules/lookup/domain/entities/IContentTypeEntity";
import ContentTypeForm from "@/modules/lookup/presentation/components/forms/ContentTypeForm";
import type { ContentTypeAction } from "@/modules/lookup/presentation/components/tables/ContentTypesTable/columns";
import { contentTypesTableColumns } from "@/modules/lookup/presentation/components/tables/ContentTypesTable/columns";
import ContentTypeActionModal from "@/modules/lookup/presentation/components/ui/ContentTypeActionModal";
import { CONTENT_TYPE_STATUS_OPTIONS } from "@/modules/lookup/presentation/constants/lookup.content-types.status";
import { useContentTypeActions } from "@/modules/lookup/presentation/hooks/UseContentTypeActions";
import { useContentTypesList } from "@/modules/lookup/presentation/hooks/UseContentTypesList";
import { useCreateContentType } from "@/modules/lookup/presentation/hooks/UseCreateContentType";
import { useLookupModals } from "@/modules/lookup/presentation/hooks/UseLookupModals";
import { useUpdateContentType } from "@/modules/lookup/presentation/hooks/UseUpdateContentType";
import { useResizableColumns } from "@/shared/presentation/hooks/UseResizableColumns";
import CreateEditModal from "@/shared/presentation/ui/CreateEditModal";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconAppstoreOutlined } from "@/shared/presentation/ui/Icons";
import PageHeader from "@/shared/presentation/ui/PageHeader";
import ResizableTitle from "@/shared/presentation/ui/ResizableTable";
import TableToolbar from "@/shared/presentation/ui/TableToolbar";

/**
 * Container for the content types list tab.
 *
 * @component
 *
 * @description
 * Orchestrates the content types table, create/edit modals, and action
 * confirmation modal. Wires all hooks and manages modal state.
 * Uses client-side status filtering with no pagination or search.
 */
const ContentTypesListContainer: FC = () => {
    const list = useContentTypesList();
    const modals = useLookupModals<IContentTypeEntity, ContentTypeAction>();
    const createContentType = useCreateContentType(list.reload);
    const updateContentType = useUpdateContentType(modals.selectedEntity, list.reload);
    const actions = useContentTypeActions(list.reload);
    const { isSuperAdmin, isAdminOrSuperAdmin } = useAuthorization();

    const { columns: tableColumns } = useResizableColumns(
        contentTypesTableColumns(modals.handleAction, isSuperAdmin, isAdminOrSuperAdmin)
    );

    return (
        <>
            <ErrorAlert banner showIcon closable error={list.error} onClose={list.reload} />

            <PageHeader
                title="Types de contenu"
                subtitle="Gérer les types de contenu disponibles."
                icon={<IconAppstoreOutlined />}
                onCreate={isSuperAdmin ? () => modals.setCreateOpen(true) : undefined}
                createLabel="Créer un type"
            />

            <TableToolbar
                statusFilter={list.statusFilter}
                onStatusFilterChange={list.onStatusFilterChange}
                statusOptions={CONTENT_TYPE_STATUS_OPTIONS}
                searchValue={list.searchValue}
                onSearchChange={list.onSearchChange}
                onSearch={list.onSearch}
                searchLoading={list.loading}
            />

            <Table
                rowKey="id"
                loading={list.loading}
                dataSource={list.items}
                columns={tableColumns}
                rowSelection={{ type: "checkbox", columnWidth: 36 }}
                scroll={{ x: "max-content" }}
                components={{ header: { cell: ResizableTitle } }}
                pagination={{ showSizeChanger: true, defaultPageSize: 10 }}
            />

            {modals.createOpen && (
                <CreateEditModal
                    width={420}
                    open={modals.createOpen}
                    formContext="CREATE"
                    loading={createContentType.loading}
                    success={createContentType.success}
                    onClose={() => modals.setCreateOpen(false)}
                    onSubmit={() => createContentType.form.submit()}
                    title={{
                        create: "Créer un type de contenu",
                        edit: "Modifier le type de contenu"
                    }}
                    onSuccessClose={() => {
                        modals.setCreateOpen(false);
                        createContentType.resetCreate();
                        list.reload();
                    }}
                >
                    <ContentTypeForm
                        form={createContentType.form}
                        error={createContentType.error}
                        formContext="CREATE"
                        onSubmit={createContentType.onSubmit}
                    />
                </CreateEditModal>
            )}

            {modals.editOpen && (
                <CreateEditModal
                    width={420}
                    open={modals.editOpen}
                    formContext="EDIT"
                    loading={updateContentType.loading}
                    success={updateContentType.success}
                    onClose={() => {
                        modals.setEditOpen(false);
                        updateContentType.resetUpdate();
                    }}
                    onSubmit={() => updateContentType.form.submit()}
                    title={{
                        create: "Créer un type de contenu",
                        edit: "Modifier le type de contenu"
                    }}
                    onSuccessClose={() => {
                        modals.setEditOpen(false);
                        updateContentType.resetUpdate();
                        list.reload();
                    }}
                >
                    <ContentTypeForm
                        formContext="EDIT"
                        form={updateContentType.form}
                        error={updateContentType.error}
                        initialValues={modals.selectedEntity}
                        onSubmit={updateContentType.onSubmit}
                    />
                </CreateEditModal>
            )}

            <ContentTypeActionModal
                open={modals.actionOpen}
                error={actions.error}
                action={modals.currentAction}
                loading={actions.loading}
                contentType={modals.selectedEntity}
                onConfirm={() =>
                    modals.handleActionConfirm({
                        activate: actions.onActivate,
                        deactivate: actions.onDeactivate
                    })
                }
                onCancel={() => modals.setActionOpen(false)}
            />
        </>
    );
};

export default ContentTypesListContainer;
