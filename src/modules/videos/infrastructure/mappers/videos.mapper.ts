import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import type { IVideoSummaryEntity } from "@/modules/videos/domain/entities/IVideoSummaryEntity";
import type {
    TagDto,
    VideoDetailDto,
    VideoSummaryDto
} from "@/shared/infrastructure/api/generated/116.api";

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
            status: dto.status,
            rejectionReason: dto.rejectionReason,
            youtubeVideoId: dto.youtubeVideoId,
            isFeatured: dto.isFeatured,
            featuredUntil: dto.featuredUntil,
            hasLyrics: dto.hasLyrics,
            shootingScheduledAt: dto.shootingScheduledAt,
            publishedAt: dto.publishedAt,
            metaTitle: dto.metaTitle,
            metaDescription: dto.metaDescription,
            tags: dto.tags.map(VideosMapper.tagFromDto),
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
        return {
            id: dto.id,
            categoryId: dto.categoryId,
            categoryName: dto.categoryName,
            title: dto.title,
            slug: dto.slug,
            thumbnailUrl: dto.thumbnailUrl,
            authorId: dto.authorId,
            status: dto.status,
            youtubeVideoId: dto.youtubeVideoId,
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
