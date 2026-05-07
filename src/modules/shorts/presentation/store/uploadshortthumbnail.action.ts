import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IShortActionResponse } from "@/modules/shorts/domain/entities/IShortActionResponse";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

/**
 * Async thunk to upload a thumbnail for a short video.
 *
 * @description
 * Dispatches `uploadShortThumbnailUseCase` with the short video ID and file.
 * On success, stores the result in `shorts.uploadShortThumbnail.data`.
 * On failure, stores the backend `Failure` in `shorts.uploadShortThumbnail.error`.
 */
export const uploadShortThumbnailAction = createAsyncThunk<
    IShortActionResponse,
    { id: string; data: { file: File } },
    { rejectValue: Failure }
>(ActionType.UploadShortThumbnail, async (params, { rejectWithValue }) => {
    const result = await container.cradle.uploadShortThumbnailUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
