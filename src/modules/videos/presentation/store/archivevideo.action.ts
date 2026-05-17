import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IVideoActionResponse } from "@/modules/videos/domain/entities/IVideoActionResponse";
import { videosSlice } from "@/modules/videos/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetArchiveVideoAction = () =>
    videosSlice.actions.clear({ context: ActionType.ArchiveVideo });

/**
 * Async thunk to archive a video.
 *
 * @description
 * Dispatches `archiveVideoUseCase` with the video ID.
 * On success, stores the result in `videos.archiveVideo.data`.
 * On failure, stores the backend `Failure` in `videos.archiveVideo.error`.
 */
export const archiveVideoAction = createAsyncThunk<
    IVideoActionResponse,
    string,
    { rejectValue: Failure }
>(ActionType.ArchiveVideo, async (id, { rejectWithValue }) => {
    const result = await container.cradle.archiveVideoUseCase.execute(id);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
