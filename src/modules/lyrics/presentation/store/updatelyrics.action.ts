import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ILyricsEntity } from "@/modules/lyrics/domain/entities/ILyricsEntity";
import type { IUpdateLyricsCredentials } from "@/modules/lyrics/presentation/model/IUpdateLyricsCredentials";
import { lyricsSlice } from "@/modules/lyrics/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetUpdateLyricsAction = () =>
    lyricsSlice.actions.clear({ context: ActionType.UpdateLyrics });

/**
 * Async thunk to update an existing lyrics record.
 *
 * @description
 * Dispatches `updateLyricsUseCase` with the lyrics ID and updated fields.
 * On success, stores the updated lyrics in `lyrics.updateLyrics.data`.
 * On failure, stores the backend `Failure` in `lyrics.updateLyrics.error`.
 */
export const updateLyricsAction = createAsyncThunk<
    ILyricsEntity,
    {
        id: string;
        data: IUpdateLyricsCredentials;
    },
    { rejectValue: Failure }
>(ActionType.UpdateLyrics, async (params, { rejectWithValue }) => {
    const result = await container.cradle.updateLyricsUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
