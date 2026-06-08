import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IShortVideoEntity } from "@/modules/shorts/domain/entities/IShortVideoEntity";
import { shortsSlice } from "@/modules/shorts/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetUploadShortVideoAction = () =>
    shortsSlice.actions.clear({ context: ActionType.UploadShortVideo });

/**
 * Async thunk to upload (or replace) the video file of a short video.
 *
 * @description
 * Dispatches `uploadShortVideoUseCase` with the short video ID and file.
 * On success, stores the result in `shorts.uploadShortVideo.data`.
 * On failure, stores the backend `Failure` in `shorts.uploadShortVideo.error`.
 */
export const uploadShortVideoAction = createAsyncThunk<
    IShortVideoEntity,
    { id: string; data: { file: File } },
    { rejectValue: Failure }
>(ActionType.UploadShortVideo, async (params, { rejectWithValue }) => {
    const result = await container.cradle.uploadShortVideoUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
