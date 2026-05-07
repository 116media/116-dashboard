import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IShortVideoEntity } from "@/modules/shorts/domain/entities/IShortVideoEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to create a new short video.
 *
 * @description
 * Dispatches `createShortUseCase` with title, slug, video file, and optional videoId.
 * On success, stores the created short video in `shorts.createShort.data`.
 * On failure, stores the backend `Failure` in `shorts.createShort.error`.
 */
export const createShortAction = createAsyncThunk<
    IShortVideoEntity,
    {
        title: string;
        slug: string;
        videoFile: File;
        videoId?: string;
    },
    { rejectValue: Failure }
>(ActionType.CreateShort, async (params, { rejectWithValue }) => {
    const result = await container.cradle.createShortUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
