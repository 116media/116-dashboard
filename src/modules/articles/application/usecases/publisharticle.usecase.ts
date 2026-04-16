import type { IArticlesRepositoryPort } from "@/modules/articles/application/repositories/articles.repository.port";
import type { IArticleActionResponse } from "@/modules/articles/domain/entities/IArticleActionResponse";

import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IPublishArticleUseCase
 * @extends {IResultUseCase<string, IArticleActionResponse>}
 */
interface IPublishArticleUseCase extends IResultUseCase<string, IArticleActionResponse> {}

/**
 * Use case for publishing an article.
 *
 * @class PublishArticleUseCase
 * @implements {IPublishArticleUseCase}
 *
 * @description
 * Publishes an approved article, making it publicly visible
 * via the articles repository.
 */
export class PublishArticleUseCase implements IPublishArticleUseCase {
    private readonly articlesRepository: IArticlesRepositoryPort;
    /**
     * @param {IArticlesRepositoryPort} articlesRepository - Repository for articles operations (injected)
     */
    constructor({ articlesRepository }: { articlesRepository: IArticlesRepositoryPort }) {
        this.articlesRepository = articlesRepository;
    }
    /**
     * Executes the publish article use case.
     *
     * @param {string} params - The unique identifier of the article to publish
     * @returns {Promise<Result<IArticleActionResponse>>} `ok(void)` on success, `err(Failure)` on failure
     */
    async execute(params: string): Promise<Result<IArticleActionResponse>> {
        return this.articlesRepository.publishArticle(params);
    }
}
