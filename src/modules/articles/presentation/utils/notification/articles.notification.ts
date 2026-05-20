import type { INotificationConfig } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Article notification configurations.
 *
 * @description
 * Predefined notification configurations for article-related messages.
 * Only success messages are declared here. Error notifications are
 * built at call time from the backend's `Failure.title` / `Failure.detail`.
 */
export const ArticlesNotification = {
    /**
     * Success notification for article creation.
     *
     * @description
     * Displays when a new article has been created successfully.
     */
    createSuccess: {
        type: "success",
        title: "Article créé",
        description: "L'article a été créé avec succès."
    } as INotificationConfig,

    /**
     * Success notification for article update.
     *
     * @description
     * Displays when an article has been updated successfully.
     */
    updateSuccess: {
        type: "success",
        title: "Article modifié",
        description: "L'article a été modifié avec succès."
    } as INotificationConfig,

    /**
     * Success notification for article submission.
     *
     * @description
     * Displays when an article has been submitted for review.
     */
    submitSuccess: {
        type: "success",
        title: "Article soumis",
        description: "L'article a été soumis pour revue."
    } as INotificationConfig,

    /**
     * Success notification for article approval.
     *
     * @description
     * Displays when an article has been approved.
     */
    approveSuccess: {
        type: "success",
        title: "Article approuvé",
        description: "L'article a été approuvé avec succès."
    } as INotificationConfig,

    /**
     * Success notification for article publication.
     *
     * @description
     * Displays when an article has been published.
     */
    publishSuccess: {
        type: "success",
        title: "Article publié",
        description: "L'article a été publié avec succès."
    } as INotificationConfig,

    /**
     * Success notification for article rejection.
     *
     * @description
     * Displays when an article has been rejected.
     */
    rejectSuccess: {
        type: "success",
        title: "Article rejeté",
        description: "L'article a été rejeté."
    } as INotificationConfig,

    /**
     * Success notification for article archival.
     *
     * @description
     * Displays when an article has been archived.
     */
    archiveSuccess: {
        type: "success",
        title: "Article archivé",
        description: "L'article a été archivé avec succès."
    } as INotificationConfig,

    /**
     * Success notification for article deletion.
     *
     * @description
     * Displays when an article has been permanently deleted.
     */
    deleteSuccess: {
        type: "success",
        title: "Article supprimé",
        description: "L'article a été supprimé définitivement."
    } as INotificationConfig,

    /**
     * Success notification for article image upload.
     *
     * @description
     * Displays when an image has been uploaded for an article.
     */
    uploadImageSuccess: {
        type: "success",
        title: "Image uploadée",
        description: "L'image a été uploadée avec succès."
    } as INotificationConfig,

    /**
     * Success notification for article SEO update.
     *
     * @description
     * Displays when SEO metadata has been updated for an article.
     */
    updateSeoSuccess: {
        type: "success",
        title: "SEO mis à jour",
        description: "Les informations SEO ont été mises à jour."
    } as INotificationConfig,

    /**
     * Success notification for article tags update.
     *
     * @description
     * Displays when tags have been updated for an article.
     */
    updateTagsSuccess: {
        type: "success",
        title: "Tags mis à jour",
        description: "Les tags de l'article ont été mis à jour."
    } as INotificationConfig
} as const;
