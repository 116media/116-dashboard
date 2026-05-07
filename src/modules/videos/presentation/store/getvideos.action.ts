import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IVideoSummaryEntity } from "@/modules/videos/domain/entities/IVideoSummaryEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import type { EnumContentStatus } from "@/shared/infrastructure/api/generated/116.api";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to fetch a paginated list of videos.
 *
 * @description
 * Dispatches `getVideosUseCase` with pagination, status, category, and search params.
 * On success, stores the paginated result in `videos.getVideos.data`.
 * On failure, stores the backend `Failure` in `videos.getVideos.error`.
 */
export const getVideosAction = createAsyncThunk<
    IPaginatedResult<IVideoSummaryEntity>,
    {
        pageIndex: number;
        pageSize: number;
        status?: EnumContentStatus;
        categoryId?: string;
        search?: string;
    },
    { rejectValue: Failure }
>(ActionType.GetVideos, async (params, { rejectWithValue }) => {
    const result = await container.cradle.getAllVideosUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
