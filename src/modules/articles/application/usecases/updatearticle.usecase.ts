import type { IArticlesRepositoryPort } from "@/modules/articles/application/repositories/articles.repository.port";
import type { IArticleEntity } from "@/modules/articles/domain/entities/IArticleEntity";
import type { IUpdateArticleCredentials } from "@/modules/articles/presentation/model/IUpdateArticleCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IUpdateArticleUseCase
 * @extends {IResultUseCase<{ id: string; data: IUpdateArticleCredentials }, IArticleEntity>}
 */
interface IUpdateArticleUseCase
    extends IResultUseCase<{ id: string; data: IUpdateArticleCredentials }, IArticleEntity> {}

/**
 * Use case for updating an existing article.
 *
 * @class UpdateArticleUseCase
 * @implements {IUpdateArticleUseCase}
 *
 * @description
 * Updates an existing article's content, metadata, and configuration
 * via the articles repository.
 */
export class UpdateArticleUseCase implements IUpdateArticleUseCase {
    private readonly articlesRepository: IArticlesRepositoryPort;
    /**
     * @param {IArticlesRepositoryPort} articlesRepository - Repository for articles operations (injected)
     */
    constructor({ articlesRepository }: { articlesRepository: IArticlesRepositoryPort }) {
        this.articlesRepository = articlesRepository;
    }
    /**
     * Executes the update article use case.
     *
     * @param {object} request - The article ID and updated data
     * @returns {Promise<Result<IArticleEntity>>} `ok(IArticleEntity)` on success, `err(Failure)` on failure
     */
    async execute(request: { id: string; data: IUpdateArticleCredentials }): Promise<Result<IArticleEntity>> {
        return this.articlesRepository.updateArticle(request.id, request.data);
    }
}
