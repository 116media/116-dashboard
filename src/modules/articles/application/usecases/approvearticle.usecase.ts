import type { IArticlesRepositoryPort } from "@/modules/articles/application/repositories/articles.repository.port";
import type { IArticleActionResponse } from "@/modules/articles/domain/entities/IArticleActionResponse";

import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IApproveArticleUseCase
 * @extends {IResultUseCase<string, IArticleActionResponse>}
 */
interface IApproveArticleUseCase extends IResultUseCase<string, IArticleActionResponse> {}

/**
 * Use case for approving an article.
 *
 * @class ApproveArticleUseCase
 * @implements {IApproveArticleUseCase}
 *
 * @description
 * Approves a submitted article, marking it as ready for publication
 * via the articles repository.
 */
export class ApproveArticleUseCase implements IApproveArticleUseCase {
    private readonly articlesRepository: IArticlesRepositoryPort;
    /**
     * @param {IArticlesRepositoryPort} articlesRepository - Repository for articles operations (injected)
     */
    constructor({ articlesRepository }: { articlesRepository: IArticlesRepositoryPort }) {
        this.articlesRepository = articlesRepository;
    }
    /**
     * Executes the approve article use case.
     *
     * @param {string} params - The unique identifier of the article to approve
     * @returns {Promise<Result<IArticleActionResponse>>} `ok(void)` on success, `err(Failure)` on failure
     */
    async execute(params: string): Promise<Result<IArticleActionResponse>> {
        return this.articlesRepository.approveArticle(params);
    }
}
