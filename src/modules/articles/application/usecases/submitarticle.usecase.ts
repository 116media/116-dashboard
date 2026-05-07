import type { IArticlesRepositoryPort } from "@/modules/articles/application/repositories/articles.repository.port";
import type { IArticleActionResponse } from "@/modules/articles/domain/entities/IArticleActionResponse";

import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface ISubmitArticleUseCase
 * @extends {IResultUseCase<string, IArticleActionResponse>}
 */
interface ISubmitArticleUseCase extends IResultUseCase<string, IArticleActionResponse> {}

/**
 * Use case for submitting an article for review.
 *
 * @class SubmitArticleUseCase
 * @implements {ISubmitArticleUseCase}
 *
 * @description
 * Submits a draft article for editorial review, transitioning its status
 * via the articles repository.
 */
export class SubmitArticleUseCase implements ISubmitArticleUseCase {
    private readonly articlesRepository: IArticlesRepositoryPort;
    /**
     * @param {IArticlesRepositoryPort} articlesRepository - Repository for articles operations (injected)
     */
    constructor({ articlesRepository }: { articlesRepository: IArticlesRepositoryPort }) {
        this.articlesRepository = articlesRepository;
    }
    /**
     * Executes the submit article use case.
     *
     * @param {string} params - The unique identifier of the article to submit
     * @returns {Promise<Result<IArticleActionResponse>>} `ok(void)` on success, `err(Failure)` on failure
     */
    async execute(params: string): Promise<Result<IArticleActionResponse>> {
        return this.articlesRepository.submitArticle(params);
    }
}
