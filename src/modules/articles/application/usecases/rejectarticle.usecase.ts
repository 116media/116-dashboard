import type { IArticlesRepositoryPort } from "@/modules/articles/application/repositories/articles.repository.port";
import type { IArticleActionResponse } from "@/modules/articles/domain/entities/IArticleActionResponse";
import type { IRejectArticleCredentials } from "@/modules/articles/presentation/model/IRejectArticleCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IRejectArticleUseCase
 * @extends {IResultUseCase<{ id: string; data: IRejectArticleCredentials }, IArticleActionResponse>}
 */
interface IRejectArticleUseCase
    extends IResultUseCase<
        { id: string; data: IRejectArticleCredentials },
        IArticleActionResponse
    > {}

/**
 * Use case for rejecting an article.
 *
 * @class RejectArticleUseCase
 * @implements {IRejectArticleUseCase}
 *
 * @description
 * Rejects a submitted article with a specified reason, returning it
 * to draft status via the articles repository.
 */
export class RejectArticleUseCase implements IRejectArticleUseCase {
    private readonly articlesRepository: IArticlesRepositoryPort;
    /**
     * @param {IArticlesRepositoryPort} articlesRepository - Repository for articles operations (injected)
     */
    constructor({ articlesRepository }: { articlesRepository: IArticlesRepositoryPort }) {
        this.articlesRepository = articlesRepository;
    }
    /**
     * Executes the reject article use case.
     *
     * @param {object} request - The article ID and rejection reason
     * @returns {Promise<Result<IArticleActionResponse>>} `ok(void)` on success, `err(Failure)` on failure
     */
    async execute(request: { id: string; data: IRejectArticleCredentials }): Promise<Result<IArticleActionResponse>> {
        return this.articlesRepository.rejectArticle(request.id, request.data);
    }
}
