import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ILyricsEntity } from "@/modules/lyrics/domain/entities/ILyricsEntity";
import type { ICreateLyricsCredentials } from "@/modules/lyrics/presentation/model/ICreateLyricsCredentials";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to create a new lyrics record.
 *
 * @description
 * Dispatches `createLyricsUseCase` with song title, artist name, lyrics text,
 * language, and optional video/article associations.
 * On success, stores the created lyrics in `lyrics.createLyrics.data`.
 * On failure, stores the backend `Failure` in `lyrics.createLyrics.error`.
 */
export const createLyricsAction = createAsyncThunk<
    ILyricsEntity,
    ICreateLyricsCredentials,
    { rejectValue: Failure }
>(ActionType.CreateLyrics, async (params, { rejectWithValue }) => {
    const result = await container.cradle.createLyricsUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
