import { Table } from "antd";
import type { FC } from "react";
import { useAuthorization } from "@/modules/auth/presentation/hooks/UseAuthorization";
import ShortVideoForm from "@/modules/shorts/presentation/components/forms/ShortVideoForm";
import { shortsTableColumns } from "@/modules/shorts/presentation/components/tables/ShortsTable/columns";
import ShortActionModal from "@/modules/shorts/presentation/components/ui/ShortActionModal";
import ShortThumbnailUploadModal from "@/modules/shorts/presentation/components/ui/ShortThumbnailUploadModal";
import { SHORT_STATUS_OPTIONS } from "@/modules/shorts/presentation/constants/shorts.status";
import { useCreateShort } from "@/modules/shorts/presentation/hooks/UseCreateShort";
import { useShortActions } from "@/modules/shorts/presentation/hooks/UseShortActions";
import { useShortModals } from "@/modules/shorts/presentation/hooks/UseShortModals";
import { useShortsList } from "@/modules/shorts/presentation/hooks/UseShortsList";
import { uploadShortThumbnailAction } from "@/modules/shorts/presentation/store/uploadshortthumbnail.action";
import { ShortsNotification } from "@/modules/shorts/presentation/utils/notification/shorts.notification";
import { useResizableColumns } from "@/shared/presentation/hooks/UseResizableColumns";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import CreateEditModal from "@/shared/presentation/ui/CreateEditModal";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconPlaySquareOutlined } from "@/shared/presentation/ui/Icons";
import PageHeader from "@/shared/presentation/ui/PageHeader";
import ResizableTitle from "@/shared/presentation/ui/ResizableTable";
import TableToolbar from "@/shared/presentation/ui/TableToolbar";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Container for the shorts list page.
 *
 * @component
 *
 * @description
 * Orchestrates the shorts table, create modal, action confirmation modal,
 * and thumbnail upload modal. Uses server-side pagination and client-side
 * status filtering (active/inactive).
 */
const ShortsListContainer: FC = () => {
    const dispatch = useAppDispatch();
    const list = useShortsList();
    const modals = useShortModals(list.reload);
    const createShort = useCreateShort(list.reload);
    const actions = useShortActions(list.reload);
    const { isSuperAdmin } = useAuthorization();

    const { loading: thumbnailLoading } = useAppSelector(
        ({ shorts: { uploadShortThumbnail } }) => uploadShortThumbnail
    );

    const handleThumbnailUpload = async (id: string, file: File) => {
        const result = await dispatch(uploadShortThumbnailAction({ id, data: { file } }));

        if (uploadShortThumbnailAction.fulfilled.match(result)) {
            showNotification(ShortsNotification.uploadThumbnailSuccess);
            modals.setThumbnailOpen(false);
            list.reload();
        } else if (uploadShortThumbnailAction.rejected.match(result) && result.payload) {
            showNotification({
                type: "error",
                title: result.payload.title,
                description: result.payload.detail
            });
        }
    };

    const { columns: tableColumns } = useResizableColumns(
        shortsTableColumns(modals.handleAction, isSuperAdmin)
    );

    return (
        <>
            <ErrorAlert banner showIcon closable error={list.error} onClose={list.reload} />

            <PageHeader
                title="Réels"
                icon={<IconPlaySquareOutlined />}
                subtitle="Gérer les vidéos courtes."
                onCreate={isSuperAdmin ? () => modals.setCreateOpen(true) : undefined}
                createLabel="Créer un réel"
            />

            <TableToolbar
                statusFilter={list.statusFilter}
                onStatusFilterChange={list.onStatusFilterChange}
                statusOptions={SHORT_STATUS_OPTIONS}
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
                dataSource={list.shorts?.items ?? []}
                components={{ header: { cell: ResizableTitle } }}
                rowSelection={{ type: "checkbox", columnWidth: 36 }}
                pagination={{
                    showSizeChanger: true,
                    current: (list.shorts?.pageIndex ?? 0) + 1,
                    pageSize: list.shorts?.pageSize ?? 10,
                    total: list.shorts?.count ?? 0,
                    onChange: list.onPageChange
                }}
            />

            {modals.createOpen && (
                <CreateEditModal
                    width={480}
                    open={modals.createOpen}
                    formContext="CREATE"
                    loading={createShort.loading}
                    success={createShort.success}
                    onClose={() => modals.setCreateOpen(false)}
                    onSubmit={() => createShort.form.submit()}
                    title={{
                        create: "Créer un réel",
                        edit: "Modifier le réel"
                    }}
                    onSuccessClose={() => {
                        modals.setCreateOpen(false);
                        createShort.resetCreate();
                        list.reload();
                    }}
                >
                    <ShortVideoForm
                        form={createShort.form}
                        error={createShort.error}
                        videoFile={createShort.videoFile}
                        onVideoFileChange={createShort.setVideoFile}
                        onSubmit={createShort.onSubmit}
                    />
                </CreateEditModal>
            )}

            <ShortActionModal
                open={modals.actionOpen}
                action={modals.currentAction}
                short={modals.selectedEntity}
                loading={actions.loading}
                error={actions.error}
                onConfirm={() =>
                    modals.handleActionConfirm({
                        activate: actions.onActivate,
                        deactivate: actions.onDeactivate,
                        delete: actions.onDelete
                    })
                }
                onCancel={() => modals.setActionOpen(false)}
            />

            {modals.thumbnailOpen && (
                <ShortThumbnailUploadModal
                    open={modals.thumbnailOpen}
                    loading={thumbnailLoading}
                    shortId={modals.selectedEntity?.id ?? null}
                    onUpload={handleThumbnailUpload}
                    onCancel={() => modals.setThumbnailOpen(false)}
                />
            )}
        </>
    );
};

export default ShortsListContainer;
