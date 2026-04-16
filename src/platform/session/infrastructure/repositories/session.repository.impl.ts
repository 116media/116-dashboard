import axios from "axios";
import type { SessionRepositoryPort } from "@/platform/session/application/repositories/session.repository.port";
import type { IRevokeSessionResponse } from "@/platform/session/domain/entities/IRevokeSessionResponse";
import type { ISession } from "@/platform/session/domain/entities/ISession";
import { SessionMapper } from "@/platform/session/infrastructure/mappers/session.mapper";
import type { Result } from "@/shared/domain/results/result";
import { err, ok } from "@/shared/domain/results/result";
import { apiClient } from "@/shared/infrastructure/api/client";
import { API_URL, CLIENT_APP } from "@/shared/infrastructure/constants/common";
import { ProblemMapper } from "@/shared/infrastructure/mappers/problem.mapper";

/**
 * Bare Axios instance used exclusively for token refresh.
 *
 * No interceptors are attached — this avoids the circular dependency
 * between the refresh token interceptor and the main API client.
 */
const refreshTokenClient = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Accept-Language": "fr",
        "Client-App": CLIENT_APP
    }
});

/**
 * Session repository implementation using REST API.
 *
 * @description
 * `refreshToken()` stays Promise-based (used by interceptors).
 * All other methods return `Result<T>`.
 */
export class SessionRepositoryImpl implements SessionRepositoryPort {
    async refreshToken(): Promise<void> {
        await refreshTokenClient.post("/api/v1/admin/sessions/refresh-token");
    }

    async getSessions(): Promise<Result<ISession[]>> {
        try {
            const response = await apiClient.api.adminGetOwnSessions();
            return ok(response.data.sessions.map(SessionMapper.sessionFromDto));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }

    async revokeSession(sessionId: string): Promise<Result<IRevokeSessionResponse>> {
        try {
            const response = await apiClient.api.adminRevokeSession(sessionId);
            return ok(SessionMapper.revokeSessionResponseFromDto(response.data));
        } catch (error) {
            return err(ProblemMapper.toFailure(error));
        }
    }
}
