import type { AsyncThunk } from "@reduxjs/toolkit";
import type { IRejectArticleCredentials } from "@/modules/articles/presentation/model/IRejectArticleCredentials";
import { approveArticleAction } from "@/modules/articles/presentation/store/approvearticle.action";
import { archiveArticleAction } from "@/modules/articles/presentation/store/archivearticle.action";
import { deleteArticleAction } from "@/modules/articles/presentation/store/deletearticle.action";
import { publishArticleAction } from "@/modules/articles/presentation/store/publisharticle.action";
import { rejectArticleAction } from "@/modules/articles/presentation/store/rejectarticle.action";
import { submitArticleAction } from "@/modules/articles/presentation/store/submitarticle.action";
import { ArticlesNotification } from "@/modules/articles/presentation/utils/notification/articles.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Return type for the article workflow hook.
 *
 * @interface IUseArticleWorkflow
 */
interface IUseArticleWorkflow {
    loading: boolean;
    error: Failure | null | undefined;
    onSubmit: (id: string) => Promise<void>;
    onApprove: (id: string) => Promise<void>;
    onPublish: (id: string) => Promise<void>;
    onReject: (params: { id: string; data: IRejectArticleCredentials }) => Promise<void>;
    onArchive: (id: string) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

/**
 * Custom hook for article workflow actions.
 *
 * @description
 * Provides handlers for all editorial workflow transitions:
 * submit, approve, publish, reject, archive, and delete.
 * Each action dispatches the corresponding thunk and shows
 * a success or error notification.
 *
 * @param reload - Callback to refresh the articles list after a successful action
 * @returns {IUseArticleWorkflow} Loading/error state and workflow action handlers
 */
export const useArticleWorkflow = (reload: () => void): IUseArticleWorkflow => {
    const dispatch = useAppDispatch();

    const submitState = useAppSelector(({ articles: { submitArticle } }) => submitArticle);
    const approveState = useAppSelector(({ articles: { approveArticle } }) => approveArticle);
    const publishState = useAppSelector(({ articles: { publishArticle } }) => publishArticle);
    const rejectState = useAppSelector(({ articles: { rejectArticle } }) => rejectArticle);
    const archiveState = useAppSelector(({ articles: { archiveArticle } }) => archiveArticle);
    const deleteState = useAppSelector(({ articles: { deleteArticle } }) => deleteArticle);

    const loading =
        submitState.loading ||
        approveState.loading ||
        publishState.loading ||
        rejectState.loading ||
        archiveState.loading ||
        deleteState.loading;

    const error =
        submitState.error ||
        approveState.error ||
        publishState.error ||
        rejectState.error ||
        archiveState.error ||
        deleteState.error;

    const dispatchAction = async <T>(
        thunk: AsyncThunk<T, string, { rejectValue: Failure }>,
        id: string,
        notification: typeof ArticlesNotification.submitSuccess
    ) => {
        const result = await dispatch(thunk(id));

        if (thunk.fulfilled.match(result)) {
            showNotification(notification);
            reload();
        } else if (thunk.rejected.match(result) && result.payload) {
            showNotification({
                type: "error",
                title: result.payload.title,
                description: result.payload.detail
            });
        }
    };

    const onSubmit = (id: string) => {
        return dispatchAction(submitArticleAction, id, ArticlesNotification.submitSuccess);
    };

    const onApprove = (id: string) => {
        return dispatchAction(approveArticleAction, id, ArticlesNotification.approveSuccess);
    };

    const onPublish = (id: string) => {
        return dispatchAction(publishArticleAction, id, ArticlesNotification.publishSuccess);
    };

    const onReject = async (params: { id: string; data: IRejectArticleCredentials }) => {
        const result = await dispatch(rejectArticleAction(params));

        if (rejectArticleAction.fulfilled.match(result)) {
            showNotification(ArticlesNotification.rejectSuccess);
            reload();
        } else if (rejectArticleAction.rejected.match(result) && result.payload) {
            showNotification({
                type: "error",
                title: result.payload.title,
                description: result.payload.detail
            });
        }
    };

    const onArchive = (id: string) => {
        return dispatchAction(archiveArticleAction, id, ArticlesNotification.archiveSuccess);
    };

    const onDelete = (id: string) => {
        return dispatchAction(deleteArticleAction, id, ArticlesNotification.deleteSuccess);
    };

    return { loading, error, onSubmit, onApprove, onPublish, onReject, onArchive, onDelete };
};
