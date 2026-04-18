import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IShortActionResponse } from "@/modules/shorts/domain/entities/IShortActionResponse";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to delete a short video.
 *
 * @description
 * Dispatches `deleteShortUseCase` with the short video ID.
 * On success, stores the result in `shorts.deleteShort.data`.
 * On failure, stores the backend `Failure` in `shorts.deleteShort.error`.
 */
export const deleteShortAction = createAsyncThunk<
    IShortActionResponse,
    string,
    { rejectValue: Failure }
>(ActionType.DeleteShort, async (id, { rejectWithValue }) => {
    const result = await container.cradle.deleteShortUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
