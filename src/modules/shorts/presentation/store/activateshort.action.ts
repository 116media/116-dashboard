import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IShortActionResponse } from "@/modules/shorts/domain/entities/IShortActionResponse";
import { shortsSlice } from "@/modules/shorts/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetActivateShortAction = () =>
    shortsSlice.actions.clear({ context: ActionType.ActivateShort });

/**
 * Async thunk to activate a short video.
 *
 * @description
 * Dispatches `activateShortUseCase` with the short video ID.
 * On success, stores the result in `shorts.activateShort.data`.
 * On failure, stores the backend `Failure` in `shorts.activateShort.error`.
 */
export const activateShortAction = createAsyncThunk<
    IShortActionResponse,
    string,
    { rejectValue: Failure }
>(ActionType.ActivateShort, async (id, { rejectWithValue }) => {
    const result = await container.cradle.activateShortUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
