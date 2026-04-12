import type { IRevokeSessionResponse } from "@/platform/session/domain/entities/IRevokeSessionResponse";
import type { ISession } from "@/platform/session/domain/entities/ISession";
import type {
    AdminRevokeSessionResponse,
    SessionDto
} from "@/shared/infrastructure/api/generated/116.api";

/**
 * Mapper for converting API DTOs to domain entities in the session module.
 *
 * @description
 * Provides pure transformation functions to map data transfer objects (DTOs)
 * from the API layer to clean domain entities. Handles null/undefined values
 * and nested object mappings.
 *
 * @remarks
 * - All methods are stateless pure functions
 * - Marked as const to prevent accidental mutation
 * - Part of the infrastructure layer
 */
export const SessionMapper = {
    /**
     * Maps a SessionDto from the API to an ISession domain entity.
     *
     * @param {SessionDto} dto - Session data from API
     * @returns {ISession} Mapped session entity
     */
    sessionFromDto(dto: SessionDto): ISession {
        return {
            id: dto.id,
            ipAddress: dto.ipAddress,
            userAgent: dto.userAgent,
            browser: dto.browser,
            device: dto.device,
            platform: dto.platform,
            client: dto.client,
            expiresAt: dto.expiresAt,
            isActive: dto.isActive,
            isCurrent: dto.isCurrent,
            createdAt: dto.createdAt
        };
    },

    /**
     * Maps an AdminRevokeSessionResponse to an IRevokeSessionResponse domain entity.
     *
     * @param {AdminRevokeSessionResponse} response - Revoke session response from API
     * @returns {IRevokeSessionResponse} Mapped revoke session response
     */
    revokeSessionResponseFromDto(response: AdminRevokeSessionResponse): IRevokeSessionResponse {
        return {
            isSuccess: response.isSuccess
        };
    }
} as const;
