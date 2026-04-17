import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IVideoActionResponse } from "@/modules/videos/domain/entities/IVideoActionResponse";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to publish an approved video.
 *
 * @description
 * Dispatches `publishVideoUseCase` with the video ID.
 * On success, stores the result in `videos.publishVideo.data`.
 * On failure, stores the backend `Failure` in `videos.publishVideo.error`.
 */
export const publishVideoAction = createAsyncThunk<
    IVideoActionResponse,
    string,
    { rejectValue: Failure }
>(ActionType.PublishVideo, async (id, { rejectWithValue }) => {
    const result = await container.cradle.publishVideoUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
