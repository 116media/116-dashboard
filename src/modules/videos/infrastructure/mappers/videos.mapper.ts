import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import type { IVideoSummaryEntity } from "@/modules/videos/domain/entities/IVideoSummaryEntity";
import { ContentStatus } from "@/shared/domain/enums/content-status.enum";
import type {
    TagDto,
    VideoDetailDto,
    VideoSummaryDto
} from "@/shared/infrastructure/api/generated/116.api";
import { mapContentStatus } from "@/shared/infrastructure/mappers/content-status.mapper";

/**
 * Mapper for converting API DTOs to domain entities in the videos module.
 *
 * @description
 * Provides pure transformation functions to map data transfer objects (DTOs)
 * from the API layer to clean domain entities. Handles nested object mappings
 * for tags within videos.
 *
 * @remarks
 * - All methods are stateless pure functions
 * - Marked as const to prevent accidental mutation
 * - Part of the infrastructure layer
 */
export const VideosMapper = {
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
     * Maps VideoDetailDto to IVideoEntity domain entity.
     *
     * @param {VideoDetailDto} dto - Full video detail data from API
     * @returns {IVideoEntity} Mapped video entity with nested tags
     */
    videoFromDto(dto: VideoDetailDto): IVideoEntity {
        return {
            id: dto.id,
            categoryId: dto.categoryId,
            categoryName: dto.categoryName,
            title: dto.title,
            slug: dto.slug,
            description: dto.description,
            thumbnailUrl: dto.thumbnailUrl,
            thumbnailStorageKey: dto.thumbnailStorageKey,
            authorId: dto.authorId,
            status: mapContentStatus(dto.status),
            rejectionReason: dto.rejectionReason,
            youtubeVideoUrl: dto.youtubeVideoUrl,
            isFeatured: dto.isFeatured,
            featuredUntil: dto.featuredUntil,
            hasLyrics: dto.hasLyrics,
            shootingScheduledAt: dto.shootingScheduledAt,
            publishedAt: dto.publishedAt,
            metaTitle: dto.metaTitle,
            metaDescription: dto.metaDescription,
            customerId: dto.customerId,
            customerName: dto.customerName,
            orderItemId: dto.orderItemId,
            tags: dto.tags.map(VideosMapper.tagFromDto),
            author: dto.author
                ? {
                      userName: dto.author.userName,
                      email: dto.author.email ?? null,
                      avatarUrl: dto.author.avatarUrl ?? null,
                      role: dto.author.role ?? null
                  }
                : null,
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt,
            createdBy: dto.createdBy,
            updatedBy: dto.updatedBy
        };
    },

    /**
     * Maps VideoSummaryDto to IVideoSummaryEntity domain entity.
     *
     * @param {VideoSummaryDto} dto - Video summary data from API
     * @returns {IVideoSummaryEntity} Mapped video summary entity
     */
    videoSummaryFromDto(dto: VideoSummaryDto): IVideoSummaryEntity {
        const contentStatus = mapContentStatus(dto.status);

        return {
            id: dto.id,
            categoryId: dto.categoryId,
            categoryName: dto.categoryName,
            title: dto.title,
            slug: dto.slug,
            thumbnailUrl: dto.thumbnailUrl,
            authorId: dto.authorId,
            status: contentStatus,
            canDelete: [ContentStatus.Draft, ContentStatus.Rejected].includes(contentStatus),
            canSubmit: [ContentStatus.Draft, ContentStatus.Rejected].includes(contentStatus),
            canApprove: contentStatus === ContentStatus.PendingReview,
            canPublish: contentStatus === ContentStatus.Approved && !!dto.youtubeVideoUrl,
            canReject: [ContentStatus.PendingReview, ContentStatus.Approved].includes(
                contentStatus
            ),
            canArchive: [ContentStatus.Published, ContentStatus.Rejected].includes(contentStatus),
            youtubeVideoUrl: dto.youtubeVideoUrl,
            isFeatured: dto.isFeatured,
            hasLyrics: dto.hasLyrics,
            publishedAt: dto.publishedAt,
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt,
            createdBy: dto.createdBy,
            updatedBy: dto.updatedBy
        };
    }
} as const;
