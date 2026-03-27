import type { IRevokeSessionResponse } from "@/platform/session/domain/entities/IRevokeSessionResponse";
import type { ISession } from "@/platform/session/domain/entities/ISession";

/**
 * Session repository interface for managing authentication sessions.
 *
 * @interface SessionRepositoryPort
 *
 * @description
 * Defines the contract for session-related operations.
 * The refresh token is sent automatically via HttpOnly cookie.
 */
export interface SessionRepositoryPort {
    refreshToken(): Promise<void>;
    getSessions(): Promise<ISession[]>;
    revokeSession(sessionId: string): Promise<IRevokeSessionResponse>;
}
