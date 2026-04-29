import { Table } from "antd";
import { type FC, useEffect } from "react";
import { useAuthorization } from "@/modules/auth/presentation/hooks/UseAuthorization";
import { getAllCategoriesAction } from "@/modules/catalog/presentation/store/getallcategories.action";
import { getAllCustomersAction } from "@/modules/catalog/presentation/store/getallcustomers.action";
import { getTagsAction } from "@/modules/lookup/presentation/store/gettags.action";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import VideoDetailsForm from "@/modules/videos/presentation/components/forms/VideoDetailsForm";
import { videosTableColumns } from "@/modules/videos/presentation/components/tables/VideosTable/columns";
import ShootScheduleModal from "@/modules/videos/presentation/components/ui/ShootScheduleModal";
import VideoCreateWizard from "@/modules/videos/presentation/components/ui/VideoCreateWizard";
import VideoSeoModal from "@/modules/videos/presentation/components/ui/VideoSeoModal";
import VideoTagsModal from "@/modules/videos/presentation/components/ui/VideoTagsModal";
import VideoThumbnailUploadModal from "@/modules/videos/presentation/components/ui/VideoThumbnailUploadModal";
import VideoWorkflowModal from "@/modules/videos/presentation/components/ui/VideoWorkflowModal";
import YoutubeIdModal from "@/modules/videos/presentation/components/ui/YoutubeIdModal";
import { VIDEO_STATUS_OPTIONS } from "@/modules/videos/presentation/constants/videos.status";
import { useAttachYoutubeId } from "@/modules/videos/presentation/hooks/UseAttachYoutubeId";
import { useScheduleShoot } from "@/modules/videos/presentation/hooks/UseScheduleShoot";
import { useUpdateVideo } from "@/modules/videos/presentation/hooks/UseUpdateVideo";
import { useUpdateVideoSeo } from "@/modules/videos/presentation/hooks/UseUpdateVideoSeo";
import { useUpdateVideoTags } from "@/modules/videos/presentation/hooks/UseUpdateVideoTags";
import { useUploadVideoThumbnail } from "@/modules/videos/presentation/hooks/UseUploadVideoThumbnail";
import { useVideoModals } from "@/modules/videos/presentation/hooks/UseVideoModals";
import { useVideosList } from "@/modules/videos/presentation/hooks/UseVideosList";
import { useVideoWorkflow } from "@/modules/videos/presentation/hooks/UseVideoWorkflow";
import { useResizableColumns } from "@/shared/presentation/hooks/UseResizableColumns";
import { useAppDispatch } from "@/shared/presentation/store/store";
import CreateEditModal from "@/shared/presentation/ui/CreateEditModal";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconVideoCameraFilled } from "@/shared/presentation/ui/Icons";
import PageHeader from "@/shared/presentation/ui/PageHeader";
import ResizableTitle from "@/shared/presentation/ui/ResizableTable";
import TableToolbar from "@/shared/presentation/ui/TableToolbar";

/**
 * Container for the videos list page.
 *
 * @component
 *
 * @description
 * Orchestrates the videos table, create/edit modals, workflow
 * confirmation modal, SEO modal, tags modal, thumbnail upload modal,
 * YouTube ID modal, and shoot schedule modal.
 * Fetches lookup data (categories, tags) on mount for form dropdowns.
 * Uses server-side pagination and status filtering.
 */
const VideosListContainer: FC = () => {
    const dispatch = useAppDispatch();
    const list = useVideosList();
    const modals = useVideoModals(list.reload);
    const updateVideo = useUpdateVideo(modals.selectedEntity as IVideoEntity | null, list.reload);
    const updateSeo = useUpdateVideoSeo(modals.selectedEntity as IVideoEntity | null, list.reload);
    const updateTags = useUpdateVideoTags(
        modals.selectedEntity as IVideoEntity | null,
        list.reload
    );
    const uploadThumbnail = useUploadVideoThumbnail();
    const attachYoutube = useAttachYoutubeId();
    const scheduleShoot = useScheduleShoot();
    const workflow = useVideoWorkflow(list.reload);
    const { isSuperAdmin, isAdminOrSuperAdmin } = useAuthorization();

    useEffect(() => {
        dispatch(getAllCategoriesAction({ pageIndex: 0, pageSize: 100 }));
        dispatch(getAllCustomersAction({ pageIndex: 0, pageSize: 100 }));
        dispatch(getTagsAction());
    }, [dispatch]);

    const { columns: tableColumns } = useResizableColumns(
        videosTableColumns(modals.handleAction, isSuperAdmin, isAdminOrSuperAdmin)
    );

    return (
        <>
            <ErrorAlert banner showIcon closable error={list.error} onClose={list.reload} />

            <PageHeader
                title="Vidéos"
                createLabel="Créer une vidéo"
                icon={<IconVideoCameraFilled />}
                subtitle="Gérer les vidéos éditoriaux."
                onCreate={isSuperAdmin ? () => modals.setCreateOpen(true) : undefined}
            />

            <TableToolbar
                statusFilter={list.statusFilter}
                onStatusFilterChange={list.onStatusFilterChange}
                statusOptions={VIDEO_STATUS_OPTIONS}
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
                dataSource={list.videos?.items ?? []}
                components={{ header: { cell: ResizableTitle } }}
                rowSelection={{ type: "checkbox", columnWidth: 36 }}
                pagination={{
                    showSizeChanger: true,
                    current: (list.videos?.pageIndex ?? 0) + 1,
                    pageSize: list.videos?.pageSize ?? 10,
                    total: list.videos?.count ?? 0,
                    onChange: list.onPageChange
                }}
            />

            {modals.createOpen && (
                <VideoCreateWizard
                    open={modals.createOpen}
                    onClose={() => modals.setCreateOpen(false)}
                    onSuccess={() => {
                        modals.setCreateOpen(false);
                        list.reload();
                    }}
                />
            )}

            {modals.editOpen && (
                <CreateEditModal
                    width={600}
                    open={modals.editOpen}
                    formContext="EDIT"
                    loading={updateVideo.loading}
                    success={updateVideo.success}
                    afterClose={() => updateVideo.resetUpdate()}
                    onClose={() => {
                        modals.setEditOpen(false);
                        updateVideo.resetUpdate();
                    }}
                    onSubmit={() => updateVideo.form.submit()}
                    title={{
                        create: "Créer une vidéo",
                        edit: "Modifier la vidéo"
                    }}
                    onSuccessClose={() => {
                        modals.setEditOpen(false);
                        updateVideo.resetUpdate();
                        list.reload();
                    }}
                >
                    <VideoDetailsForm
                        form={updateVideo.form}
                        error={updateVideo.error}
                        onSubmit={updateVideo.onSubmit}
                    />
                </CreateEditModal>
            )}

            <VideoWorkflowModal
                open={modals.actionOpen}
                action={modals.currentAction}
                video={modals.selectedEntity}
                loading={workflow.loading}
                error={workflow.error}
                onConfirm={() =>
                    modals.handleActionConfirm({
                        submit: workflow.onSubmit,
                        approve: workflow.onApprove,
                        publish: workflow.onPublish,
                        reject: async () => {},
                        archive: workflow.onArchive,
                        delete: workflow.onDelete
                    })
                }
                onRejectSubmit={async (values) => {
                    if (!modals.selectedEntity) return;
                    const success = await workflow.onReject({
                        id: modals.selectedEntity.id,
                        data: values
                    });
                    if (success) modals.setActionOpen(false);
                }}
                onCancel={() => modals.setActionOpen(false)}
            />

            {modals.seoOpen && (
                <VideoSeoModal
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

            {modals.tagsOpen && (
                <VideoTagsModal
                    open={modals.tagsOpen}
                    loading={updateTags.loading}
                    success={updateTags.success}
                    tagIds={updateTags.tagIds}
                    onTagsChange={updateTags.onTagsChange}
                    onSubmit={updateTags.onSubmit}
                    onCancel={() => {
                        modals.setTagsOpen(false);
                        updateTags.resetTags();
                    }}
                    onSuccessClose={() => {
                        modals.setTagsOpen(false);
                        updateTags.resetTags();
                        list.reload();
                    }}
                />
            )}

            {modals.thumbnailOpen && (
                <VideoThumbnailUploadModal
                    open={modals.thumbnailOpen}
                    loading={uploadThumbnail.loading}
                    videoId={modals.selectedEntity?.id ?? null}
                    onUpload={uploadThumbnail.onUpload}
                    onCancel={() => modals.setThumbnailOpen(false)}
                />
            )}

            {modals.youtubeOpen && (
                <YoutubeIdModal
                    open={modals.youtubeOpen}
                    form={attachYoutube.form}
                    loading={attachYoutube.loading}
                    success={attachYoutube.success}
                    error={attachYoutube.error}
                    initialYoutubeId={modals.selectedEntity?.youtubeVideoId}
                    onReset={() => attachYoutube.resetYoutube()}
                    onSubmit={(values) => {
                        if (modals.selectedEntity) {
                            attachYoutube.onSubmit(modals.selectedEntity.id, values);
                        }
                    }}
                    onCancel={() => {
                        modals.setYoutubeOpen(false);
                        attachYoutube.resetYoutube();
                    }}
                    onSuccessClose={() => {
                        modals.setYoutubeOpen(false);
                        attachYoutube.resetYoutube();
                        list.reload();
                    }}
                />
            )}

            {modals.shootOpen && (
                <ShootScheduleModal
                    open={modals.shootOpen}
                    form={scheduleShoot.form}
                    loading={scheduleShoot.loading}
                    success={scheduleShoot.success}
                    error={scheduleShoot.error}
                    onReset={() => scheduleShoot.resetShoot()}
                    onSubmit={(values) => {
                        if (modals.selectedEntity) {
                            scheduleShoot.onSubmit(modals.selectedEntity.id, values);
                        }
                    }}
                    onCancel={() => {
                        modals.setShootOpen(false);
                        scheduleShoot.resetShoot();
                    }}
                    onSuccessClose={() => {
                        modals.setShootOpen(false);
                        scheduleShoot.resetShoot();
                        list.reload();
                    }}
                />
            )}
        </>
    );
};

export default VideosListContainer;
