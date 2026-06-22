import {
    deleteTagAction,
    resetDeleteTagAction
} from "@/modules/lookup/presentation/store/deletetag.action";
import { TagsNotification } from "@/modules/lookup/presentation/utils/notification/lookup.tags.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Return type for the tag actions hook.
 *
 * @interface IUseTagActions
 */
interface IUseTagActions {
    loading: boolean;
    error: Failure | null | undefined;
    onDelete: (id: string) => Promise<void>;
    resetActionError: () => void;
}

/**
 * Custom hook for tag delete action.
 *
 * @description
 * Provides a handler for the delete operation.
 * Shows a success notification on fulfilled and a backend error
 * toast on rejection. Calls `reload` after a successful
 * action to refresh the table.
 *
 * @param reload - Callback to refresh the tags list after a successful action
 * @returns Action handler, loading, and error state
 */
export const useTagActions = (reload: () => void): IUseTagActions => {
    const dispatch = useAppDispatch();

    const deleteState = useAppSelector(({ lookup: { deleteTag } }) => deleteTag);

    const loading = deleteState.loading;
    const error = deleteState.error;

    const onDelete = async (id: string): Promise<void> => {
        const result = await dispatch(deleteTagAction(id));

        if (deleteTagAction.fulfilled.match(result)) {
            showNotification(TagsNotification.deleteSuccess);
            reload();
        } else if (deleteTagAction.rejected.match(result) && result.payload) {
            showNotification({
                type: "error",
                title: result.payload.title,
                description: result.payload.detail
            });
        }
    };

    const resetActionError = () => {
        dispatch(resetDeleteTagAction());
    };

    return { loading, error, onDelete, resetActionError };
};
