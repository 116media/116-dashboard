import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
    ActionWrapperFulfilled,
    ActionWrapperPending,
    ActionWrapperRejected,
    ActionWrapperReset,
    createInitialState
} from "@/shared/presentation/store/action.wrapper";
import { approveVideoAction } from "./approvevideo.action";
import { archiveVideoAction } from "./archivevideo.action";
import { attachYoutubeIdAction } from "./attachyoutubeid.action";
import { SliceName } from "./constants";
import { createVideoAction } from "./createvideo.action";
import { deleteVideoAction } from "./deletevideo.action";
import { getActiveVideosAction } from "./getactivevideos.action";
import { getVideoByIdAction } from "./getvideobyid.action";
import { getVideosAction } from "./getvideos.action";
import { publishVideoAction } from "./publishvideo.action";
import { rejectVideoAction } from "./rejectvideo.action";
import { scheduleShootAction } from "./scheduleshoot.action";
import { videosInitialState } from "./state";
import { submitVideoAction } from "./submitvideo.action";
import type { VideosStateKey } from "./type";
import { unpromoteVideoAction } from "./unpromotevideo.action";
import { updateVideoAction } from "./updatevideo.action";
import { updateVideoSeoAction } from "./updatevideoseo.action";
import { updateVideoTagsAction } from "./updatevideotags.action";
import { uploadVideoThumbnailAction } from "./uploadvideothumbnail.action";

/**
 * Redux slice for the videos module.
 *
 * @description
 * Manages state for 16 async operations using the shared
 * ActionWrapper* reducer helpers.
 */
export const videosSlice = createSlice({
    name: SliceName.Videos,
    initialState: videosInitialState,
    reducers: {
        clear: ActionWrapperReset,
        purge: (state, action: PayloadAction<VideosStateKey[]>) => {
            for (const key of action.payload) {
                if (state[key]) {
                    (state as Record<string, unknown>)[key] = createInitialState();
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // get all videos
            .addCase(getVideosAction.pending, ActionWrapperPending)
            .addCase(getVideosAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getVideosAction.rejected, ActionWrapperRejected)
            // get active videos
            .addCase(getActiveVideosAction.pending, ActionWrapperPending)
            .addCase(getActiveVideosAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getActiveVideosAction.rejected, ActionWrapperRejected)
            // get video by id
            .addCase(getVideoByIdAction.pending, ActionWrapperPending)
            .addCase(getVideoByIdAction.fulfilled, ActionWrapperFulfilled)
            .addCase(getVideoByIdAction.rejected, ActionWrapperRejected)
            // create video
            .addCase(createVideoAction.pending, ActionWrapperPending)
            .addCase(createVideoAction.fulfilled, ActionWrapperFulfilled)
            .addCase(createVideoAction.rejected, ActionWrapperRejected)
            // update video
            .addCase(updateVideoAction.pending, ActionWrapperPending)
            .addCase(updateVideoAction.fulfilled, ActionWrapperFulfilled)
            .addCase(updateVideoAction.rejected, ActionWrapperRejected)
            // submit video
            .addCase(submitVideoAction.pending, ActionWrapperPending)
            .addCase(submitVideoAction.fulfilled, ActionWrapperFulfilled)
            .addCase(submitVideoAction.rejected, ActionWrapperRejected)
            // approve video
            .addCase(approveVideoAction.pending, ActionWrapperPending)
            .addCase(approveVideoAction.fulfilled, ActionWrapperFulfilled)
            .addCase(approveVideoAction.rejected, ActionWrapperRejected)
            // publish video
            .addCase(publishVideoAction.pending, ActionWrapperPending)
            .addCase(publishVideoAction.fulfilled, ActionWrapperFulfilled)
            .addCase(publishVideoAction.rejected, ActionWrapperRejected)
            // reject video
            .addCase(rejectVideoAction.pending, ActionWrapperPending)
            .addCase(rejectVideoAction.fulfilled, ActionWrapperFulfilled)
            .addCase(rejectVideoAction.rejected, ActionWrapperRejected)
            // archive video
            .addCase(archiveVideoAction.pending, ActionWrapperPending)
            .addCase(archiveVideoAction.fulfilled, ActionWrapperFulfilled)
            .addCase(archiveVideoAction.rejected, ActionWrapperRejected)
            // delete video
            .addCase(deleteVideoAction.pending, ActionWrapperPending)
            .addCase(deleteVideoAction.fulfilled, ActionWrapperFulfilled)
            .addCase(deleteVideoAction.rejected, ActionWrapperRejected)
            // upload video thumbnail
            .addCase(uploadVideoThumbnailAction.pending, ActionWrapperPending)
            .addCase(uploadVideoThumbnailAction.fulfilled, ActionWrapperFulfilled)
            .addCase(uploadVideoThumbnailAction.rejected, ActionWrapperRejected)
            // attach youtube url
            .addCase(attachYoutubeIdAction.pending, ActionWrapperPending)
            .addCase(attachYoutubeIdAction.fulfilled, ActionWrapperFulfilled)
            .addCase(attachYoutubeIdAction.rejected, ActionWrapperRejected)
            // update video seo
            .addCase(updateVideoSeoAction.pending, ActionWrapperPending)
            .addCase(updateVideoSeoAction.fulfilled, ActionWrapperFulfilled)
            .addCase(updateVideoSeoAction.rejected, ActionWrapperRejected)
            // update video tags
            .addCase(updateVideoTagsAction.pending, ActionWrapperPending)
            .addCase(updateVideoTagsAction.fulfilled, ActionWrapperFulfilled)
            .addCase(updateVideoTagsAction.rejected, ActionWrapperRejected)
            // schedule shoot
            .addCase(scheduleShootAction.pending, ActionWrapperPending)
            .addCase(scheduleShootAction.fulfilled, ActionWrapperFulfilled)
            .addCase(scheduleShootAction.rejected, ActionWrapperRejected)
            // unpromote video
            .addCase(unpromoteVideoAction.pending, ActionWrapperPending)
            .addCase(unpromoteVideoAction.fulfilled, ActionWrapperFulfilled)
            .addCase(unpromoteVideoAction.rejected, ActionWrapperRejected);
    }
});

export default videosSlice.reducer;
