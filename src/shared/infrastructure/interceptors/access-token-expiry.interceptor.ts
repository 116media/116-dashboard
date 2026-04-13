import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import HttpStatus from "http-status";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";
import { REFRESH_TOKEN_EXPIRED_EVENT } from "@/shared/infrastructure/interceptors/refresh-token-expiry.interceptor";
import container from "@/shared/infrastructure/service.locator.ts";

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: AxiosError | null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) reject(error);
        else resolve();
    });
    failedQueue = [];
};

/**
 * Creates an access token expiry interceptor bound to the given Axios instance.
 *
 * The instance is injected at registration time to avoid a circular
 * dependency between this interceptor and the API client module.
 *
 * Triggers on `401 Unauthorized` responses with
 * `"AccessTokenExpiryException"`, refreshes the token using
 * the DI container's `refreshTokenUseCase`, and retries the original request.
 *
 * @remarks
 *
 * **Flow:**
 * 1. Request fails with 401 (expired access token)
 * 2. Refresh token is requested via bare HTTP client (no interceptors)
 * 3. Original request is retried with the new access token
 *
 * **Token Rotation:**
 * After a successful refresh, the old refresh token becomes invalid.
 *
 * **Failure Handling:**
 * If refresh fails with a `RefreshTokenExpiryException`, a
 * {@link REFRESH_TOKEN_EXPIRED_EVENT} is dispatched so the
 * presentation layer can handle it (modal, purge, redirect).
 *
 * **Note:**
 * This interceptor should run BEFORE the error handler so it gets
 * first chance at 401s.
 */
export const accessTokenExpiryInterceptor = (instance: AxiosInstance) => {
    return async (error: AxiosError): Promise<never> => {
        const originalRequest = error.config as RetryableRequestConfig | undefined;
        if (!originalRequest) return Promise.reject(error);

        const problemDetails = error.response?.data as { title?: string } | undefined;

        const isAccessTokenExpiry =
            error.response?.status === HttpStatus.UNAUTHORIZED &&
            problemDetails?.title === "AccessTokenExpiryException";

        if (!isAccessTokenExpiry || originalRequest._retry) return Promise.reject(error);

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            }).then(() => instance.request(originalRequest));
        }

        isRefreshing = true;
        originalRequest._retry = true;

        try {
            await container.cradle.refreshTokenUseCase.execute();
            processQueue(null);
            return instance.request(originalRequest);
        } catch (refreshError) {
            processQueue(refreshError as AxiosError);
            const axiosError = refreshError as AxiosError<IApiProblemDetails>;

            const isRefreshTokenExpiry =
                axiosError.response?.status === HttpStatus.FORBIDDEN &&
                axiosError.response?.data?.title === "RefreshTokenExpiryException";

            if (isRefreshTokenExpiry) {
                window.dispatchEvent(new CustomEvent(REFRESH_TOKEN_EXPIRED_EVENT));
            }
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    };
};
