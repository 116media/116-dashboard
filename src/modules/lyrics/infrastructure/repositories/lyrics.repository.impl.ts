import type { ILyricsRepositoryPort } from "@/modules/lyrics/application/repositories/lyrics.repository.port";
import type { ILyricsEntity } from "@/modules/lyrics/domain/entities/ILyricsEntity";
import { LyricsMapper } from "@/modules/lyrics/infrastructure/mappers/lyrics.mapper";
import type { ICreateLyricsCredentials } from "@/modules/lyrics/presentation/model/ICreateLyricsCredentials";
import type { ILyricsQueryParams } from "@/modules/lyrics/presentation/model/ILyricsQueryParams";
import type { IUpdateLyricsCredentials } from "@/modules/lyrics/presentation/model/IUpdateLyricsCredentials";
import type { IUpdateLyricsSeoCredentials } from "@/modules/lyrics/presentation/model/IUpdateLyricsSeoCredentials";
import type { Result } from "@/shared/domain/results/result";
import { err, ok } from "@/shared/domain/results/result";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import { apiClient } from "@/shared/infrastructure/api/client";
import { ProblemMapper } from "@/shared/infrastructure/mappers/problem.mapper";

/**
 * Lyrics repository implementation using REST API.
 *
 * @description
 * Implements the lyrics repository port by delegating to the
 * generated API client and mapping responses through LyricsMapper.
 */
export class LyricsRepositoryImpl implements ILyricsRepositoryPort {
    /**
     * @inheritdoc
     */
    async getAllLyrics(
        params: ILyricsQueryParams
    ): Promise<Result<IPaginatedResult<ILyricsEntity>>> {
        try {
            const response = await apiClient.api.adminGetAllLyrics({
                pageIndex: params.pageIndex,
                pageSize: params.pageSize,
                search: params.search
            });
            const paginated = response.data.lyrics;
            return ok({
                items: paginated.items.map(LyricsMapper.lyricsFromDto),
                pageIndex: paginated.pageIndex,
                pageSize: paginated.pageSize,
                count: paginated.count
            });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    /**
     * @inheritdoc
     */
    async createLyrics(data: ICreateLyricsCredentials): Promise<Result<ILyricsEntity>> {
        try {
            const response = await apiClient.api.createLyrics(data);
            return ok(LyricsMapper.lyricsFromDto(response.data.lyrics));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    /**
     * @inheritdoc
     */
    async updateLyrics(id: string, data: IUpdateLyricsCredentials): Promise<Result<ILyricsEntity>> {
        try {
            const response = await apiClient.api.updateLyrics(id, data);
            return ok(LyricsMapper.lyricsFromDto(response.data.lyrics));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    /**
     * @inheritdoc
     */
    async updateLyricsSeo(
        id: string,
        data: IUpdateLyricsSeoCredentials
    ): Promise<Result<ILyricsEntity>> {
        try {
            const response = await apiClient.api.updateLyricsSeo(id, data);
            return ok(LyricsMapper.lyricsFromDto(response.data.lyrics));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }
}
