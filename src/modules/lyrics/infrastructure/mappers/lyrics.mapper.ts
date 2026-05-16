import type { ILyricsEntity } from "@/modules/lyrics/domain/entities/ILyricsEntity";
import type { LyricsDto } from "@/shared/infrastructure/api/generated/116.api";

/**
 * Mapper for converting API DTOs to domain entities in the lyrics module.
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
export const LyricsMapper = {
    /**
     * Maps LyricsDto to ILyricsEntity domain entity.
     *
     * @param {LyricsDto} dto - Lyrics data from API
     * @returns {ILyricsEntity} Mapped lyrics entity
     */
    lyricsFromDto(dto: LyricsDto): ILyricsEntity {
        return {
            id: dto.id,
            songTitle: dto.songTitle,
            artistName: dto.artistName,
            lyricsText: dto.lyricsText,
            language: dto.language,
            videoId: dto.videoId,
            metaTitle: dto.metaTitle,
            metaDescription: dto.metaDescription,
            metaKeywords: dto.metaKeywords,
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt,
            createdBy: dto.createdBy,
            updatedBy: dto.updatedBy
        };
    }
} as const;
