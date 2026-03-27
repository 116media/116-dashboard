/**
 * Revoke session response entity.
 *
 * @interface IRevokeSessionResponse
 *
 * @description
 * Domain entity representing the response from a revoke session request.
 *
 * @property {boolean} isSuccess - Whether the session revocation was successful
 */
export interface IRevokeSessionResponse {
    isSuccess: boolean;
}
