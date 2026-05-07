import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IVideoActionResponse } from "@/modules/videos/domain/entities/IVideoActionResponse";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to update tags for a video.
 *
 * @description
 * Dispatches `updateVideoTagsUseCase` with the video ID and tag IDs.
 * On success, stores the result in `videos.updateVideoTags.data`.
 * On failure, stores the backend `Failure` in `videos.updateVideoTags.error`.
 */
export const updateVideoTagsAction = createAsyncThunk<
    IVideoActionResponse,
    { id: string; data: { tagIds: string[] } },
    { rejectValue: Failure }
>(ActionType.UpdateVideoTags, async (params, { rejectWithValue }) => {
    const result = await container.cradle.updateVideoTagsUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
