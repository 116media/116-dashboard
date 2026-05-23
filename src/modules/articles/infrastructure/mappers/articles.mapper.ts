import type { IArticleEntity } from "@/modules/articles/domain/entities/IArticleEntity";
import type { IArticleImageEntity } from "@/modules/articles/domain/entities/IArticleImageEntity";
import type { IArticleSummaryEntity } from "@/modules/articles/domain/entities/IArticleSummaryEntity";
import { mapArticleImageType } from "@/modules/articles/infrastructure/mappers/article-image-type.mapper";
import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";
import { ContentStatus } from "@/shared/domain/enums/content-status.enum";
import type {
    ArticleDetailDto,
    ArticleImageDto,
    ArticleSummaryDto,
    TagDto
} from "@/shared/infrastructure/api/generated/116.api";
import { mapContentStatus } from "@/shared/infrastructure/mappers/content-status.mapper";

/**
 * Mapper for converting API DTOs to domain entities in the articles module.
 *
 * @description
 * Provides pure transformation functions to map data transfer objects (DTOs)
 * from the API layer to clean domain entities. Handles nested object mappings
 * for images and tags within articles.
 *
 * @remarks
 * - All methods are stateless pure functions
 * - Marked as const to prevent accidental mutation
 * - Part of the infrastructure layer
 */
export const ArticlesMapper = {
    /**
     * Maps ArticleImageDto to IArticleImageEntity domain entity.
     *
     * @param {ArticleImageDto} dto - Article image data from API
     * @returns {IArticleImageEntity} Mapped article image entity
     */
    articleImageFromDto(dto: ArticleImageDto): IArticleImageEntity {
        return {
            id: dto.id,
            url: dto.url,
            storageKey: dto.storageKey,
            imageType: mapArticleImageType(dto.imageType)
        };
    },

    /**
     * Maps TagDto to ITagEntity domain entity.
     *
     * @param {TagDto} dto - Tag data from API
     * @returns {ITagEntity} Mapped tag entity
     */
    tagFromDto(dto: TagDto): ITagEntity {
        return {
            id: dto.id,
            name: dto.name,
            slug: dto.slug
        };
    },

    /**
     * Maps ArticleDetailDto to IArticleEntity domain entity.
     *
     * @param {ArticleDetailDto} dto - Full article detail data from API
     * @returns {IArticleEntity} Mapped article entity with nested images and tags
     */
    articleFromDto(dto: ArticleDetailDto): IArticleEntity {
        return {
            id: dto.id,
            categoryId: dto.categoryId,
            categoryName: dto.categoryName,
            title: dto.title,
            slug: dto.slug,
            headline: dto.headline,
            body: dto.body,
            coverImageUrl: dto.coverImageUrl,
            authorId: dto.authorId,
            status: mapContentStatus(dto.status),
            rejectionReason: dto.rejectionReason,
            socialBoost: dto.socialBoost,
            isFeatured: dto.isFeatured,
            featuredUntil: dto.featuredUntil,
            publishedAt: dto.publishedAt,
            metaTitle: dto.metaTitle,
            metaDescription: dto.metaDescription,
            customerId: dto.customerId,
            customerName: dto.customerName,
            orderItemId: dto.orderItemId,
            images: dto.images.map(ArticlesMapper.articleImageFromDto),
            tags: dto.tags.map(ArticlesMapper.tagFromDto),
            readTimeInMinutes: dto.readTimeInMinutes,
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt,
            createdBy: dto.createdBy,
            updatedBy: dto.updatedBy,
            author: dto.author
                ? {
                      userName: dto.author.userName,
                      email: dto.author.email,
                      avatarUrl: dto.author.avatarUrl,
                      role: dto.author.role
                  }
                : null
        };
    },

    /**
     * Maps ArticleSummaryDto to IArticleSummaryEntity domain entity.
     *
     * @param {ArticleSummaryDto} dto - Article summary data from API
     * @returns {IArticleSummaryEntity} Mapped article summary entity
     */
    articleSummaryFromDto(dto: ArticleSummaryDto): IArticleSummaryEntity {
        const status = mapContentStatus(dto.status);
        return {
            id: dto.id,
            categoryId: dto.categoryId,
            categoryName: dto.categoryName,
            title: dto.title,
            slug: dto.slug,
            headline: dto.headline,
            coverImageUrl: dto.coverImageUrl,
            authorId: dto.authorId,
            status,
            canDelete: [ContentStatus.Draft, ContentStatus.Rejected].includes(status),
            canSubmit: [ContentStatus.Draft, ContentStatus.Rejected].includes(status),
            canApprove: status === ContentStatus.PendingReview,
            canPublish: status === ContentStatus.Approved,
            canReject: [ContentStatus.PendingReview, ContentStatus.Approved].includes(status),
            canArchive: [ContentStatus.Published, ContentStatus.Rejected].includes(status),
            isFeatured: dto.isFeatured,
            publishedAt: dto.publishedAt,
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt,
            createdBy: dto.createdBy,
            updatedBy: dto.updatedBy
        };
    }
} as const;
