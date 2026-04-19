import type { IShortsRepositoryPort } from "@/modules/shorts/application/repositories/shorts.repository.port";
import type { IShortActionResponse } from "@/modules/shorts/domain/entities/IShortActionResponse";
import type { IShortVideoEntity } from "@/modules/shorts/domain/entities/IShortVideoEntity";
import { ShortsMapper } from "@/modules/shorts/infrastructure/mappers/shorts.mapper";
import type { ICreateShortCredentials } from "@/modules/shorts/presentation/model/ICreateShortCredentials";
import type { IShortsQueryParams } from "@/modules/shorts/presentation/model/IShortsQueryParams";
import type { IUploadShortThumbnailCredentials } from "@/modules/shorts/presentation/model/IUploadShortThumbnailCredentials";
import type { Result } from "@/shared/domain/results/result";
import { err, ok } from "@/shared/domain/results/result";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import { apiClient } from "@/shared/infrastructure/api/client";
import { ProblemMapper } from "@/shared/infrastructure/mappers/problem.mapper";

/**
 * Shorts repository implementation using REST API.
 *
 * @description
 * Implements the shorts repository port by delegating to the
 * generated API client and mapping responses through ShortsMapper.
 */
export class ShortsRepositoryImpl implements IShortsRepositoryPort {
    async getAllShorts(
        params: IShortsQueryParams
    ): Promise<Result<IPaginatedResult<IShortVideoEntity>>> {
        try {
            const response = await apiClient.api.adminGetAllShorts({
                pageIndex: params.pageIndex,
                pageSize: params.pageSize,
                search: params.search
            });
            const paginated = response.data.shortVideos;
            return ok({
                items: paginated.items.map(ShortsMapper.shortFromDto),
                pageIndex: paginated.pageIndex,
                pageSize: paginated.pageSize,
                count: paginated.count
            });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async getShortById(id: string): Promise<Result<IShortVideoEntity>> {
        try {
            const response = await apiClient.api.adminGetShortById(id);
            return ok(ShortsMapper.shortFromDto(response.data.shortVideo));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async createShort(data: ICreateShortCredentials): Promise<Result<IShortVideoEntity>> {
        try {
            const response = await apiClient.api.createShortVideo(
                { title: data.title, slug: data.slug, videoId: data.videoId },
                { videoFile: data.videoFile }
            );
            return ok(ShortsMapper.shortFromDto(response.data.shortVideo));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async activateShort(id: string): Promise<Result<IShortActionResponse>> {
        try {
            await apiClient.api.activateShortVideo(id);
            return ok({ isSuccess: true });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async deactivateShort(id: string): Promise<Result<IShortActionResponse>> {
        try {
            await apiClient.api.deactivateShortVideo(id);
            return ok({ isSuccess: true });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async deleteShort(id: string): Promise<Result<IShortActionResponse>> {
        try {
            await apiClient.api.deleteShortVideo(id);
            return ok({ isSuccess: true });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async uploadShortThumbnail(
        id: string,
        data: IUploadShortThumbnailCredentials
    ): Promise<Result<IShortActionResponse>> {
        try {
            await apiClient.api.uploadShortVideoThumbnail(id, { file: data.file });
            return ok({ isSuccess: true });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }
}
