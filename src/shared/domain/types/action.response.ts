/**
 * Base response entity for API actions that return a success indicator.
 *
 * @interface IActionResponse
 *
 * @description
 * Shared base interface for all module-specific action responses.
 * Module-level response entities should extend this interface
 * rather than re-declaring `isSuccess`.
 *
 * @property {boolean} isSuccess - Whether the operation completed successfully
 */
export interface IActionResponse {
    isSuccess: boolean;
}
