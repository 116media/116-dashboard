import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IShortActionResponse } from "@/modules/shorts/domain/entities/IShortActionResponse";
import { shortsSlice } from "@/modules/shorts/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetDeactivateShortAction = () =>
    shortsSlice.actions.clear({ context: ActionType.DeactivateShort });

/**
 * Async thunk to deactivate a short video.
 *
 * @description
 * Dispatches `deactivateShortUseCase` with the short video ID.
 * On success, stores the result in `shorts.deactivateShort.data`.
 * On failure, stores the backend `Failure` in `shorts.deactivateShort.error`.
 */
export const deactivateShortAction = createAsyncThunk<
    IShortActionResponse,
    string,
    { rejectValue: Failure }
>(ActionType.DeactivateShort, async (id, { rejectWithValue }) => {
    const result = await container.cradle.deactivateShortUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
