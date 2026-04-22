import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IShortVideoEntity } from "@/modules/shorts/domain/entities/IShortVideoEntity";
import type { IShortsQueryParams } from "@/modules/shorts/presentation/model/IShortsQueryParams";
import type { Failure } from "@/shared/domain/failures/failure";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to fetch a paginated list of short videos.
 *
 * @description
 * Dispatches `getAllShortsUseCase` with pagination, search, and active filter.
 * On success, stores the paginated result in `shorts.getShorts.data`.
 * On failure, stores the backend `Failure` in `shorts.getShorts.error`.
 */
export const getShortsAction = createAsyncThunk<
    IPaginatedResult<IShortVideoEntity>,
    IShortsQueryParams,
    { rejectValue: Failure }
>(ActionType.GetShorts, async (params, { rejectWithValue }) => {
    const result = await container.cradle.getAllShortsUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
