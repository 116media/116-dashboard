import type { ILyricsEntity } from "@/modules/lyrics/domain/entities/ILyricsEntity";
import type { ICreateLyricsCredentials } from "@/modules/lyrics/presentation/model/ICreateLyricsCredentials";
import type { ILyricsQueryParams } from "@/modules/lyrics/presentation/model/ILyricsQueryParams";
import type { IUpdateLyricsCredentials } from "@/modules/lyrics/presentation/model/IUpdateLyricsCredentials";
import type { IUpdateLyricsSeoCredentials } from "@/modules/lyrics/presentation/model/IUpdateLyricsSeoCredentials";
import type { Result } from "@/shared/domain/results/result";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";

/**
 * Repository port for lyrics data access operations.
 *
 * @description
 * Defines the contract for all lyrics CRUD and SEO operations.
 * All methods return `Result<T>` -- errors are represented as
 * typed `Failure` values, never thrown.
 */
export interface ILyricsRepositoryPort {
    /**
     * Fetches a paginated list of lyrics with optional search filter.
     *
     * @param params - Pagination and search filters
     * @returns Paginated list of lyrics entities
     */
    getAllLyrics(params: ILyricsQueryParams): Promise<Result<IPaginatedResult<ILyricsEntity>>>;

    /**
     * Creates a new lyrics record.
     *
     * @param data - Song title, artist name, lyrics text, language, and optional associations
     * @returns The created lyrics entity
     */
    createLyrics(data: ICreateLyricsCredentials): Promise<Result<ILyricsEntity>>;

    /**
     * Updates an existing lyrics record's text content.
     *
     * @param id - The lyrics UUID
     * @param data - Updated lyrics text
     * @returns The updated lyrics entity
     */
    updateLyrics(id: string, data: IUpdateLyricsCredentials): Promise<Result<ILyricsEntity>>;

    /**
     * Updates SEO metadata for a lyrics record.
     *
     * @param id - The lyrics UUID
     * @param data - SEO fields
     * @returns The updated lyrics entity
     */
    updateLyricsSeo(id: string, data: IUpdateLyricsSeoCredentials): Promise<Result<ILyricsEntity>>;
}
