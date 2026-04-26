import type { AsyncThunk } from "@reduxjs/toolkit";
import { activateContentTypeAction } from "@/modules/lookup/presentation/store/activatecontenttype.action";
import { deactivateContentTypeAction } from "@/modules/lookup/presentation/store/deactivatecontenttype.action";
import { ContentTypesNotification } from "@/modules/lookup/presentation/utils/notification/lookup.content-types.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Return type for the content type actions hook.
 *
 * @interface IUseContentTypeActions
 */
interface IUseContentTypeActions {
    loading: boolean;
    error: Failure | null | undefined;
    onActivate: (id: string) => Promise<void>;
    onDeactivate: (id: string) => Promise<void>;
}

/**
 * Custom hook for content type activate and deactivate actions.
 *
 * @description
 * Provides handlers for activate and deactivate operations.
 * Shows a success notification on fulfilled and a backend error
 * toast on rejection. Calls `reload` after each successful
 * action to refresh the table.
 *
 * @param reload - Callback to refresh the content types list after a successful action
 * @returns Action handlers, aggregate loading, and error state
 */
export const useContentTypeActions = (reload: () => void): IUseContentTypeActions => {
    const dispatch = useAppDispatch();

    const activateState = useAppSelector(
        ({ lookup: { activateContentType } }) => activateContentType
    );
    const deactivateState = useAppSelector(
        ({ lookup: { deactivateContentType } }) => deactivateContentType
    );

    const loading = activateState.loading || deactivateState.loading;
    const error = activateState.error || deactivateState.error;

    const dispatchAction = async <T>(
        thunk: AsyncThunk<T, string, { rejectValue: Failure }>,
        id: string,
        notification: typeof ContentTypesNotification.activateSuccess
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

    const onActivate = (id: string) => {
        return dispatchAction(
            activateContentTypeAction,
            id,
            ContentTypesNotification.activateSuccess
        );
    };

    const onDeactivate = (id: string) => {
        return dispatchAction(
            deactivateContentTypeAction,
            id,
            ContentTypesNotification.deactivateSuccess
        );
    };

    return { loading, error, onActivate, onDeactivate };
};
