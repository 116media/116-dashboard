import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IVideoActionResponse } from "@/modules/videos/domain/entities/IVideoActionResponse";
import { videosSlice } from "@/modules/videos/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetDeleteVideoAction = () =>
    videosSlice.actions.clear({ context: ActionType.DeleteVideo });

/**
 * Async thunk to delete a video.
 *
 * @description
 * Dispatches `deleteVideoUseCase` with the video ID.
 * On success, stores the result in `videos.deleteVideo.data`.
 * On failure, stores the backend `Failure` in `videos.deleteVideo.error`.
 */
export const deleteVideoAction = createAsyncThunk<
    IVideoActionResponse,
    string,
    { rejectValue: Failure }
>(ActionType.DeleteVideo, async (id, { rejectWithValue }) => {
    const result = await container.cradle.deleteVideoUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
