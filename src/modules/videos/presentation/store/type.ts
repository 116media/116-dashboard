import type { IVideoActionResponse } from "@/modules/videos/domain/entities/IVideoActionResponse";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import type { IVideoSummaryEntity } from "@/modules/videos/domain/entities/IVideoSummaryEntity";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import type { IBasicInitialState } from "@/shared/presentation/store/action.wrapper";

/**
 * Redux state shape for the videos module.
 *
 * @description
 * Each key represents one async operation with its own
 * `loading`, `fetched`, `data`, and `error` state.
 */
export type IVideosState = {
    getVideos: IBasicInitialState<IPaginatedResult<IVideoSummaryEntity>>;
    getVideoById: IBasicInitialState<IVideoEntity>;
    createVideo: IBasicInitialState<IVideoEntity>;
    updateVideo: IBasicInitialState<IVideoEntity>;
    submitVideo: IBasicInitialState<IVideoActionResponse>;
    approveVideo: IBasicInitialState<IVideoActionResponse>;
    publishVideo: IBasicInitialState<IVideoActionResponse>;
    rejectVideo: IBasicInitialState<IVideoActionResponse>;
    archiveVideo: IBasicInitialState<IVideoActionResponse>;
    deleteVideo: IBasicInitialState<IVideoActionResponse>;
    uploadVideoThumbnail: IBasicInitialState<IVideoEntity>;
    attachYoutubeId: IBasicInitialState<IVideoEntity>;
    updateVideoSeo: IBasicInitialState<IVideoEntity>;
    updateVideoTags: IBasicInitialState<IVideoActionResponse>;
    scheduleShoot: IBasicInitialState<IVideoEntity>;
};

export type VideosStateKey = keyof IVideosState;
