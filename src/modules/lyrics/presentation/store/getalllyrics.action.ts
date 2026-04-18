import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ILyricsEntity } from "@/modules/lyrics/domain/entities/ILyricsEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to fetch a paginated list of lyrics.
 *
 * @description
 * Dispatches `getAllLyricsUseCase` with pagination and search params.
 * On success, stores the paginated result in `lyrics.getLyrics.data`.
 * On failure, stores the backend `Failure` in `lyrics.getLyrics.error`.
 */
export const getLyricsAction = createAsyncThunk<
    IPaginatedResult<ILyricsEntity>,
    {
        pageIndex: number;
        pageSize: number;
        search?: string;
    },
    { rejectValue: Failure }
>(ActionType.GetLyrics, async (params, { rejectWithValue }) => {
    const result = await container.cradle.getAllLyricsUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
