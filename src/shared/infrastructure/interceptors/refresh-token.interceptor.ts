import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import HttpStatus from "http-status";
import { RefreshTokenUseCase } from "@/platform/session/application/usecases/refresh-token.usecase";
import { SessionRepositoryImpl } from "@/platform/session/infrastructure/repositories/session.repository.impl";
import { LOGIN_PATH } from "@/shared/infrastructure/constants/paths";
import { persistor } from "@/shared/presentation/store/store";

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
        if (error) {
            reject(error);
        } else {
            resolve();
        }
    });
    failedQueue = [];
};

/**
 * Creates a refresh token error interceptor bound to the given Axios instance.
 *
 * The instance is injected at registration time to avoid a circular
 * dependency between this interceptor and the API client module.
 *
 * Triggers on `401 Unauthorized` responses with
 * `"AccessTokenExpiryException"`, refreshes the token using
 * {@link SessionRepositoryImpl}, and retries the original request.
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
 * If refresh fails, is invalid/expired, or a network error occurs,
 * Redux is purged and the user is redirected to login.
 *
 * **Note:**
 * This interceptor should run BEFORE the error handler so it gets
 * first chance at 401s.
 */
export const refreshTokenInterceptor = (instance: AxiosInstance) => {
    return async (error: AxiosError): Promise<never> => {
        const originalRequest = error.config as RetryableRequestConfig | undefined;
        if (!originalRequest) return Promise.reject(error);

        const problemDetails = error.response?.data as { title?: string } | undefined;

        const isTokenExpiry =
            error.response?.status === HttpStatus.UNAUTHORIZED &&
            problemDetails?.title === "AccessTokenExpiryException";

        if (!isTokenExpiry || originalRequest._retry) return Promise.reject(error);

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            }).then(() => instance.request(originalRequest));
        }

        isRefreshing = true;
        originalRequest._retry = true;

        try {
            const useCase = new RefreshTokenUseCase(new SessionRepositoryImpl());
            await useCase.execute();
            processQueue(null);
            return instance.request(originalRequest);
        } catch (refreshError) {
            processQueue(refreshError as AxiosError);
            persistor.purge();
            window.location.href = LOGIN_PATH;
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    };
};
