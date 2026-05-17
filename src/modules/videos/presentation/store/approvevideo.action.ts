import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IVideoActionResponse } from "@/modules/videos/domain/entities/IVideoActionResponse";
import { videosSlice } from "@/modules/videos/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetApproveVideoAction = () =>
    videosSlice.actions.clear({ context: ActionType.ApproveVideo });

/**
 * Async thunk to approve a video.
 *
 * @description
 * Dispatches `approveVideoUseCase` with the video ID.
 * On success, stores the result in `videos.approveVideo.data`.
 * On failure, stores the backend `Failure` in `videos.approveVideo.error`.
 */
export const approveVideoAction = createAsyncThunk<
    IVideoActionResponse,
    string,
    { rejectValue: Failure }
>(ActionType.ApproveVideo, async (id, { rejectWithValue }) => {
    const result = await container.cradle.approveVideoUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
