import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import { videosSlice } from "@/modules/videos/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetAttachYoutubeVideoUrlAction = () =>
    videosSlice.actions.clear({ context: ActionType.AttachYoutubeVideoUrl });

/**
 * Async thunk to attach a YouTube video ID to a video.
 *
 * @description
 * Dispatches `attachYoutubeIdUseCase` with the video ID and YouTube video ID.
 * On success, stores the updated video in `videos.attachYoutubeId.data`.
 * On failure, stores the backend `Failure` in `videos.attachYoutubeId.error`.
 */
export const attachYoutubeIdAction = createAsyncThunk<
    IVideoEntity,
    { id: string; data: { youtubeVideoUrl: string } },
    { rejectValue: Failure }
>(ActionType.AttachYoutubeVideoUrl, async (params, { rejectWithValue }) => {
    const result = await container.cradle.attachYoutubeIdUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
