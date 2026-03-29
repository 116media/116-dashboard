import type { AxiosError } from "axios";
import HttpStatus from "http-status";

export const REFRESH_TOKEN_EXPIRED_EVENT = "refresh-token-expired";

/**
 * Axios response error interceptor that handles expired refresh tokens.
 *
 * Triggers on `403 Forbidden` responses with `"RefreshTokenExpiryException"`,
 * dispatches a native DOM {@link CustomEvent} so the presentation layer can
 * react (show a modal, redirect, etc.) without any cross-layer coupling.
 *
 * @remarks
 *
 * **Flow:**
 * 1. Any request returns 403 with RefreshTokenExpiryException
 * 2. A {@link CustomEvent} is dispatched on `window`
 * 3. The presentation layer listens for the event and handles the UI
 *
 * **Note:**
 * This interceptor should run AFTER the access token expiry interceptor
 * so that normal token refresh is attempted first.
 */
export const refreshTokenExpiryInterceptor = async (error: AxiosError): Promise<never> => {
    const problemDetails = error.response?.data as { title?: string } | undefined;

    const isRefreshTokenExpiry =
        error.response?.status === HttpStatus.FORBIDDEN &&
        problemDetails?.title === "RefreshTokenExpiryException";

    if (isRefreshTokenExpiry) {
        window.dispatchEvent(new CustomEvent(REFRESH_TOKEN_EXPIRED_EVENT));
    }

    return Promise.reject(error);
};
