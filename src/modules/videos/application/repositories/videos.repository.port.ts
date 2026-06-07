import type { IVideoActionResponse } from "@/modules/videos/domain/entities/IVideoActionResponse";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import type { IVideoSummaryEntity } from "@/modules/videos/domain/entities/IVideoSummaryEntity";
import type { IAttachYoutubeUrlCredentials } from "@/modules/videos/presentation/model/IAttachYoutubeUrlCredentials";
import type { ICreateVideoCredentials } from "@/modules/videos/presentation/model/ICreateVideoCredentials";
import type { IRejectVideoCredentials } from "@/modules/videos/presentation/model/IRejectVideoCredentials";
import type { IScheduleShootCredentials } from "@/modules/videos/presentation/model/IScheduleShootCredentials";
import type { IUnpromoteVideoCredentials } from "@/modules/videos/presentation/model/IUnpromoteVideoCredentials";
import type { IUpdateVideoCredentials } from "@/modules/videos/presentation/model/IUpdateVideoCredentials";
import type { IUpdateVideoSeoCredentials } from "@/modules/videos/presentation/model/IUpdateVideoSeoCredentials";
import type { IUpdateVideoTagsCredentials } from "@/modules/videos/presentation/model/IUpdateVideoTagsCredentials";
import type { IUploadVideoThumbnailCredentials } from "@/modules/videos/presentation/model/IUploadVideoThumbnailCredentials";
import type { IVideosQueryParams } from "@/modules/videos/presentation/model/IVideosQueryParams";
import type { Result } from "@/shared/domain/results/result";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";

/**
 * Repository port for video data access operations.
 *
 * @description
 * Defines the contract for all video CRUD, workflow, thumbnail,
 * YouTube, SEO, tag, and scheduling operations. All methods return
 * `Result<T>` -- errors are represented as typed `Failure` values, never thrown.
 */
export interface IVideosRepositoryPort {
    /**
     * Fetches a paginated list of videos with optional filters.
     *
     * @param params - Pagination, status, category, and search filters
     * @returns Paginated list of video summaries
     */
    getAllVideos(
        params: IVideosQueryParams
    ): Promise<Result<IPaginatedResult<IVideoSummaryEntity>>>;

    /**
     * Fetches all active videos (excluding Archived and Rejected).
     *
     * @returns Unpaginated list of active video summaries
     */
    getActiveVideos(): Promise<Result<IVideoSummaryEntity[]>>;

    /**
     * Fetches a single video by its ID.
     *
     * @param id - The video UUID
     * @returns Full video detail entity
     */
    getVideoById(id: string): Promise<Result<IVideoEntity>>;

    /**
     * Creates a new video draft.
     *
     * @param data - Category, title, slug, description, and optional B2B/scheduling fields
     * @returns The created video entity
     */
    createVideo(data: ICreateVideoCredentials): Promise<Result<IVideoEntity>>;

    /**
     * Updates an existing video's content and metadata.
     *
     * @param id - The video UUID
     * @param data - Updated content fields
     * @returns The updated video entity
     */
    updateVideo(id: string, data: IUpdateVideoCredentials): Promise<Result<IVideoEntity>>;

    /**
     * Submits a video for review (Draft -> PendingPayment or PendingReview).
     *
     * @param id - The video UUID
     * @returns void on success
     */
    submitVideo(id: string): Promise<Result<IVideoActionResponse>>;

    /**
     * Approves a video (PendingReview -> Approved).
     *
     * @param id - The video UUID
     * @returns void on success
     */
    approveVideo(id: string): Promise<Result<IVideoActionResponse>>;

    /**
     * Publishes a video (Approved -> Published).
     *
     * @param id - The video UUID
     * @returns void on success
     */
    publishVideo(id: string): Promise<Result<IVideoActionResponse>>;

    /**
     * Rejects a video with a reason.
     *
     * @param id - The video UUID
     * @param data - Rejection reason
     * @returns void on success
     */
    rejectVideo(id: string, data: IRejectVideoCredentials): Promise<Result<IVideoActionResponse>>;

    /**
     * Archives a video.
     *
     * @param id - The video UUID
     * @returns void on success
     */
    archiveVideo(id: string): Promise<Result<IVideoActionResponse>>;

    /**
     * Permanently deletes a video.
     *
     * @param id - The video UUID
     * @returns void on success
     */
    deleteVideo(id: string): Promise<Result<IVideoActionResponse>>;

    /**
     * Uploads a thumbnail image for a video.
     *
     * @param id - The video UUID
     * @param data - File to upload as thumbnail
     * @returns The updated video entity with new thumbnail
     */
    uploadVideoThumbnail(
        id: string,
        data: IUploadVideoThumbnailCredentials
    ): Promise<Result<IVideoEntity>>;

    /**
     * Attaches a YouTube video identifier to a video.
     *
     * @param id - The video UUID
     * @param data - YouTube video ID
     * @returns The updated video entity
     */
    attachYoutubeId(id: string, data: IAttachYoutubeUrlCredentials): Promise<Result<IVideoEntity>>;

    /**
     * Updates SEO metadata for a video.
     *
     * @param id - The video UUID
     * @param data - SEO fields
     * @returns The updated video entity
     */
    updateVideoSeo(id: string, data: IUpdateVideoSeoCredentials): Promise<Result<IVideoEntity>>;

    /**
     * Replaces all tags assigned to a video.
     *
     * @param id - The video UUID
     * @param data - Array of tag IDs
     * @returns void on success
     */
    updateVideoTags(
        id: string,
        data: IUpdateVideoTagsCredentials
    ): Promise<Result<IVideoActionResponse>>;

    /**
     * Schedules a shooting date for a video.
     *
     * @param id - The video UUID
     * @param data - ISO timestamp for the scheduled shoot
     * @returns The updated video entity
     */
    scheduleShoot(id: string, data: IScheduleShootCredentials): Promise<Result<IVideoEntity>>;

    /**
     * Force-unpromotes a promoted video (SuperAdmin only).
     *
     * @param slug - The video slug
     * @param data - Justification reason for removing the promotion
     * @returns Action response with success indicator
     */
    unpromoteVideo(
        slug: string,
        data: IUnpromoteVideoCredentials
    ): Promise<Result<IVideoActionResponse>>;
}
