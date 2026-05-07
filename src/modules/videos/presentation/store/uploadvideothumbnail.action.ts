import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to upload a thumbnail for a video.
 *
 * @description
 * Dispatches `uploadVideoThumbnailUseCase` with the video ID and file.
 * On success, stores the updated video in `videos.uploadVideoThumbnail.data`.
 * On failure, stores the backend `Failure` in `videos.uploadVideoThumbnail.error`.
 */
export const uploadVideoThumbnailAction = createAsyncThunk<
    IVideoEntity,
    { id: string; data: { file: File } },
    { rejectValue: Failure }
>(ActionType.UploadVideoThumbnail, async (params, { rejectWithValue }) => {
    const result = await container.cradle.uploadVideoThumbnailUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
