import type { IShortActionResponse } from "@/modules/shorts/domain/entities/IShortActionResponse";
import type { IShortVideoEntity } from "@/modules/shorts/domain/entities/IShortVideoEntity";
import type { ICreateShortCredentials } from "@/modules/shorts/presentation/model/ICreateShortCredentials";
import type { IShortsQueryParams } from "@/modules/shorts/presentation/model/IShortsQueryParams";
import type { IUpdateShortCredentials } from "@/modules/shorts/presentation/model/IUpdateShortCredentials";
import type { IUploadShortThumbnailCredentials } from "@/modules/shorts/presentation/model/IUploadShortThumbnailCredentials";
import type { Result } from "@/shared/domain/results/result";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";

/**
 * Repository port for short video data access operations.
 *
 * @description
 * Defines the contract for all short video CRUD and status operations.
 * All methods return `Result<T>` -- errors are represented as typed
 * `Failure` values, never thrown.
 */
export interface IShortsRepositoryPort {
    /**
     * Fetches a paginated list of short videos with optional search.
     *
     * @param params - Pagination and search filters
     * @returns Paginated list of short video entities
     */
    getAllShorts(params: IShortsQueryParams): Promise<Result<IPaginatedResult<IShortVideoEntity>>>;

    /**
     * Fetches a single short video by its ID.
     *
     * @param id - The short video UUID
     * @returns Full short video entity
     */
    getShortById(id: string): Promise<Result<IShortVideoEntity>>;

    /**
     * Creates a new short video with a video file upload.
     *
     * @param data - Title, slug, video file, and optional videoId
     * @returns The created short video entity
     */
    createShort(data: ICreateShortCredentials): Promise<Result<IShortVideoEntity>>;

    /**
     * Updates a short video's title and optional linked video.
     *
     * @param id - The short video UUID
     * @param data - Updated title and optional videoId
     * @returns The updated short video entity
     */
    updateShort(id: string, data: IUpdateShortCredentials): Promise<Result<IShortVideoEntity>>;

    /**
     * Activates a short video.
     *
     * @param id - The short video UUID
     * @returns void on success
     */
    activateShort(id: string): Promise<Result<IShortActionResponse>>;

    /**
     * Deactivates a short video.
     *
     * @param id - The short video UUID
     * @returns void on success
     */
    deactivateShort(id: string): Promise<Result<IShortActionResponse>>;

    /**
     * Permanently deletes a short video.
     *
     * @param id - The short video UUID
     * @returns void on success
     */
    deleteShort(id: string): Promise<Result<IShortActionResponse>>;

    /**
     * Uploads a thumbnail image for a short video.
     *
     * @param id - The short video UUID
     * @param data - File to upload as thumbnail
     * @returns The updated short video entity with new thumbnail URL
     */
    uploadShortThumbnail(
        id: string,
        data: IUploadShortThumbnailCredentials
    ): Promise<Result<IShortVideoEntity>>;
}
