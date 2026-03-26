/**
 * Generic use case interface for application layer.
 *
 * @interface IUseCase
 * @template TRequest - The input type for the use case
 * @template TResponse - The output type for the use case
 *
 * @description
 * Base interface for all use cases in the application following Clean Architecture principles.
 * Use cases contain application business logic and orchestrate the flow of data.
 */
export interface IUseCase<TRequest = void, TResponse = void> {
    /**
     * Executes the use case with the provided request data.
     *
     * @param {TRequest} request - The input data for the use case
     * @returns {Promise<TResponse>} The result of the use case execution
     * @throws {IApiProblemDetails} When the operation fails
     */
    execute(request: TRequest): Promise<TResponse>;
}
