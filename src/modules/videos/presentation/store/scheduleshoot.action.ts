import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import { videosSlice } from "@/modules/videos/presentation/store";
import type { Failure } from "@/shared/domain/failures/failure";
import container from "@/shared/infrastructure/service.locator";
import { ActionType } from "./constants";

export const resetScheduleShootAction = () =>
    videosSlice.actions.clear({ context: ActionType.ScheduleShoot });

/**
 * Async thunk to schedule a shoot for a video.
 *
 * @description
 * Dispatches `scheduleShootUseCase` with the video ID and scheduled date.
 * On success, stores the updated video in `videos.scheduleShoot.data`.
 * On failure, stores the backend `Failure` in `videos.scheduleShoot.error`.
 */
export const scheduleShootAction = createAsyncThunk<
    IVideoEntity,
    { id: string; data: { shootingScheduledAt: string } },
    { rejectValue: Failure }
>(ActionType.ScheduleShoot, async (params, { rejectWithValue }) => {
    const result = await container.cradle.scheduleShootUseCase.execute(params);

    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
