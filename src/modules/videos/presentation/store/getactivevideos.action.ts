import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IVideoSummaryEntity } from "@/modules/videos/domain/entities/IVideoSummaryEntity";
import { videosSlice } from "@/modules/videos/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetGetActiveVideosAction = () =>
    videosSlice.actions.clear({ context: ActionType.GetActiveVideos });

/**
 * Async thunk to fetch all active videos (excludes Archived and Rejected).
 *
 * @description
 * Dispatches `getActiveVideosUseCase` with no parameters.
 * On success, stores the list in `videos.getActiveVideos.data`.
 * On failure, stores the backend `Failure` in `videos.getActiveVideos.error`.
 */
export const getActiveVideosAction = createAsyncThunk<
    IVideoSummaryEntity[],
    void,
    { rejectValue: Failure }
>(ActionType.GetActiveVideos, async (_, { rejectWithValue }) => {
    const result = await container.cradle.getActiveVideosUseCase.execute();

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
