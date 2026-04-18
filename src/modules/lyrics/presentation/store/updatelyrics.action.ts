import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ILyricsEntity } from "@/modules/lyrics/domain/entities/ILyricsEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to update an existing lyrics record.
 *
 * @description
 * Dispatches `updateLyricsUseCase` with the lyrics ID and updated text.
 * On success, stores the updated lyrics in `lyrics.updateLyrics.data`.
 * On failure, stores the backend `Failure` in `lyrics.updateLyrics.error`.
 */
export const updateLyricsAction = createAsyncThunk<
    ILyricsEntity,
    {
        id: string;
        data: { lyricsText: string };
    },
    { rejectValue: Failure }
>(ActionType.UpdateLyrics, async (params, { rejectWithValue }) => {
    const result = await container.cradle.updateLyricsUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
