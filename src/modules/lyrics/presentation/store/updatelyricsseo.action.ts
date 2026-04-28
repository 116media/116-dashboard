import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ILyricsEntity } from "@/modules/lyrics/domain/entities/ILyricsEntity";
import type { IUpdateLyricsSeoCredentials } from "@/modules/lyrics/presentation/model/IUpdateLyricsSeoCredentials";
import { lyricsSlice } from "@/modules/lyrics/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetUpdateLyricsSeoAction = () =>
    lyricsSlice.actions.clear({ context: ActionType.UpdateLyricsSeo });

/**
 * Async thunk to update SEO metadata for a lyrics record.
 *
 * @description
 * Dispatches `updateLyricsSeoUseCase` with the lyrics ID and SEO fields.
 * On success, stores the updated lyrics in `lyrics.updateLyricsSeo.data`.
 * On failure, stores the backend `Failure` in `lyrics.updateLyricsSeo.error`.
 */
export const updateLyricsSeoAction = createAsyncThunk<
    ILyricsEntity,
    { id: string; data: IUpdateLyricsSeoCredentials },
    { rejectValue: Failure }
>(ActionType.UpdateLyricsSeo, async (params, { rejectWithValue }) => {
    const result = await container.cradle.updateLyricsSeoUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
