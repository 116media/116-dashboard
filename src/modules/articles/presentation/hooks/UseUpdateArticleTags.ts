import { useEffect, useState } from "react";
import type { IArticleEntity } from "@/modules/articles/domain/entities/IArticleEntity";
import {
    resetUpdateArticleTagsAction,
    updateArticleTagsAction
} from "@/modules/articles/presentation/store/updatearticletags.action";
import { ArticlesNotification } from "@/modules/articles/presentation/utils/notification/articles.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Return type for the update article tags hook.
 *
 * @interface IUseUpdateArticleTags
 */
interface IUseUpdateArticleTags {
    tagIds: string[];
    onTagsChange: (ids: string[]) => void;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: () => Promise<void>;
    resetTags: () => void;
}

/**
 * Custom hook for managing article tag assignments.
 *
 * @description
 * Manages a local `tagIds` state array, pre-populated from
 * the article's current tags. Provides a submit handler that
 * dispatches `updateArticleTagsAction` and shows a notification
 * on success.
 *
 * @param article - The article whose tags to edit (used for pre-population and ID)
 * @param onSuccess - Optional callback invoked after successful update
 * @returns Tag IDs, change handler, loading/error state, success message, and submit handler
 */
export const useUpdateArticleTags = (
    article: IArticleEntity | null,
    onSuccess?: () => void
): IUseUpdateArticleTags => {
    const dispatch = useAppDispatch();
    const [tagIds, setTagIds] = useState<string[]>([]);
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(
        ({ articles: { updateArticleTags } }) => updateArticleTags
    );

    useEffect(() => {
        if (article) {
            setTagIds((article.tags ?? []).map((t) => t.id));
        }
    }, [article]);

    const onTagsChange = (ids: string[]) => {
        setTagIds(ids);
    };

    const onSubmit = async (): Promise<void> => {
        if (!article) return;

        const result = await dispatch(
            updateArticleTagsAction({
                id: article.id,
                data: { tagIds }
            })
        );

        if (updateArticleTagsAction.fulfilled.match(result)) {
            setSuccess(ArticlesNotification.updateTagsSuccess.description);
            showNotification(ArticlesNotification.updateTagsSuccess);
            onSuccess?.();
        }
    };

    const resetTags = () => {
        setSuccess(null);
        dispatch(resetUpdateArticleTagsAction());
        setTagIds([]);
    };

    return { tagIds, onTagsChange, loading, error, success, onSubmit, resetTags };
};
