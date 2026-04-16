import type { IArticlesRepositoryPort } from "@/modules/articles/application/repositories/articles.repository.port";
import type { IArticleEntity } from "@/modules/articles/domain/entities/IArticleEntity";
import type { IUpdateArticleSeoCredentials } from "@/modules/articles/presentation/model/IUpdateArticleSeoCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IUpdateArticleSeoUseCase
 * @extends {IResultUseCase<{ id: string; data: IUpdateArticleSeoCredentials }, IArticleEntity>}
 */
interface IUpdateArticleSeoUseCase
    extends IResultUseCase<{ id: string; data: IUpdateArticleSeoCredentials }, IArticleEntity> {}

/**
 * Use case for updating an article's SEO metadata.
 *
 * @class UpdateArticleSeoUseCase
 * @implements {IUpdateArticleSeoUseCase}
 *
 * @description
 * Updates the SEO meta title and meta description for an article
 * via the articles repository.
 */
export class UpdateArticleSeoUseCase implements IUpdateArticleSeoUseCase {
    private readonly articlesRepository: IArticlesRepositoryPort;
    /**
     * @param {IArticlesRepositoryPort} articlesRepository - Repository for articles operations (injected)
     */
    constructor({ articlesRepository }: { articlesRepository: IArticlesRepositoryPort }) {
        this.articlesRepository = articlesRepository;
    }
    /**
     * Executes the update article SEO use case.
     *
     * @param {object} request - The article ID and SEO metadata
     * @returns {Promise<Result<IArticleEntity>>} `ok(IArticleEntity)` on success, `err(Failure)` on failure
     */
    async execute(request: { id: string; data: IUpdateArticleSeoCredentials }): Promise<Result<IArticleEntity>> {
        return this.articlesRepository.updateArticleSeo(request.id, request.data);
    }
}
