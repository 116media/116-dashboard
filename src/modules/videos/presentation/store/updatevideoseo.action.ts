import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import { videosSlice } from "@/modules/videos/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetUpdateVideoSeoAction = () =>
    videosSlice.actions.clear({ context: ActionType.UpdateVideoSeo });

/**
 * Async thunk to update SEO metadata for a video.
 *
 * @description
 * Dispatches `updateVideoSeoUseCase` with the video ID and SEO fields.
 * On success, stores the updated video in `videos.updateVideoSeo.data`.
 * On failure, stores the backend `Failure` in `videos.updateVideoSeo.error`.
 */
export const updateVideoSeoAction = createAsyncThunk<
    IVideoEntity,
    { id: string; data: { metaTitle: string; metaDescription: string } },
    { rejectValue: Failure }
>(ActionType.UpdateVideoSeo, async (params, { rejectWithValue }) => {
    const result = await container.cradle.updateVideoSeoUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
