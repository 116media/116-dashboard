import { createInitialState } from "@/shared/presentation/store/action.wrapper";
import type { IVideosState } from "./type";

/**
 * Initial state for the videos Redux slice.
 *
 * @description
 * Defines initial state for all videos-related operations.
 * All operations use `createInitialState` because paginated
 * results are objects, not arrays.
 */
export const videosInitialState: IVideosState = {
    getVideos: createInitialState(),
    getActiveVideos: createInitialState(),
    getVideoById: createInitialState(),
    createVideo: createInitialState(),
    updateVideo: createInitialState(),
    submitVideo: createInitialState(),
    approveVideo: createInitialState(),
    publishVideo: createInitialState(),
    rejectVideo: createInitialState(),
    archiveVideo: createInitialState(),
    deleteVideo: createInitialState(),
    uploadVideoThumbnail: createInitialState(),
    attachYoutubeId: createInitialState(),
    updateVideoSeo: createInitialState(),
    updateVideoTags: createInitialState(),
    scheduleShoot: createInitialState(),
    unpromoteVideo: createInitialState()
};
