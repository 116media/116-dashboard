import type { IArticlesRepositoryPort } from "@/modules/articles/application/repositories/articles.repository.port";
import type { IArticleActionResponse } from "@/modules/articles/domain/entities/IArticleActionResponse";
import type { IArticleEntity } from "@/modules/articles/domain/entities/IArticleEntity";
import type { IArticleImageEntity } from "@/modules/articles/domain/entities/IArticleImageEntity";
import type { IArticleSummaryEntity } from "@/modules/articles/domain/entities/IArticleSummaryEntity";
import { ArticlesMapper } from "@/modules/articles/infrastructure/mappers/articles.mapper";
import type { IArticlesQueryParams } from "@/modules/articles/presentation/model/IArticlesQueryParams";
import type { ICreateArticleCredentials } from "@/modules/articles/presentation/model/ICreateArticleCredentials";
import type { IRejectArticleCredentials } from "@/modules/articles/presentation/model/IRejectArticleCredentials";
import type { IUpdateArticleCredentials } from "@/modules/articles/presentation/model/IUpdateArticleCredentials";
import type { IUpdateArticleSeoCredentials } from "@/modules/articles/presentation/model/IUpdateArticleSeoCredentials";
import type { IUpdateArticleTagsCredentials } from "@/modules/articles/presentation/model/IUpdateArticleTagsCredentials";
import type { IUploadArticleImageCredentials } from "@/modules/articles/presentation/model/IUploadArticleImageCredentials";
import type { Result } from "@/shared/domain/results/result";
import { err, ok } from "@/shared/domain/results/result";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import { apiClient } from "@/shared/infrastructure/api/client";
import type { EnumContentStatus } from "@/shared/infrastructure/api/generated/116.api";
import { ProblemMapper } from "@/shared/infrastructure/mappers/problem.mapper";

/**
 * Articles repository implementation using REST API.
 *
 * @description
 * Implements the articles repository port by delegating to the
 * generated API client and mapping responses through ArticlesMapper.
 */
export class ArticlesRepositoryImpl implements IArticlesRepositoryPort {
    async getAllArticles(
        params: IArticlesQueryParams
    ): Promise<Result<IPaginatedResult<IArticleSummaryEntity>>> {
        try {
            const response = await apiClient.api.adminGetAllArticles({
                pageIndex: params.pageIndex,
                pageSize: params.pageSize,
                status: params.status as EnumContentStatus | undefined,
                categoryId: params.categoryId,
                search: params.search
            });
            const paginated = response.data.articles;
            return ok({
                items: paginated.items.map(ArticlesMapper.articleSummaryFromDto),
                pageIndex: paginated.pageIndex,
                pageSize: paginated.pageSize,
                count: paginated.count
            });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async getArticleById(id: string): Promise<Result<IArticleEntity>> {
        try {
            const response = await apiClient.api.adminGetArticleById(id);
            return ok(ArticlesMapper.articleFromDto(response.data.article));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async createArticle(data: ICreateArticleCredentials): Promise<Result<IArticleEntity>> {
        try {
            const response = await apiClient.api.createArticle(data);
            return ok(ArticlesMapper.articleFromDto(response.data.article));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async updateArticle(
        id: string,
        data: IUpdateArticleCredentials
    ): Promise<Result<IArticleEntity>> {
        try {
            const response = await apiClient.api.updateArticle(id, data);
            return ok(ArticlesMapper.articleFromDto(response.data.article));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async submitArticle(id: string): Promise<Result<IArticleActionResponse>> {
        try {
            const response = await apiClient.api.submitArticle(id);
            return ok({ isSuccess: response.data.isSuccess });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async approveArticle(id: string): Promise<Result<IArticleActionResponse>> {
        try {
            const response = await apiClient.api.approveArticle(id);
            return ok({ isSuccess: response.data.isSuccess });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async publishArticle(id: string): Promise<Result<IArticleActionResponse>> {
        try {
            const response = await apiClient.api.publishArticle(id);
            return ok({ isSuccess: response.data.isSuccess });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async rejectArticle(
        id: string,
        data: IRejectArticleCredentials
    ): Promise<Result<IArticleActionResponse>> {
        try {
            const response = await apiClient.api.rejectArticle(id, {
                reason: data.rejectionReason
            });
            return ok({ isSuccess: response.data.isSuccess });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async archiveArticle(id: string): Promise<Result<IArticleActionResponse>> {
        try {
            const response = await apiClient.api.archiveArticle(id);
            return ok({ isSuccess: response.data.isSuccess });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async deleteArticle(id: string): Promise<Result<IArticleActionResponse>> {
        try {
            const response = await apiClient.api.deleteArticle(id);
            return ok({ isSuccess: response.data.isSuccess });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async uploadArticleImage(
        id: string,
        data: IUploadArticleImageCredentials
    ): Promise<Result<IArticleImageEntity>> {
        try {
            const response = await apiClient.api.uploadArticleImage(
                id,
                { imageType: data.imageType },
                { file: data.file }
            );
            return ok(ArticlesMapper.articleImageFromDto(response.data.image));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async updateArticleSeo(
        id: string,
        data: IUpdateArticleSeoCredentials
    ): Promise<Result<IArticleEntity>> {
        try {
            const response = await apiClient.api.updateArticleSeo(id, data);
            return ok(ArticlesMapper.articleFromDto(response.data.article));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async updateArticleTags(
        id: string,
        data: IUpdateArticleTagsCredentials
    ): Promise<Result<IArticleActionResponse>> {
        try {
            const response = await apiClient.api.updateArticleTags(id, data);
            return ok({ isSuccess: response.data.isSuccess });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }
}
