import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import { videosSlice } from "@/modules/videos/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetGetVideoByIdAction = () =>
    videosSlice.actions.clear({ context: ActionType.GetVideoById });

/**
 * Async thunk to fetch a single video by ID.
 *
 * @description
 * Dispatches `getVideoByIdUseCase` with the video ID.
 * On success, stores the video detail in `videos.getVideoById.data`.
 * On failure, stores the backend `Failure` in `videos.getVideoById.error`.
 */
export const getVideoByIdAction = createAsyncThunk<IVideoEntity, string, { rejectValue: Failure }>(
    ActionType.GetVideoById,
    async (id, { rejectWithValue }) => {
        const result = await container.cradle.getVideoByIdUseCase.execute(id);

        if (!result.ok) return rejectWithValue(result.error);
        return result.value;
    }
);
