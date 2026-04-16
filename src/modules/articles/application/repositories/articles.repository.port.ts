import type { IArticleActionResponse } from "@/modules/articles/domain/entities/IArticleActionResponse";
import type { IArticleEntity } from "@/modules/articles/domain/entities/IArticleEntity";
import type { IArticleImageEntity } from "@/modules/articles/domain/entities/IArticleImageEntity";
import type { IArticleSummaryEntity } from "@/modules/articles/domain/entities/IArticleSummaryEntity";
import type { IArticlesQueryParams } from "@/modules/articles/presentation/model/IArticlesQueryParams";
import type { ICreateArticleCredentials } from "@/modules/articles/presentation/model/ICreateArticleCredentials";
import type { IRejectArticleCredentials } from "@/modules/articles/presentation/model/IRejectArticleCredentials";
import type { IUpdateArticleCredentials } from "@/modules/articles/presentation/model/IUpdateArticleCredentials";
import type { IUpdateArticleSeoCredentials } from "@/modules/articles/presentation/model/IUpdateArticleSeoCredentials";
import type { IUpdateArticleTagsCredentials } from "@/modules/articles/presentation/model/IUpdateArticleTagsCredentials";
import type { IUploadArticleImageCredentials } from "@/modules/articles/presentation/model/IUploadArticleImageCredentials";
import type { Result } from "@/shared/domain/results/result";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";

/**
 * Repository port for article data access operations.
 *
 * @description
 * Defines the contract for all article CRUD, workflow, image,
 * SEO, and tag operations. All methods return `Result<T>` —
 * errors are represented as typed `Failure` values, never thrown.
 */
export interface IArticlesRepositoryPort {
    /**
     * Fetches a paginated list of articles with optional filters.
     *
     * @param params - Pagination, status, category, and search filters
     * @returns Paginated list of article summaries
     */
    getAllArticles(
        params: IArticlesQueryParams
    ): Promise<Result<IPaginatedResult<IArticleSummaryEntity>>>;

    /**
     * Fetches a single article by its ID.
     *
     * @param id - The article UUID
     * @returns Full article detail entity
     */
    getArticleById(id: string): Promise<Result<IArticleEntity>>;

    /**
     * Creates a new article draft.
     *
     * @param data - Category, title, slug, and optional B2B fields
     * @returns The created article entity
     */
    createArticle(data: ICreateArticleCredentials): Promise<Result<IArticleEntity>>;

    /**
     * Updates an existing article's content and metadata.
     *
     * @param id - The article UUID
     * @param data - Updated content fields
     * @returns The updated article entity
     */
    updateArticle(id: string, data: IUpdateArticleCredentials): Promise<Result<IArticleEntity>>;

    /**
     * Submits an article for review (Draft → PendingPayment or PendingReview).
     *
     * @param id - The article UUID
     * @returns Action response with success indicator
     */
    submitArticle(id: string): Promise<Result<IArticleActionResponse>>;

    /**
     * Approves an article (PendingReview → Approved).
     *
     * @param id - The article UUID
     * @returns Action response with success indicator
     */
    approveArticle(id: string): Promise<Result<IArticleActionResponse>>;

    /**
     * Publishes an article (Approved → Published).
     *
     * @param id - The article UUID
     * @returns Action response with success indicator
     */
    publishArticle(id: string): Promise<Result<IArticleActionResponse>>;

    /**
     * Rejects an article with a reason.
     *
     * @param id - The article UUID
     * @param data - Rejection reason
     * @returns Action response with success indicator
     */
    rejectArticle(
        id: string,
        data: IRejectArticleCredentials
    ): Promise<Result<IArticleActionResponse>>;

    /**
     * Archives an article.
     *
     * @param id - The article UUID
     * @returns Action response with success indicator
     */
    archiveArticle(id: string): Promise<Result<IArticleActionResponse>>;

    /**
     * Permanently deletes an article.
     *
     * @param id - The article UUID
     * @returns Action response with success indicator
     */
    deleteArticle(id: string): Promise<Result<IArticleActionResponse>>;

    /**
     * Uploads an image for an article (cover or body).
     *
     * @param id - The article UUID
     * @param data - File and image type
     * @returns The uploaded image entity
     */
    uploadArticleImage(
        id: string,
        data: IUploadArticleImageCredentials
    ): Promise<Result<IArticleImageEntity>>;

    /**
     * Updates SEO metadata for an article.
     *
     * @param id - The article UUID
     * @param data - SEO fields
     * @returns The updated article entity
     */
    updateArticleSeo(
        id: string,
        data: IUpdateArticleSeoCredentials
    ): Promise<Result<IArticleEntity>>;

    /**
     * Replaces all tags assigned to an article.
     *
     * @param id - The article UUID
     * @param data - Array of tag IDs
     * @returns Action response with success indicator
     */
    updateArticleTags(
        id: string,
        data: IUpdateArticleTagsCredentials
    ): Promise<Result<IArticleActionResponse>>;
}
