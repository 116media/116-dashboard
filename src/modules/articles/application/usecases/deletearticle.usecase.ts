import type { IArticlesRepositoryPort } from "@/modules/articles/application/repositories/articles.repository.port";
import type { IArticleActionResponse } from "@/modules/articles/domain/entities/IArticleActionResponse";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IDeleteArticleUseCase
 * @extends {IResultUseCase<string, IArticleActionResponse>}
 */
interface IDeleteArticleUseCase extends IResultUseCase<string, IArticleActionResponse> {}

/**
 * Use case for deleting an article.
 *
 * @class DeleteArticleUseCase
 * @implements {IDeleteArticleUseCase}
 *
 * @description
 * Permanently deletes an article by its unique identifier
 * via the articles repository.
 */
export class DeleteArticleUseCase implements IDeleteArticleUseCase {
    private readonly articlesRepository: IArticlesRepositoryPort;
    /**
     * @param {IArticlesRepositoryPort} articlesRepository - Repository for articles operations (injected)
     */
    constructor({ articlesRepository }: { articlesRepository: IArticlesRepositoryPort }) {
        this.articlesRepository = articlesRepository;
    }
    /**
     * Executes the delete article use case.
     *
     * @param {string} params - The unique identifier of the article to delete
     * @returns {Promise<Result<IArticleActionResponse>>} `ok(void)` on success, `err(Failure)` on failure
     */
    async execute(params: string): Promise<Result<IArticleActionResponse>> {
        return this.articlesRepository.deleteArticle(params);
    }
}
