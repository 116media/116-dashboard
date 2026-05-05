import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ILyricsActionResponse } from "@/modules/lyrics/domain/entities/ILyricsActionResponse";
import { lyricsSlice } from "@/modules/lyrics/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetDeleteLyricsAction = () =>
    lyricsSlice.actions.clear({ context: ActionType.DeleteLyrics });

/**
 * Async thunk to permanently delete a lyrics record.
 *
 * @description
 * Dispatches `deleteLyricsUseCase` with the lyrics ID.
 * On success, stores the result in `lyrics.deleteLyrics.data`.
 * On failure, stores the backend `Failure` in `lyrics.deleteLyrics.error`.
 */
export const deleteLyricsAction = createAsyncThunk<
    ILyricsActionResponse,
    string,
    { rejectValue: Failure }
>(ActionType.DeleteLyrics, async (id, { rejectWithValue }) => {
    const result = await container.cradle.deleteLyricsUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
