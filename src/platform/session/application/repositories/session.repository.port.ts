import type { IRevokeSessionResponse } from "@/platform/session/domain/entities/IRevokeSessionResponse";
import type { ISession } from "@/platform/session/domain/entities/ISession";
import type { Result } from "@/shared/domain/results/result";

/**
 * Session repository interface for managing authentication sessions.
 *
 * @description
 * The refresh token is sent automatically via HttpOnly cookie.
 * `refreshToken()` stays Promise-based (used by interceptors).
 */
export interface SessionRepositoryPort {
    /**
     * Refreshes the access token using the refresh token stored in an HttpOnly cookie.
     * Used by interceptors — stays Promise-based (no Result wrapper).
     */
    refreshToken(): Promise<void>;

    /**
     * Fetches the list of active sessions for the current user.
     *
     * @returns `ok(ISession[])` on success, `err(Failure)` on failure
     */
    getSessions(): Promise<Result<ISession[]>>;

    /**
     * Revokes a specific session, disconnecting that device immediately.
     *
     * @param sessionId - The ID of the session to revoke
     * @returns `ok(IRevokeSessionResponse)` on success, `err(Failure)` on failure
     */
    revokeSession(sessionId: string): Promise<Result<IRevokeSessionResponse>>;
}
