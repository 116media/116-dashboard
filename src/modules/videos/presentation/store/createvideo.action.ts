import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import { videosSlice } from "@/modules/videos/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetCreateVideoAction = () =>
    videosSlice.actions.clear({ context: ActionType.CreateVideo });

/**
 * Async thunk to create a new video.
 *
 * @description
 * Dispatches `createVideoUseCase` with category, title, slug, description,
 * and optional customer/order/schedule data.
 * On success, stores the created video in `videos.createVideo.data`.
 * On failure, stores the backend `Failure` in `videos.createVideo.error`.
 */
export const createVideoAction = createAsyncThunk<
    IVideoEntity,
    {
        categoryId: string;
        title: string;
        slug: string;
        description: string;
        customerId?: string;
        orderItemId?: string;
        shootingScheduledAt?: string;
    },
    { rejectValue: Failure }
>(ActionType.CreateVideo, async (params, { rejectWithValue }) => {
    const result = await container.cradle.createVideoUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
