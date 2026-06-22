import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import { catalogSlice } from "@/modules/catalog/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetPinCategoryToFeedAction = () =>
    catalogSlice.actions.clear({ context: ActionType.PinCategoryToFeed });

/**
 * Async thunk to pin a category to the homepage feed.
 *
 * @description
 * Calls `pinCategoryToFeedUseCase`. The backend enforces the per-content-type cap and
 * auto-unpins the oldest pinned category (FIFO), so callers should refresh the list
 * after success.
 */
export const pinCategoryToFeedAction = createAsyncThunk<
    ICategoryEntity,
    string,
    { rejectValue: Failure }
>(ActionType.PinCategoryToFeed, async (id, { rejectWithValue }) => {
    const result = await container.cradle.pinCategoryToFeedUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
