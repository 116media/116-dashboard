import type { IVideosRepositoryPort } from "@/modules/videos/application/repositories/videos.repository.port";
import type { IVideoActionResponse } from "@/modules/videos/domain/entities/IVideoActionResponse";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import type { IVideoSummaryEntity } from "@/modules/videos/domain/entities/IVideoSummaryEntity";
import { VideosMapper } from "@/modules/videos/infrastructure/mappers/videos.mapper";
import type { IAttachYoutubeIdCredentials } from "@/modules/videos/presentation/model/IAttachYoutubeIdCredentials";
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
import { ProblemMapper } from "@/shared/infrastructure/mappers/problem.mapper";

/**
 * Videos repository implementation using REST API.
 *
 * @description
 * Implements the videos repository port by delegating to the
 * generated API client and mapping responses through VideosMapper.
 */
export class VideosRepositoryImpl implements IVideosRepositoryPort {
    /**
     * @inheritdoc
     */
    async getAllVideos(
        params: IVideosQueryParams
    ): Promise<Result<IPaginatedResult<IVideoSummaryEntity>>> {
        try {
            const response = await apiClient.api.adminGetAllVideos({
                pageIndex: params.pageIndex,
                pageSize: params.pageSize,
                status: params.status,
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

    /**
     * @inheritdoc
     */
    async getVideoById(id: string): Promise<Result<IVideoEntity>> {
        try {
            const response = await apiClient.api.adminGetVideoById(id);
            return ok(VideosMapper.videoFromDto(response.data.video));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    /**
     * @inheritdoc
     */
    async createVideo(data: ICreateVideoCredentials): Promise<Result<IVideoEntity>> {
        try {
            const response = await apiClient.api.createVideo(data);
            return ok(VideosMapper.videoFromDto(response.data.video));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    /**
     * @inheritdoc
     */
    async updateVideo(id: string, data: IUpdateVideoCredentials): Promise<Result<IVideoEntity>> {
        try {
            const response = await apiClient.api.updateVideo(id, data);
            return ok(VideosMapper.videoFromDto(response.data.video));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    /**
     * @inheritdoc
     */
    async submitVideo(id: string): Promise<Result<IVideoActionResponse>> {
        try {
            const response = await apiClient.api.submitVideo(id);
            return ok({ isSuccess: response.data.isSuccess });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    /**
     * @inheritdoc
     */
    async approveVideo(id: string): Promise<Result<IVideoActionResponse>> {
        try {
            const response = await apiClient.api.approveVideo(id);
            return ok({ isSuccess: response.data.isSuccess });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    /**
     * @inheritdoc
     */
    async publishVideo(id: string): Promise<Result<IVideoActionResponse>> {
        try {
            const response = await apiClient.api.publishVideo(id);
            return ok({ isSuccess: response.data.isSuccess });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    /**
     * @inheritdoc
     */
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

    /**
     * @inheritdoc
     */
    async archiveVideo(id: string): Promise<Result<IVideoActionResponse>> {
        try {
            const response = await apiClient.api.archiveVideo(id);
            return ok({ isSuccess: response.data.isSuccess });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    /**
     * @inheritdoc
     */
    async deleteVideo(id: string): Promise<Result<IVideoActionResponse>> {
        try {
            const response = await apiClient.api.deleteVideo(id);
            return ok({ isSuccess: response.data.isSuccess });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    /**
     * @inheritdoc
     */
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

    /**
     * @inheritdoc
     */
    async attachYoutubeId(
        id: string,
        data: IAttachYoutubeIdCredentials
    ): Promise<Result<IVideoEntity>> {
        try {
            const response = await apiClient.api.attachYoutubeId(id, data);
            return ok(VideosMapper.videoFromDto(response.data.video));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    /**
     * @inheritdoc
     */
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

    /**
     * @inheritdoc
     */
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

    /**
     * @inheritdoc
     */
    async scheduleShoot(
        id: string,
        data: IScheduleShootCredentials
    ): Promise<Result<IVideoEntity>> {
        try {
            await apiClient.api.scheduleShoot(id, data);
            const videoResponse = await apiClient.api.adminGetVideoById(id);
            return ok(VideosMapper.videoFromDto(videoResponse.data.video));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }
}
