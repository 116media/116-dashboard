import { Table } from "antd";
import type { FC } from "react";
import { useEffect } from "react";
import { useAuthorization } from "@/modules/auth/presentation/hooks/UseAuthorization";
import LyricsForm from "@/modules/lyrics/presentation/components/forms/LyricsForm";
import { lyricsTableColumns } from "@/modules/lyrics/presentation/components/tables/LyricsTable/columns";
import LyricsActionModal from "@/modules/lyrics/presentation/components/ui/LyricsActionModal";
import LyricsSeoModal from "@/modules/lyrics/presentation/components/ui/LyricsSeoModal";
import { useCreateLyrics } from "@/modules/lyrics/presentation/hooks/UseCreateLyrics";
import { useLyricsActions } from "@/modules/lyrics/presentation/hooks/UseLyricsActions";
import { useLyricsList } from "@/modules/lyrics/presentation/hooks/UseLyricsList";
import { useLyricsModals } from "@/modules/lyrics/presentation/hooks/UseLyricsModals";
import { useUpdateLyrics } from "@/modules/lyrics/presentation/hooks/UseUpdateLyrics";
import { useUpdateLyricsSeo } from "@/modules/lyrics/presentation/hooks/UseUpdateLyricsSeo";
import { getVideosAction } from "@/modules/videos/presentation/store/getvideos.action";
import { useResizableColumns } from "@/shared/presentation/hooks/UseResizableColumns";
import { useAppDispatch } from "@/shared/presentation/store/store";
import CreateEditModal from "@/shared/presentation/ui/CreateEditModal";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconFileTextOutlined } from "@/shared/presentation/ui/Icons";
import PageHeader from "@/shared/presentation/ui/PageHeader";
import ResizableTitle from "@/shared/presentation/ui/ResizableTable";
import TableToolbar from "@/shared/presentation/ui/TableToolbar";

/**
 * Container for the lyrics list page.
 *
 * @component
 *
 * @description
 * Orchestrates the lyrics table, create/edit modals, and SEO modal.
 * Uses server-side pagination and search filtering.
 */
const LyricsListContainer: FC = () => {
    const dispatch = useAppDispatch();
    const list = useLyricsList();
    const modals = useLyricsModals(list.reload);
    const actions = useLyricsActions(list.reload);
    const createLyrics = useCreateLyrics(list.reload);
    const updateLyrics = useUpdateLyrics(modals.selectedEntity, list.reload);
    const updateSeo = useUpdateLyricsSeo(modals.selectedEntity, list.reload);
    const { isSuperAdmin, isAdminOrSuperAdmin } = useAuthorization();

    useEffect(() => {
        dispatch(getVideosAction({ pageIndex: 0, pageSize: 200 }));
    }, [dispatch]);

    const { columns: tableColumns } = useResizableColumns(
        lyricsTableColumns(modals.handleAction, isSuperAdmin, isAdminOrSuperAdmin)
    );

    return (
        <>
            <ErrorAlert banner showIcon closable error={list.error} onClose={list.reload} />

            <PageHeader
                title="Paroles"
                icon={<IconFileTextOutlined />}
                createLabel="Créer des paroles"
                subtitle="Gérer les paroles de chansons."
                onCreate={isSuperAdmin ? () => modals.setCreateOpen(true) : undefined}
            />

            <TableToolbar
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
                dataSource={list.lyrics?.items ?? []}
                components={{ header: { cell: ResizableTitle } }}
                rowSelection={{ type: "checkbox", columnWidth: 36 }}
                pagination={{
                    showSizeChanger: true,
                    current: (list.lyrics?.pageIndex ?? 0) + 1,
                    pageSize: list.lyrics?.pageSize ?? 10,
                    total: list.lyrics?.count ?? 0,
                    onChange: list.onPageChange
                }}
            />

            {modals.createOpen && (
                <CreateEditModal
                    width={600}
                    formContext="CREATE"
                    open={modals.createOpen}
                    loading={createLyrics.loading}
                    success={createLyrics.success}
                    onClose={() => modals.setCreateOpen(false)}
                    onSubmit={() => createLyrics.form.submit()}
                    afterClose={() => createLyrics.resetCreate()}
                    title={{
                        create: "Créer des paroles",
                        edit: "Modifier les paroles"
                    }}
                    onSuccessClose={() => {
                        modals.setCreateOpen(false);
                        createLyrics.resetCreate();
                        list.reload();
                    }}
                >
                    <LyricsForm
                        form={createLyrics.form}
                        error={createLyrics.error}
                        onSubmit={createLyrics.onSubmit}
                    />
                </CreateEditModal>
            )}

            {modals.editOpen && (
                <CreateEditModal
                    width={600}
                    formContext="EDIT"
                    open={modals.editOpen}
                    loading={updateLyrics.loading}
                    success={updateLyrics.success}
                    onClose={() => {
                        modals.setEditOpen(false);
                        updateLyrics.resetUpdate();
                    }}
                    onSubmit={() => updateLyrics.form.submit()}
                    afterClose={() => updateLyrics.resetUpdate()}
                    title={{
                        create: "Créer des paroles",
                        edit: "Modifier les paroles"
                    }}
                    onSuccessClose={() => {
                        modals.setEditOpen(false);
                        updateLyrics.resetUpdate();
                        list.reload();
                    }}
                >
                    <LyricsForm
                        form={updateLyrics.form}
                        error={updateLyrics.error}
                        onSubmit={updateLyrics.onSubmit}
                    />
                </CreateEditModal>
            )}

            {modals.seoOpen && (
                <LyricsSeoModal
                    open={modals.seoOpen}
                    form={updateSeo.form}
                    loading={updateSeo.loading}
                    success={updateSeo.success}
                    error={updateSeo.error}
                    onSubmit={updateSeo.onSubmit}
                    onReset={() => updateSeo.resetSeo()}
                    onCancel={() => {
                        modals.setSeoOpen(false);
                        updateSeo.resetSeo();
                    }}
                    onSuccessClose={() => {
                        modals.setSeoOpen(false);
                        updateSeo.resetSeo();
                        list.reload();
                    }}
                />
            )}

            <LyricsActionModal
                error={actions.error}
                open={modals.actionOpen}
                loading={actions.loading}
                action={modals.currentAction}
                lyrics={modals.selectedEntity}
                onConfirm={() =>
                    modals.handleActionConfirm({
                        delete: actions.onDelete
                    })
                }
                onCancel={() => modals.setActionOpen(false)}
                onAfterClose={actions.resetActionError}
            />
        </>
    );
};

export default LyricsListContainer;
