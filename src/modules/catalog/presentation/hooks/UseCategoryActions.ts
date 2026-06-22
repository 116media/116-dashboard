import type { AsyncThunk } from "@reduxjs/toolkit";
import {
    activateCategoryAction,
    resetActivateCategoryAction
} from "@/modules/catalog/presentation/store/activatecategory.action";
import {
    deactivateCategoryAction,
    resetDeactivateCategoryAction
} from "@/modules/catalog/presentation/store/deactivatecategory.action";
import {
    pinCategoryToFeedAction,
    resetPinCategoryToFeedAction
} from "@/modules/catalog/presentation/store/pincategorytofeed.action";
import {
    resetSetExclusiveCategoryAction,
    setExclusiveCategoryAction
} from "@/modules/catalog/presentation/store/setexclusivecategory.action";
import {
    resetUnpinCategoryFromFeedAction,
    unpinCategoryFromFeedAction
} from "@/modules/catalog/presentation/store/unpincategoryfromfeed.action";
import { CategoriesNotification } from "@/modules/catalog/presentation/utils/notification/catalog.categories.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

/**
 * Return type for the category actions hook.
 *
 * @interface IUseCategoryActions
 */
interface IUseCategoryActions {
    loading: boolean;
    error: Failure | null | undefined;
    onActivate: (id: string) => Promise<void>;
    onDeactivate: (id: string) => Promise<void>;
    onSetExclusive: (id: string) => Promise<void>;
    onPinToFeed: (id: string) => Promise<void>;
    onUnpinFromFeed: (id: string) => Promise<void>;
    resetActionError: () => void;
}

/**
 * Custom hook for category activate and deactivate actions.
 *
 * @description
 * Provides handlers for activate and deactivate operations.
 * Shows a success notification on fulfilled and a backend error
 * toast on rejection. Calls `reload` after each successful
 * action to refresh the table.
 *
 * @param reload - Callback to refresh the categories list after a successful action
 * @returns Action handlers, aggregate loading, and error state
 */
export const useCategoryActions = (reload: () => void): IUseCategoryActions => {
    const dispatch = useAppDispatch();

    const activateState = useAppSelector(({ catalog: { activateCategory } }) => activateCategory);
    const deactivateState = useAppSelector(
        ({ catalog: { deactivateCategory } }) => deactivateCategory
    );
    const setExclusiveState = useAppSelector(
        ({ catalog: { setExclusiveCategory } }) => setExclusiveCategory
    );
    const pinToFeedState = useAppSelector(
        ({ catalog: { pinCategoryToFeed } }) => pinCategoryToFeed
    );
    const unpinFromFeedState = useAppSelector(
        ({ catalog: { unpinCategoryFromFeed } }) => unpinCategoryFromFeed
    );

    const error =
        activateState.error ||
        deactivateState.error ||
        setExclusiveState.error ||
        pinToFeedState.error ||
        unpinFromFeedState.error;
    const loading =
        activateState.loading ||
        deactivateState.loading ||
        setExclusiveState.loading ||
        pinToFeedState.loading ||
        unpinFromFeedState.loading;

    const dispatchAction = async <T>(
        thunk: AsyncThunk<T, string, { rejectValue: Failure }>,
        id: string,
        notification: typeof CategoriesNotification.activateSuccess
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
        return dispatchAction(activateCategoryAction, id, CategoriesNotification.activateSuccess);
    };

    const onDeactivate = (id: string) => {
        return dispatchAction(
            deactivateCategoryAction,
            id,
            CategoriesNotification.deactivateSuccess
        );
    };

    const onSetExclusive = (id: string) => {
        return dispatchAction(
            setExclusiveCategoryAction,
            id,
            CategoriesNotification.setExclusiveSuccess
        );
    };

    const onPinToFeed = (id: string) => {
        return dispatchAction(pinCategoryToFeedAction, id, CategoriesNotification.pinToFeedSuccess);
    };

    const onUnpinFromFeed = (id: string) => {
        return dispatchAction(
            unpinCategoryFromFeedAction,
            id,
            CategoriesNotification.unpinFromFeedSuccess
        );
    };

    const resetActionError = () => {
        dispatch(resetActivateCategoryAction());
        dispatch(resetDeactivateCategoryAction());
        dispatch(resetSetExclusiveCategoryAction());
        dispatch(resetPinCategoryToFeedAction());
        dispatch(resetUnpinCategoryFromFeedAction());
    };

    return {
        loading,
        error,
        onActivate,
        onDeactivate,
        onSetExclusive,
        onPinToFeed,
        onUnpinFromFeed,
        resetActionError
    };
};
