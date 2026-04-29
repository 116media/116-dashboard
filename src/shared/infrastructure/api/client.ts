import type { AxiosError, AxiosResponse } from "axios";
import HttpStatus from "http-status";
import { Api } from "@/shared/infrastructure/api/generated/116.api";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";
import { apiErrors } from "@/shared/infrastructure/constants/api";
import { API_URL, CLIENT_APP } from "@/shared/infrastructure/constants/common";
import { accessTokenExpiryInterceptor } from "@/shared/infrastructure/interceptors/access-token-expiry.interceptor";
import { deviceIdInterceptor } from "@/shared/infrastructure/interceptors/device-id.interceptor";
import { refreshTokenExpiryInterceptor } from "@/shared/infrastructure/interceptors/refresh-token-expiry.interceptor";
import { LOGIN_PATH } from "@/shared/presentation/constants/paths";
import { persistor } from "@/shared/presentation/store/store";

/**
 * Configured API client instance.
 *
 * @description
 * Auto-generated API client from swagger with:
 * - French language header
 * - Client-App identification header
 * - HttpOnly cookie-based authentication (withCredentials)
 * - Response/error interceptors
 */
export const apiClient = new Api({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Accept-Language": "fr",
        "Client-App": CLIENT_APP
    }
});

/**
 * Axios response handler - passes through successful responses.
 */
const responseHandler = (response: AxiosResponse): AxiosResponse => response;

/**
 * Axios error interceptor — handles non-recoverable API errors.
 *
 * @description
 * Handles the following cases in order:
 * - 403 AccountNotVerifiedException: Purge Redux state, redirect to login
 * - 423 AccountInactiveException: Purge Redux state, redirect to login
 * - 400 ValidationException: Normalize title, set detail to first error message, preserve errors array
 * - 429 responses: Parse Retry-After header, attach as retryAfter
 * - Other API errors: Map exception codes to user-friendly French titles
 * - Network errors: Return structured error with status 0
 *
 * Token expiry (AccessTokenExpiryException / RefreshTokenExpiryException)
 * is NOT handled here — those are caught by dedicated interceptors
 * registered before this one.
 */
const errorHandler = async (error: AxiosError<IApiProblemDetails>): Promise<never> => {
    if (error.response) {
        const problemDetails = error.response.data;

        // Redirect on unverified account
        if (
            error.response.status === HttpStatus.FORBIDDEN &&
            problemDetails.title === apiErrors.accountNotVerified.code
        ) {
            await persistor.purge();
            window.location.replace(LOGIN_PATH);
            const normalizedError: IApiProblemDetails = {
                ...problemDetails,
                title: apiErrors.accountNotVerified.title
            };
            return await Promise.reject(normalizedError);
        }

        // Redirect on inactive/locked account
        if (
            error.response.status === HttpStatus.LOCKED &&
            problemDetails.title === apiErrors.accountInactive.code
        ) {
            await persistor.purge();
            window.location.replace(LOGIN_PATH);
            const normalizedError: IApiProblemDetails = {
                ...problemDetails,
                title: apiErrors.accountInactive.title
            };
            return await Promise.reject(normalizedError);
        }

        // Normalize validation errors to first message (errors array preserved via spread)
        if (problemDetails.title === apiErrors.validation.code && problemDetails.errors?.length) {
            const normalizedError: IApiProblemDetails = {
                ...problemDetails,
                title: apiErrors.validation.title,
                detail: problemDetails.errors[0].errorMessage
            };
            return await Promise.reject(normalizedError);
        }

        // Parse Retry-After header for rate-limited responses
        if (error.response.status === HttpStatus.TOO_MANY_REQUESTS) {
            const retryAfterHeader = error.response.headers?.["retry-after"];
            const retryAfter = retryAfterHeader ? Number.parseInt(retryAfterHeader, 10) : undefined;
            const errorType = Object.values(apiErrors).find((e) => e.code === problemDetails.title);
            const normalizedError: IApiProblemDetails = {
                ...problemDetails,
                title: errorType?.title || problemDetails.title,
                retryAfter: Number.isNaN(retryAfter) ? undefined : retryAfter
            };
            return await Promise.reject(normalizedError);
        }

        // Map exception names to user-friendly titles
        const errorType = Object.values(apiErrors).find((e) => e.code === problemDetails.title);
        const normalizedError: IApiProblemDetails = {
            ...problemDetails,
            title: errorType?.title || problemDetails.title
        };

        return await Promise.reject(normalizedError);
    }

    return await Promise.reject({
        type: null,
        title: "Erreur réseau",
        status: 0,
        detail: "Une erreur réseau est survenue. Veuillez vérifier votre connexion.",
        instance: error.config?.url
    } as IApiProblemDetails);
};

// Request interceptors
apiClient.instance.interceptors.request.use(deviceIdInterceptor);

// Runs first: silently refreshes expired access tokens and retries the original request
apiClient.instance.interceptors.response.use(
    responseHandler,
    accessTokenExpiryInterceptor(apiClient.instance)
);
// Runs second: detects expired refresh tokens and signals the UI via a DOM event
apiClient.instance.interceptors.response.use(responseHandler, refreshTokenExpiryInterceptor);
apiClient.instance.interceptors.response.use(responseHandler, errorHandler);
