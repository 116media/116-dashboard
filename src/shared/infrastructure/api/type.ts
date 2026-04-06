import type { ProblemDetails } from "./generated/116.api";

/**
 * Validation error details from API.
 *
 * @interface IValidationError
 *
 * @property {string} propertyName - Name of the property that failed validation
 * @property {string} errorMessage - Human-readable error message
 * @property {unknown} attemptedValue - The value that was attempted
 * @property {number} severity - Error severity level
 * @property {string} errorCode - Machine-readable error code
 */
interface IValidationError {
    propertyName: string;
    errorMessage: string;
    attemptedValue: unknown;
    severity: number;
    errorCode: string;
}

/**
 * Extended API problem details interface.
 *
 * @interface IApiProblemDetails
 * @extends {ProblemDetails}
 *
 * @description
 * Extends the standard ProblemDetails from generated API with validation errors.
 *
 * Used for consistent error handling across the application.
 *
 * @property {IValidationError[]} errors - Array of validation errors if applicable
 */
export interface IApiProblemDetails extends ProblemDetails {
    errors?: IValidationError[];
}
