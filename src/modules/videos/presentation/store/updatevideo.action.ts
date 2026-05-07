import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to update an existing video.
 *
 * @description
 * Dispatches `updateVideoUseCase` with the video ID and updated fields.
 * On success, stores the updated video in `videos.updateVideo.data`.
 * On failure, stores the backend `Failure` in `videos.updateVideo.error`.
 */
export const updateVideoAction = createAsyncThunk<
    IVideoEntity,
    {
        id: string;
        data: {
            categoryId: string;
            title: string;
            slug: string;
            description: string;
            customerId?: string | null;
            orderItemId?: string | null;
            socialBoost: boolean;
            isFeatured: boolean;
            featuredUntil?: string | null;
            metaTitle?: string | null;
            metaDescription?: string | null;
        };
    },
    { rejectValue: Failure }
>(ActionType.UpdateVideo, async (params, { rejectWithValue }) => {
    const result = await container.cradle.updateVideoUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
