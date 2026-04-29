import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IVideoActionResponse } from "@/modules/videos/domain/entities/IVideoActionResponse";
import { videosSlice } from "@/modules/videos/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetRejectVideoAction = () =>
    videosSlice.actions.clear({ context: ActionType.RejectVideo });

/**
 * Async thunk to reject a video with a reason.
 *
 * @description
 * Dispatches `rejectVideoUseCase` with the video ID and rejection reason.
 * On success, stores the result in `videos.rejectVideo.data`.
 * On failure, stores the backend `Failure` in `videos.rejectVideo.error`.
 */
export const rejectVideoAction = createAsyncThunk<
    IVideoActionResponse,
    { id: string; data: { rejectionReason: string } },
    { rejectValue: Failure }
>(ActionType.RejectVideo, async (params, { rejectWithValue }) => {
    const result = await container.cradle.rejectVideoUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
