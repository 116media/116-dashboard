import { Table } from "antd";
import { type FC, useState } from "react";
import { useAuthorization } from "@/modules/auth/presentation/hooks/UseAuthorization";
import TagForm from "@/modules/lookup/presentation/components/forms/TagForm";
import { tagsTableColumns } from "@/modules/lookup/presentation/components/tables/TagsTable/columns";
import { useCreateTag } from "@/modules/lookup/presentation/hooks/UseCreateTag";
import { useTagsList } from "@/modules/lookup/presentation/hooks/UseTagsList";
import { useResizableColumns } from "@/shared/presentation/hooks/UseResizableColumns";
import CreateEditModal from "@/shared/presentation/ui/CreateEditModal";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconTagOutlined } from "@/shared/presentation/ui/Icons";
import PageHeader from "@/shared/presentation/ui/PageHeader";
import ResizableTitle from "@/shared/presentation/ui/ResizableTable";

/**
 * Container for the tags list tab.
 *
 * @component
 *
 * @description
 * Orchestrates the tags table and create modal. Tags have no
 * status filter, no edit, no action modal, and no search.
 * Only a create modal is available.
 */
const TagsListContainer: FC = () => {
    const list = useTagsList();
    const createTag = useCreateTag();

    const [createOpen, setCreateOpen] = useState(false);

    const { isSuperAdmin } = useAuthorization();

    const { columns: tableColumns } = useResizableColumns(tagsTableColumns());

    return (
        <>
            <ErrorAlert banner showIcon closable error={list.error} onClose={list.reload} />

            <PageHeader
                title="Tags"
                subtitle="Gérer les tags disponibles."
                icon={<IconTagOutlined />}
                onCreate={isSuperAdmin ? () => setCreateOpen(true) : undefined}
                createLabel="Créer un tag"
            />

            <Table
                rowKey="id"
                loading={list.loading}
                dataSource={list.items}
                columns={tableColumns}
                components={{ header: { cell: ResizableTitle } }}
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
                    <TagForm form={createTag.form} error={createTag.error} formContext="CREATE" />
                </CreateEditModal>
            )}
        </>
    );
};

export default TagsListContainer;
