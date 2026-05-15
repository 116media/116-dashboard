import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IVideoActionResponse } from "@/modules/videos/domain/entities/IVideoActionResponse";
import type { IUnpromoteVideoCredentials } from "@/modules/videos/presentation/model/IUnpromoteVideoCredentials";
import { videosSlice } from "@/modules/videos/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetUnpromoteVideoAction = () =>
    videosSlice.actions.clear({ context: ActionType.UnpromoteVideo });

/**
 * Async thunk to force-unpromote a promoted video.
 *
 * @description
 * Dispatches `unpromoteVideoUseCase` with the video slug and reason.
 * On success, stores the result in `videos.unpromoteVideo.data`.
 * On failure, stores the backend `Failure` in `videos.unpromoteVideo.error`.
 */
export const unpromoteVideoAction = createAsyncThunk<
    IVideoActionResponse,
    { slug: string; data: IUnpromoteVideoCredentials },
    { rejectValue: Failure }
>(ActionType.UnpromoteVideo, async (params, { rejectWithValue }) => {
    const result = await container.cradle.unpromoteVideoUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
