import dayjs from "dayjs";
import type { IVideosRepositoryPort } from "@/modules/videos/application/repositories/videos.repository.port";
import type { IVideoActionResponse } from "@/modules/videos/domain/entities/IVideoActionResponse";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import type { IVideoSummaryEntity } from "@/modules/videos/domain/entities/IVideoSummaryEntity";
import { VideosMapper } from "@/modules/videos/infrastructure/mappers/videos.mapper";
import type { IAttachYoutubeUrlCredentials } from "@/modules/videos/presentation/model/IAttachYoutubeUrlCredentials";
import type { ICreateVideoCredentials } from "@/modules/videos/presentation/model/ICreateVideoCredentials";
import type { IRejectVideoCredentials } from "@/modules/videos/presentation/model/IRejectVideoCredentials";
import type { IScheduleShootCredentials } from "@/modules/videos/presentation/model/IScheduleShootCredentials";
import type { IUpdateVideoCredentials } from "@/modules/videos/presentation/model/IUpdateVideoCredentials";
import type { IUpdateVideoSeoCredentials } from "@/modules/videos/presentation/model/IUpdateVideoSeoCredentials";
import type { IUpdateVideoTagsCredentials } from "@/modules/videos/presentation/model/IUpdateVideoTagsCredentials";
import type { IUploadVideoThumbnailCredentials } from "@/modules/videos/presentation/model/IUploadVideoThumbnailCredentials";
import type { IVideosQueryParams } from "@/modules/videos/presentation/model/IVideosQueryParams";
import type { Result } from "@/shared/domain/results/result";
import { err, ok } from "@/shared/domain/results/result";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import { apiClient } from "@/shared/infrastructure/api/client";
import type { EnumContentStatus } from "@/shared/infrastructure/api/generated/116.api";
import { ProblemMapper } from "@/shared/infrastructure/mappers/problem.mapper";

/**
 * Videos repository implementation using REST API.
 *
 * @description
 * Implements the videos repository port by delegating to the
 * generated API client and mapping responses through VideosMapper.
 */
export class VideosRepositoryImpl implements IVideosRepositoryPort {
    async getAllVideos(
        params: IVideosQueryParams
    ): Promise<Result<IPaginatedResult<IVideoSummaryEntity>>> {
        try {
            const response = await apiClient.api.adminGetAllVideos({
                pageIndex: params.pageIndex,
                pageSize: params.pageSize,
                status: params.status as EnumContentStatus | undefined,
                categoryId: params.categoryId,
                search: params.search
            });
            const paginated = response.data.videos;
            return ok({
                items: paginated.items.map(VideosMapper.videoSummaryFromDto),
                pageIndex: paginated.pageIndex,
                pageSize: paginated.pageSize,
                count: paginated.count
            });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async getActiveVideos(): Promise<Result<IVideoSummaryEntity[]>> {
        try {
            const response = await apiClient.api.adminGetActiveVideos();
            return ok(response.data.videos.map(VideosMapper.videoSummaryFromDto));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async getVideoById(id: string): Promise<Result<IVideoEntity>> {
        try {
            const response = await apiClient.api.adminGetVideoById(id);
            return ok(VideosMapper.videoFromDto(response.data.video));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async createVideo(data: ICreateVideoCredentials): Promise<Result<IVideoEntity>> {
        try {
            const response = await apiClient.api.createVideo(data);
            return ok(VideosMapper.videoFromDto(response.data.video));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async updateVideo(id: string, data: IUpdateVideoCredentials): Promise<Result<IVideoEntity>> {
        try {
            const response = await apiClient.api.updateVideo(id, data);
            return ok(VideosMapper.videoFromDto(response.data.video));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async submitVideo(id: string): Promise<Result<IVideoActionResponse>> {
        try {
            const response = await apiClient.api.submitVideo(id);
            return ok({ isSuccess: response.data.isSuccess });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async approveVideo(id: string): Promise<Result<IVideoActionResponse>> {
        try {
            const response = await apiClient.api.approveVideo(id);
            return ok({ isSuccess: response.data.isSuccess });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async publishVideo(id: string): Promise<Result<IVideoActionResponse>> {
        try {
            const response = await apiClient.api.publishVideo(id);
            return ok({ isSuccess: response.data.isSuccess });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async rejectVideo(
        id: string,
        data: IRejectVideoCredentials
    ): Promise<Result<IVideoActionResponse>> {
        try {
            const response = await apiClient.api.rejectVideo(id, { reason: data.rejectionReason });
            return ok({ isSuccess: response.data.isSuccess });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async archiveVideo(id: string): Promise<Result<IVideoActionResponse>> {
        try {
            const response = await apiClient.api.archiveVideo(id);
            return ok({ isSuccess: response.data.isSuccess });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async deleteVideo(id: string): Promise<Result<IVideoActionResponse>> {
        try {
            const response = await apiClient.api.deleteVideo(id);
            return ok({ isSuccess: response.data.isSuccess });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async uploadVideoThumbnail(
        id: string,
        data: IUploadVideoThumbnailCredentials
    ): Promise<Result<IVideoEntity>> {
        try {
            await apiClient.api.uploadVideoThumbnail(id, { file: data.file });
            const videoResponse = await apiClient.api.adminGetVideoById(id);
            return ok(VideosMapper.videoFromDto(videoResponse.data.video));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async attachYoutubeId(
        id: string,
        data: IAttachYoutubeUrlCredentials
    ): Promise<Result<IVideoEntity>> {
        try {
            const response = await apiClient.api.attachYoutubeVideoUrl(id, {
                youtubeVideoUrl: data.youtubeVideoUrl
            });
            return ok(VideosMapper.videoFromDto(response.data.video));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async updateVideoSeo(
        id: string,
        data: IUpdateVideoSeoCredentials
    ): Promise<Result<IVideoEntity>> {
        try {
            const response = await apiClient.api.updateVideoSeo(id, data);
            return ok(VideosMapper.videoFromDto(response.data.video));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async updateVideoTags(
        id: string,
        data: IUpdateVideoTagsCredentials
    ): Promise<Result<IVideoActionResponse>> {
        try {
            const response = await apiClient.api.updateVideoTags(id, data);
            return ok({ isSuccess: response.data.isSuccess });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async scheduleShoot(
        id: string,
        data: IScheduleShootCredentials
    ): Promise<Result<IVideoEntity>> {
        try {
            const { shootingScheduledAt } = data;
            await apiClient.api.scheduleShoot(id, {
                shootingScheduledAt: dayjs(shootingScheduledAt).toISOString()
            });
            const videoResponse = await apiClient.api.adminGetVideoById(id);
            return ok(VideosMapper.videoFromDto(videoResponse.data.video));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }
}
