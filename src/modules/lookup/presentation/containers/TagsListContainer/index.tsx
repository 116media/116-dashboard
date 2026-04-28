import { Table } from "antd";
import type { FC } from "react";
import { useAuthorization } from "@/modules/auth/presentation/hooks/UseAuthorization";
import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";
import TagForm from "@/modules/lookup/presentation/components/forms/TagForm";
import type { TagAction } from "@/modules/lookup/presentation/components/tables/TagsTable/columns";
import { tagsTableColumns } from "@/modules/lookup/presentation/components/tables/TagsTable/columns";
import TagActionModal from "@/modules/lookup/presentation/components/ui/TagActionModal";
import { useCreateTag } from "@/modules/lookup/presentation/hooks/UseCreateTag";
import { useLookupModals } from "@/modules/lookup/presentation/hooks/UseLookupModals";
import { useTagActions } from "@/modules/lookup/presentation/hooks/UseTagActions";
import { useTagsList } from "@/modules/lookup/presentation/hooks/UseTagsList";
import { useUpdateTag } from "@/modules/lookup/presentation/hooks/UseUpdateTag";
import { useResizableColumns } from "@/shared/presentation/hooks/UseResizableColumns";
import CreateEditModal from "@/shared/presentation/ui/CreateEditModal";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconTagOutlined } from "@/shared/presentation/ui/Icons";
import PageHeader from "@/shared/presentation/ui/PageHeader";
import ResizableTitle from "@/shared/presentation/ui/ResizableTable";
import TableToolbar from "@/shared/presentation/ui/TableToolbar";

/**
 * Container for the tags list tab.
 *
 * @component
 *
 * @description
 * Orchestrates the tags table, create/edit modals, and delete
 * confirmation modal. Wires all hooks and manages modal state.
 */
const TagsListContainer: FC = () => {
    const list = useTagsList();
    const modals = useLookupModals<ITagEntity, TagAction>();
    const createTag = useCreateTag(list.reload);
    const updateTag = useUpdateTag(modals.selectedEntity, list.reload);
    const tagActions = useTagActions(list.reload);
    const { isSuperAdmin, isAdminOrSuperAdmin } = useAuthorization();

    const { columns: tableColumns } = useResizableColumns(
        tagsTableColumns(modals.handleAction, isSuperAdmin, isAdminOrSuperAdmin)
    );

    return (
        <>
            <ErrorAlert banner showIcon closable error={list.error} onClose={list.reload} />

            <PageHeader
                title="Tags"
                subtitle="Gérer les tags disponibles."
                icon={<IconTagOutlined />}
                onCreate={isAdminOrSuperAdmin ? () => modals.setCreateOpen(true) : undefined}
                createLabel="Créer un tag"
            />

            <TableToolbar
                canFilter={false}
                onSearch={list.onSearch}
                searchLoading={list.loading}
                searchValue={list.searchValue}
                onSearchChange={list.onSearchChange}
            />

            <Table
                rowKey="id"
                loading={list.loading}
                dataSource={list.items}
                columns={tableColumns}
                components={{ header: { cell: ResizableTitle } }}
                rowSelection={{ type: "checkbox", columnWidth: 36 }}
                scroll={{ x: "max-content" }}
                pagination={{ showSizeChanger: true, defaultPageSize: 10 }}
            />

            {modals.createOpen && (
                <CreateEditModal
                    width={420}
                    formContext="CREATE"
                    open={modals.createOpen}
                    loading={createTag.loading}
                    success={createTag.success}
                    onSubmit={() => createTag.form.submit()}
                    onClose={() => modals.setCreateOpen(false)}
                    afterClose={() => createTag.resetCreate()}
                    title={{ create: "Créer un tag", edit: "Modifier le tag" }}
                    onSuccessClose={() => {
                        modals.setCreateOpen(false);
                        createTag.resetCreate();
                        list.reload();
                    }}
                >
                    <TagForm
                        form={createTag.form}
                        error={createTag.error}
                        formContext="CREATE"
                        onSubmit={createTag.onSubmit}
                    />
                </CreateEditModal>
            )}

            {modals.editOpen && (
                <CreateEditModal
                    width={420}
                    formContext="EDIT"
                    open={modals.editOpen}
                    loading={updateTag.loading}
                    success={updateTag.success}
                    onClose={() => {
                        modals.setEditOpen(false);
                        updateTag.resetUpdate();
                    }}
                    onSubmit={() => updateTag.form.submit()}
                    afterClose={() => updateTag.resetUpdate()}
                    title={{ create: "Créer un tag", edit: "Modifier le tag" }}
                    onSuccessClose={() => {
                        modals.setEditOpen(false);
                        updateTag.resetUpdate();
                        list.reload();
                    }}
                >
                    <TagForm
                        form={updateTag.form}
                        error={updateTag.error}
                        formContext="EDIT"
                        initialValues={modals.selectedEntity}
                        onSubmit={updateTag.onSubmit}
                    />
                </CreateEditModal>
            )}

            <TagActionModal
                open={modals.actionOpen}
                tag={modals.selectedEntity}
                action={modals.currentAction}
                loading={tagActions.loading}
                error={tagActions.error}
                onConfirm={() =>
                    modals.handleActionConfirm({
                        delete: tagActions.onDelete
                    })
                }
                onCancel={() => modals.setActionOpen(false)}
            />
        </>
    );
};

export default TagsListContainer;
