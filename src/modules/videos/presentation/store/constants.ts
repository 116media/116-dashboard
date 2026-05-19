/**
 * Redux action type constants for the videos module.
 */
export const ActionType = {
    GetVideos: "Videos/getVideos",
    GetVideoById: "Videos/getVideoById",
    CreateVideo: "Videos/createVideo",
    UpdateVideo: "Videos/updateVideo",
    SubmitVideo: "Videos/submitVideo",
    ApproveVideo: "Videos/approveVideo",
    PublishVideo: "Videos/publishVideo",
    RejectVideo: "Videos/rejectVideo",
    ArchiveVideo: "Videos/archiveVideo",
    DeleteVideo: "Videos/deleteVideo",
    UploadVideoThumbnail: "Videos/uploadVideoThumbnail",
    AttachYoutubeVideoUrl: "Videos/attachYoutubeId",
    UpdateVideoSeo: "Videos/updateVideoSeo",
    UpdateVideoTags: "Videos/updateVideoTags",
    ScheduleShoot: "Videos/scheduleShoot"
} as const;

/**
 * Redux slice name for the videos module.
 */
export const SliceName = { Videos: "videos" } as const;
