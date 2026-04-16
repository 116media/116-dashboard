import type { IArticlesRepositoryPort } from "@/modules/articles/application/repositories/articles.repository.port";
import type { IArticleActionResponse } from "@/modules/articles/domain/entities/IArticleActionResponse";

import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IArchiveArticleUseCase
 * @extends {IResultUseCase<string, IArticleActionResponse>}
 */
interface IArchiveArticleUseCase extends IResultUseCase<string, IArticleActionResponse> {}

/**
 * Use case for archiving an article.
 *
 * @class ArchiveArticleUseCase
 * @implements {IArchiveArticleUseCase}
 *
 * @description
 * Archives an article, removing it from active listings while preserving
 * its data via the articles repository.
 */
export class ArchiveArticleUseCase implements IArchiveArticleUseCase {
    private readonly articlesRepository: IArticlesRepositoryPort;
    /**
     * @param {IArticlesRepositoryPort} articlesRepository - Repository for articles operations (injected)
     */
    constructor({ articlesRepository }: { articlesRepository: IArticlesRepositoryPort }) {
        this.articlesRepository = articlesRepository;
    }
    /**
     * Executes the archive article use case.
     *
     * @param {string} params - The unique identifier of the article to archive
     * @returns {Promise<Result<IArticleActionResponse>>} `ok(void)` on success, `err(Failure)` on failure
     */
    async execute(params: string): Promise<Result<IArticleActionResponse>> {
        return this.articlesRepository.archiveArticle(params);
    }
}
