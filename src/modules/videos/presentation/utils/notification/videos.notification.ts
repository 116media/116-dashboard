import type { INotificationConfig } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Video notification configurations.
 *
 * @description
 * Predefined notification configurations for video-related messages.
 * Only success messages are declared here. Error notifications are
 * built at call time from the backend's `Failure.title` / `Failure.detail`.
 */
export const VideosNotification = {
    /**
     * Success notification for video creation.
     *
     * @description
     * Displays when a new video has been created successfully.
     */
    createSuccess: {
        type: "success",
        title: "Vidéo créée",
        description: "La vidéo a été créée avec succès."
    } as INotificationConfig,

    /**
     * Success notification for video update.
     *
     * @description
     * Displays when a video has been updated successfully.
     */
    updateSuccess: {
        type: "success",
        title: "Vidéo modifiée",
        description: "La vidéo a été modifiée avec succès."
    } as INotificationConfig,

    /**
     * Success notification for video submission.
     *
     * @description
     * Displays when a video has been submitted for review.
     */
    submitSuccess: {
        type: "success",
        title: "Vidéo soumise",
        description: "La vidéo a été soumise pour revue."
    } as INotificationConfig,

    /**
     * Success notification for video approval.
     *
     * @description
     * Displays when a video has been approved.
     */
    approveSuccess: {
        type: "success",
        title: "Vidéo approuvée",
        description: "La vidéo a été approuvée avec succès."
    } as INotificationConfig,

    /**
     * Success notification for video publication.
     *
     * @description
     * Displays when a video has been published.
     */
    publishSuccess: {
        type: "success",
        title: "Vidéo publiée",
        description: "La vidéo a été publiée avec succès."
    } as INotificationConfig,

    /**
     * Success notification for video rejection.
     *
     * @description
     * Displays when a video has been rejected.
     */
    rejectSuccess: {
        type: "success",
        title: "Vidéo rejetée",
        description: "La vidéo a été rejetée."
    } as INotificationConfig,

    /**
     * Success notification for video archival.
     *
     * @description
     * Displays when a video has been archived.
     */
    archiveSuccess: {
        type: "success",
        title: "Vidéo archivée",
        description: "La vidéo a été archivée avec succès."
    } as INotificationConfig,

    /**
     * Success notification for video deletion.
     *
     * @description
     * Displays when a video has been permanently deleted.
     */
    deleteSuccess: {
        type: "success",
        title: "Vidéo supprimée",
        description: "La vidéo a été supprimée définitivement."
    } as INotificationConfig,

    /**
     * Success notification for video thumbnail upload.
     *
     * @description
     * Displays when a thumbnail has been uploaded for a video.
     */
    uploadThumbnailSuccess: {
        type: "success",
        title: "Vignette téléversée",
        description: "La vignette a été téléversée avec succès."
    } as INotificationConfig,

    /**
     * Success notification for YouTube ID attachment.
     *
     * @description
     * Displays when a YouTube video ID has been attached to a video.
     */
    attachYoutubeSuccess: {
        type: "success",
        title: "YouTube associé",
        description: "L'identifiant YouTube a été associé avec succès."
    } as INotificationConfig,

    /**
     * Success notification for video SEO update.
     *
     * @description
     * Displays when SEO metadata has been updated for a video.
     */
    updateSeoSuccess: {
        type: "success",
        title: "SEO mis à jour",
        description: "Les informations SEO ont été mises à jour."
    } as INotificationConfig,

    /**
     * Success notification for video tags update.
     *
     * @description
     * Displays when tags have been updated for a video.
     */
    updateTagsSuccess: {
        type: "success",
        title: "Tags mis à jour",
        description: "Les tags de la vidéo ont été mis à jour."
    } as INotificationConfig,

    /**
     * Success notification for shoot scheduling.
     *
     * @description
     * Displays when a shoot has been scheduled for a video.
     */
    scheduleShootSuccess: {
        type: "success",
        title: "Tournage planifié",
        description: "Le tournage a été planifié avec succès."
    } as INotificationConfig
} as const;
