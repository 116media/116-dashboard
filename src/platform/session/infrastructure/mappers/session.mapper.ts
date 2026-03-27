import type { IRevokeSessionResponse } from "@/platform/session/domain/entities/IRevokeSessionResponse";
import type { ISession } from "@/platform/session/domain/entities/ISession";
import type {
    AdminRevokeSessionResponse,
    SessionDto
} from "@/shared/infrastructure/api/generated/116.api";

export const SessionMapper = {
    sessionFromDto(dto: SessionDto): ISession {
        return {
            id: dto.id,
            ipAddress: dto.ipAddress ?? null,
            userAgent: dto.userAgent ?? null,
            browser: dto.browser,
            device: dto.device,
            platform: dto.platform,
            client: dto.client,
            expiresAt: dto.expiresAt,
            isActive: dto.isActive,
            createdAt: dto.createdAt ?? null
        };
    },

    revokeSessionResponseFromDto(response: AdminRevokeSessionResponse): IRevokeSessionResponse {
        return {
            isSuccess: response.isSuccess
        };
    }
} as const;
