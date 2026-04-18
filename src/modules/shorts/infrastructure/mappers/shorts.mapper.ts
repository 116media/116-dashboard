import type { IShortVideoEntity } from "@/modules/shorts/domain/entities/IShortVideoEntity";
import type { ShortVideoDto } from "@/shared/infrastructure/api/generated/116.api";

/**
 * Mapper for converting API DTOs to domain entities in the shorts module.
 *
 * @description
 * Provides pure transformation functions to map data transfer objects (DTOs)
 * from the API layer to clean domain entities.
 *
 * @remarks
 * - All methods are stateless pure functions
 * - Marked as const to prevent accidental mutation
 * - Part of the infrastructure layer
 */
export const ShortsMapper = {
    /**
     * Maps ShortVideoDto to IShortVideoEntity domain entity.
     *
     * @param {ShortVideoDto} dto - Short video data from API
     * @returns {IShortVideoEntity} Mapped short video entity
     */
    shortFromDto(dto: ShortVideoDto): IShortVideoEntity {
        return {
            id: dto.id,
            title: dto.title,
            slug: dto.slug,
            videoUrl: dto.videoUrl,
            thumbnailUrl: dto.thumbnailUrl,
            hasFullVideo: dto.hasFullVideo,
            isActive: dto.isActive,
            viewCount: dto.viewCount,
            likeCount: dto.likeCount,
            shareCount: dto.shareCount,
            bookmarkCount: dto.bookmarkCount,
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt,
            createdBy: dto.createdBy,
            updatedBy: dto.updatedBy
        };
    }
} as const;
