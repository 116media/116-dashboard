import type { AxiosError, AxiosResponse } from "axios";
import { persistor } from "@/core/presentation/store/store";
import { authErrors } from "@/modules/auth/infrastructure/constants/api";
import { AuthStorageService } from "@/modules/auth/infrastructure/storage/authstorage.service";
import { Api } from "@/shared/api/generated/116.api";
import { deviceIdInterceptor } from "@/shared/api/interceptors/device-id.interceptor";
import type { IApiProblemDetails } from "@/shared/api/type";
import { apiErrors } from "@/shared/lib/constants/api";
import { API_URL, isServer } from "@/shared/lib/constants/common";
import { LOGIN_PATH } from "@/shared/lib/constants/paths";

const { clearAuth, getToken, getUser } = AuthStorageService;

/**
 * Configured API client instance.
 *
 * @description
 * Auto-generated API client from swagger with:
 * - French language header
 * - JWT bearer token authentication
 * - Response/error interceptors
 */
export const apiClient = new Api({
    baseURL: API_URL,
    headers: {
        "Accept-Language": "fr"
    },
    securityWorker: () => {
        const token = getToken();
        return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    }
});

/**
 * Axios response interceptor - passes through successful responses.
 */
const responseHandler = (response: AxiosResponse): AxiosResponse => response;

/**
 * Axios error interceptor - handles API errors and auth failures.
 *
 * @param {AxiosError<IApiProblemDetails>} error - Axios error object
 * @returns {Promise<never>} Rejected promise with normalized error
 *
 * @description
 * Handles:
 * - Auth errors: Clears auth state and redirects to login
 * - Validation errors: Normalizes to show first error message
 * - Other errors: Maps exception codes to user-friendly titles
 * - Network errors: Returns generic network error message
 */
const errorHandler = async (error: AxiosError<IApiProblemDetails>): Promise<never> => {
    if (error.response) {
        const problemDetails = error.response.data;

        // logout and redirect to login on authentication/authorization errors
        if (
            problemDetails.title &&
            authErrors.includes(problemDetails.title as (typeof authErrors)[number])
        ) {
            const hasToken = getToken();
            const hasUserData = getUser();

            // Only perform logout and redirect for previously authenticated users.
            // This prevents unnecessary redirects during login attempts where auth errors are expected.
            if (hasToken || hasUserData) {
                persistor.purge();
                !isServer && clearAuth();
                window.location.href = LOGIN_PATH;
            }
        }

        if (problemDetails.title === apiErrors.validation.code && problemDetails.errors?.length) {
            const normalizedError: IApiProblemDetails = {
                ...problemDetails,
                title: apiErrors.validation.title,
                detail: problemDetails.errors[0].errorMessage
            };
            return await Promise.reject(normalizedError);
        }

        // Convert exception names to user-friendly titles
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

apiClient.instance.interceptors.request.use(deviceIdInterceptor);

apiClient.instance.interceptors.response.use(responseHandler, errorHandler);
