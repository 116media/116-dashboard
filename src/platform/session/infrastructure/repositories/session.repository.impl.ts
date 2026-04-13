import axios from "axios";
import type { SessionRepositoryPort } from "@/platform/session/application/repositories/session.repository.port";
import type { IRevokeSessionResponse } from "@/platform/session/domain/entities/IRevokeSessionResponse";
import type { ISession } from "@/platform/session/domain/entities/ISession";
import { SessionMapper } from "@/platform/session/infrastructure/mappers/session.mapper";
import { apiClient } from "@/shared/infrastructure/api/client";
import { API_URL, CLIENT_APP } from "@/shared/infrastructure/constants/common";

/**
 * Bare Axios instance used exclusively for token refresh.
 *
 * No interceptors are attached — this avoids the circular dependency
 * between the refresh token interceptor and the main API client.
 * Mirrors the mobile approach of using a raw HTTP client for refresh.
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
 * @class SessionRepositoryImpl
 * @implements {SessionRepositoryPort}
 *
 * @description
 * Concrete implementation of the session repository port.
 * Handles session-related API calls such as token refresh,
 * fetching sessions, and revoking sessions.
 *
 * @remarks
 * The refresh token is sent automatically via HttpOnly cookie —
 * no request body is needed. The refresh call uses a bare Axios
 * instance to avoid circular dependencies with the main API client.
 */
export class SessionRepositoryImpl implements SessionRepositoryPort {
    async refreshToken(): Promise<void> {
        await refreshTokenClient.post("/api/v1/admin/sessions/refresh-token");
    }

    async getSessions(): Promise<ISession[]> {
        const response = await apiClient.api.adminGetOwnSessions();
        return response.data.sessions.map(SessionMapper.sessionFromDto);
    }

    async revokeSession(sessionId: string): Promise<IRevokeSessionResponse> {
        const response = await apiClient.api.adminRevokeSession(sessionId);
        return SessionMapper.revokeSessionResponseFromDto(response.data);
    }
}
