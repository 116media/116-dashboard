import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IVideoActionResponse } from "@/modules/videos/domain/entities/IVideoActionResponse";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to submit a video for review.
 *
 * @description
 * Dispatches `submitVideoUseCase` with the video ID.
 * On success, stores the result in `videos.submitVideo.data`.
 * On failure, stores the backend `Failure` in `videos.submitVideo.error`.
 */
export const submitVideoAction = createAsyncThunk<
    IVideoActionResponse,
    string,
    { rejectValue: Failure }
>(ActionType.SubmitVideo, async (id, { rejectWithValue }) => {
    const result = await container.cradle.submitVideoUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
