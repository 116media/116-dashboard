import type { ILookupRepositoryPort } from "@/modules/lookup/application/repositories/lookup.repository.port";
import type { IContentTypeEntity } from "@/modules/lookup/domain/entities/IContentTypeEntity";
import type { IPricingTierEntity } from "@/modules/lookup/domain/entities/IPricingTierEntity";
import type { IPromotionLevelEntity } from "@/modules/lookup/domain/entities/IPromotionLevelEntity";
import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";
import { LookupMapper } from "@/modules/lookup/infrastructure/mappers/lookup.mapper";
import type { Result } from "@/shared/domain/results/result";
import { err, ok } from "@/shared/domain/results/result";
import { apiClient } from "@/shared/infrastructure/api/client";
import { ProblemMapper } from "@/shared/infrastructure/mappers/problem.mapper";

/**
 * Lookup repository implementation using REST API.
 *
 * @class LookupRepositoryImpl
 * @implements {ILookupRepositoryPort}
 *
 * @description
 * Communicates with the backend API for content-type, pricing-tier,
 * promotion-level, and tag operations. Maps DTOs to domain entities
 * and wraps results in `Result<T>` — errors are converted to typed
 * Failure values via ProblemMapper.
 */
export class LookupRepositoryImpl implements ILookupRepositoryPort {
    async getAllContentTypes(search?: string): Promise<Result<IContentTypeEntity[]>> {
        try {
            const params = search ? { params: { search } } : {};
            const response = await apiClient.instance.get("/api/v1/admin/content-types", params);
            return ok(response.data.contentTypes.map(LookupMapper.contentTypeFromDto));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async createContentType(data: { name: string }): Promise<Result<IContentTypeEntity>> {
        try {
            const response = await apiClient.api.createContentType(data);
            return ok(LookupMapper.contentTypeFromDto(response.data.contentType));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async updateContentType(
        id: string,
        data: { name: string }
    ): Promise<Result<IContentTypeEntity>> {
        try {
            const response = await apiClient.api.adminUpdateContentType(id, data);
            return ok(LookupMapper.contentTypeFromDto(response.data.contentType));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async activateContentType(id: string): Promise<Result<IContentTypeEntity>> {
        try {
            const response = await apiClient.api.activateContentType(id);
            return ok(LookupMapper.contentTypeFromDto(response.data.contentType));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async deactivateContentType(id: string): Promise<Result<IContentTypeEntity>> {
        try {
            const response = await apiClient.api.adminDeactivateContentType(id);
            return ok(LookupMapper.contentTypeFromDto(response.data.contentType));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async getAllPricingTiers(search?: string): Promise<Result<IPricingTierEntity[]>> {
        try {
            const params = search ? { params: { search } } : {};
            const response = await apiClient.instance.get("/api/v1/admin/pricing-tiers", params);
            return ok(response.data.pricingTiers.map(LookupMapper.pricingTierFromDto));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async createPricingTier(data: {
        name: string;
        description?: string;
    }): Promise<Result<IPricingTierEntity>> {
        try {
            const response = await apiClient.api.createPricingTier(data);
            return ok(LookupMapper.pricingTierFromDto(response.data.pricingTier));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async updatePricingTier(
        id: string,
        data: { name: string; description?: string }
    ): Promise<Result<IPricingTierEntity>> {
        try {
            const response = await apiClient.api.adminUpdatePricingTier(id, data);
            return ok(LookupMapper.pricingTierFromDto(response.data.pricingTier));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async activatePricingTier(id: string): Promise<Result<IPricingTierEntity>> {
        try {
            const response = await apiClient.api.activatePricingTier(id);
            return ok(LookupMapper.pricingTierFromDto(response.data.pricingTier));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async deactivatePricingTier(id: string): Promise<Result<IPricingTierEntity>> {
        try {
            const response = await apiClient.api.adminDeactivatePricingTier(id);
            return ok(LookupMapper.pricingTierFromDto(response.data.pricingTier));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async getAllPromotionLevels(search?: string): Promise<Result<IPromotionLevelEntity[]>> {
        try {
            const params = search ? { params: { search } } : {};
            const response = await apiClient.instance.get("/api/v1/admin/promotion-levels", params);
            return ok(response.data.promotionLevels.map(LookupMapper.promotionLevelFromDto));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async createPromotionLevel(data: {
        name: string;
        durationDays: number;
        priceUsd: number;
    }): Promise<Result<IPromotionLevelEntity>> {
        try {
            const response = await apiClient.api.adminCreatePromotionLevel(data);
            return ok(LookupMapper.promotionLevelFromDto(response.data.promotionLevel));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async updatePromotionLevel(
        id: string,
        data: { name: string; durationDays: number; priceUsd: number }
    ): Promise<Result<IPromotionLevelEntity>> {
        try {
            const response = await apiClient.api.adminUpdatePromotionLevel(id, data);
            return ok(LookupMapper.promotionLevelFromDto(response.data.promotionLevel));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async activatePromotionLevel(id: string): Promise<Result<IPromotionLevelEntity>> {
        try {
            const response = await apiClient.api.activatePromotionLevel(id);
            return ok(LookupMapper.promotionLevelFromDto(response.data.promotionLevel));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async deactivatePromotionLevel(id: string): Promise<Result<IPromotionLevelEntity>> {
        try {
            const response = await apiClient.api.adminDeactivatePromotionLevel(id);
            return ok(LookupMapper.promotionLevelFromDto(response.data.promotionLevel));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async getAllTags(search?: string): Promise<Result<ITagEntity[]>> {
        try {
            const params = search ? { params: { search } } : {};
            const response = await apiClient.instance.get("/api/v1/admin/tags", params);
            return ok(response.data.tags.map(LookupMapper.tagFromDto));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async createTag(data: { name: string; slug: string }): Promise<Result<ITagEntity>> {
        try {
            const response = await apiClient.api.adminCreateTag(data);
            return ok(LookupMapper.tagFromDto(response.data.tag));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async updateTag(id: string, data: { name: string; slug: string }): Promise<Result<ITagEntity>> {
        try {
            const response = await apiClient.api.adminUpdateTag(id, data);
            return ok(LookupMapper.tagFromDto(response.data.tag));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async deleteTag(id: string): Promise<Result<{ isSuccess: boolean }>> {
        try {
            const response = await apiClient.api.adminDeleteTag(id);
            return ok({ isSuccess: response.data.isSuccess });
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }
}
