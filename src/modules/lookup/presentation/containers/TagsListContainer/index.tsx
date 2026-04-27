import { Table } from "antd";
import { type FC, useCallback, useState } from "react";
import { useAuthorization } from "@/modules/auth/presentation/hooks/UseAuthorization";
import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";
import TagForm from "@/modules/lookup/presentation/components/forms/TagForm";
import type { TagAction } from "@/modules/lookup/presentation/components/tables/TagsTable/columns";
import { tagsTableColumns } from "@/modules/lookup/presentation/components/tables/TagsTable/columns";
import TagActionModal from "@/modules/lookup/presentation/components/ui/TagActionModal";
import { useCreateTag } from "@/modules/lookup/presentation/hooks/UseCreateTag";
import { useTagActions } from "@/modules/lookup/presentation/hooks/UseTagActions";
import { useTagsList } from "@/modules/lookup/presentation/hooks/UseTagsList";
import { useUpdateTag } from "@/modules/lookup/presentation/hooks/UseUpdateTag";
import { useResizableColumns } from "@/shared/presentation/hooks/UseResizableColumns";
import CreateEditModal from "@/shared/presentation/ui/CreateEditModal";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconTagOutlined } from "@/shared/presentation/ui/Icons";
import PageHeader from "@/shared/presentation/ui/PageHeader";
import ResizableTitle from "@/shared/presentation/ui/ResizableTable";
import TableSearchInput from "@/shared/presentation/ui/TableSearchInput";

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
    const createTag = useCreateTag(list.reload);
    const [selectedEntity, setSelectedEntity] = useState<ITagEntity | null>(null);
    const updateTag = useUpdateTag(selectedEntity, list.reload);
    const tagActions = useTagActions(list.reload);

    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [actionOpen, setActionOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState<TagAction | null>(null);

    const { isSuperAdmin, isAdminOrSuperAdmin } = useAuthorization();

    const handleAction = useCallback((action: TagAction, entity: ITagEntity) => {
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

        if (currentAction === "delete") {
            await tagActions.onDelete(selectedEntity.id);
            setActionOpen(false);
        }
    };

    const { columns: tableColumns } = useResizableColumns(
        tagsTableColumns(handleAction, isSuperAdmin, isAdminOrSuperAdmin)
    );

    return (
        <>
            <ErrorAlert banner showIcon closable error={list.error} onClose={list.reload} />

            <PageHeader
                title="Tags"
                subtitle="Gérer les tags disponibles."
                icon={<IconTagOutlined />}
                onCreate={isAdminOrSuperAdmin ? () => setCreateOpen(true) : undefined}
                createLabel="Créer un tag"
            />

            <TableSearchInput
                value={list.searchValue}
                onChange={list.onSearchChange}
                onSearch={list.onSearch}
                loading={list.loading}
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

            {createOpen && (
                <CreateEditModal
                    width={420}
                    open={createOpen}
                    formContext="CREATE"
                    loading={createTag.loading}
                    success={createTag.success}
                    onClose={() => setCreateOpen(false)}
                    onSubmit={() => createTag.form.submit()}
                    title={{ create: "Créer un tag", edit: "Modifier le tag" }}
                    onSuccessClose={() => {
                        setCreateOpen(false);
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

            {editOpen && (
                <CreateEditModal
                    width={420}
                    open={editOpen}
                    formContext="EDIT"
                    loading={updateTag.loading}
                    success={updateTag.success}
                    onClose={() => {
                        setEditOpen(false);
                        updateTag.resetUpdate();
                    }}
                    onSubmit={() => updateTag.form.submit()}
                    title={{ create: "Créer un tag", edit: "Modifier le tag" }}
                    onSuccessClose={() => {
                        setEditOpen(false);
                        updateTag.resetUpdate();
                        list.reload();
                    }}
                >
                    <TagForm
                        form={updateTag.form}
                        error={updateTag.error}
                        formContext="EDIT"
                        initialValues={selectedEntity}
                        onSubmit={updateTag.onSubmit}
                    />
                </CreateEditModal>
            )}

            <TagActionModal
                open={actionOpen}
                tag={selectedEntity}
                action={currentAction}
                loading={tagActions.loading}
                error={tagActions.error}
                onConfirm={handleActionConfirm}
                onCancel={() => setActionOpen(false)}
            />
        </>
    );
};

export default TagsListContainer;
