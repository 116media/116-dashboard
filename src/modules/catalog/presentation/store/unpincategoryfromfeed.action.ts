import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import { catalogSlice } from "@/modules/catalog/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetUnpinCategoryFromFeedAction = () =>
    catalogSlice.actions.clear({ context: ActionType.UnpinCategoryFromFeed });

/**
 * Async thunk to unpin a category from the homepage feed.
 *
 * @description
 * Calls `unpinCategoryFromFeedUseCase`. The operation is idempotent on the backend, so
 * callers should refresh the list after success to reflect the cleared pin state.
 */
export const unpinCategoryFromFeedAction = createAsyncThunk<
    ICategoryEntity,
    string,
    { rejectValue: Failure }
>(ActionType.UnpinCategoryFromFeed, async (id, { rejectWithValue }) => {
    const result = await container.cradle.unpinCategoryFromFeedUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
