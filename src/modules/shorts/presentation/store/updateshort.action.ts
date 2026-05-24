import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IShortVideoEntity } from "@/modules/shorts/domain/entities/IShortVideoEntity";
import type { IUpdateShortCredentials } from "@/modules/shorts/presentation/model/IUpdateShortCredentials";
import { shortsSlice } from "@/modules/shorts/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetUpdateShortAction = () =>
    shortsSlice.actions.clear({ context: ActionType.UpdateShort });

/**
 * Async thunk to update a short video.
 *
 * @description
 * Dispatches `updateShortUseCase` with the short ID, title,
 * optional videoId, and optional video file replacement.
 * On success, stores the updated entity in `shorts.updateShort.data`.
 * On failure, stores the backend `Failure` in `shorts.updateShort.error`.
 */
export const updateShortAction = createAsyncThunk<
    IShortVideoEntity,
    { id: string; data: IUpdateShortCredentials },
    { rejectValue: Failure }
>(ActionType.UpdateShort, async (params, { rejectWithValue }) => {
    const result = await container.cradle.updateShortUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
