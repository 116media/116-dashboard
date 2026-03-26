import type { AxiosError, AxiosResponse } from "axios";
import HttpStatus from "http-status";
import { Api } from "@/shared/infrastructure/api/generated/116.api";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";
import { apiErrors } from "@/shared/infrastructure/constants/api";
import { API_URL, CLIENT_APP } from "@/shared/infrastructure/constants/common";
import { LOGIN_PATH } from "@/shared/infrastructure/constants/paths";
import { deviceIdInterceptor } from "@/shared/infrastructure/interceptors/device-id.interceptor";
import { refreshTokenInterceptor } from "@/shared/infrastructure/interceptors/refresh-token.interceptor";
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
 * Axios error interceptor - handles non-recoverable API errors.
 *
 * @description
 * Handles:
 * - 401 AuthenticationException: Purge Redux, redirect to login
 * - Validation errors: Normalize to first error message
 * - Other errors: Map exception codes to user-friendly titles
 * - Network errors: Return generic network error message
 *
 * Token expiry (AccessTokenExpiryException) is NOT handled here
 * — that is caught by the refresh token interceptor registered
 * before this one.
 */
const errorHandler = async (error: AxiosError<IApiProblemDetails>): Promise<never> => {
    if (error.response) {
        const problemDetails = error.response.data;

        // Redirect on authentication failure (not token expiry)
        if (
            error.response.status === HttpStatus.UNAUTHORIZED &&
            problemDetails.title === "AuthenticationException"
        ) {
            persistor.purge();
            window.location.href = LOGIN_PATH;
            return await Promise.reject(problemDetails);
        }

        // Normalize validation errors to first message
        if (problemDetails.title === apiErrors.validation.code && problemDetails.errors?.length) {
            const normalizedError: IApiProblemDetails = {
                ...problemDetails,
                title: apiErrors.validation.title,
                detail: problemDetails.errors[0].errorMessage
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
        title: "Network Error",
        detail: "Network error occurred. Please check your connection."
    } as IApiProblemDetails);
};

// Request interceptors
apiClient.instance.interceptors.request.use(deviceIdInterceptor);
apiClient.instance.interceptors.response.use(
    responseHandler,
    refreshTokenInterceptor(apiClient.instance)
);
apiClient.instance.interceptors.response.use(responseHandler, errorHandler);
