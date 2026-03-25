import { apiErrors } from "@/shared/infrastructure/constants/api";

/**
 * Authentication-related error codes.
 *
 * @description
 * List of API error codes used by the API client interceptor to handle auth failures.
 */
export const authErrors = [apiErrors.authentication.code, apiErrors.authorization.code] as const;
