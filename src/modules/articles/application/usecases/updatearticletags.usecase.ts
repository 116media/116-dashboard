import type { IArticlesRepositoryPort } from "@/modules/articles/application/repositories/articles.repository.port";
import type { IArticleActionResponse } from "@/modules/articles/domain/entities/IArticleActionResponse";
import type { IUpdateArticleTagsCredentials } from "@/modules/articles/presentation/model/IUpdateArticleTagsCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IUpdateArticleTagsUseCase
 * @extends {IResultUseCase<{ id: string; data: IUpdateArticleTagsCredentials }, IArticleActionResponse>}
 */
interface IUpdateArticleTagsUseCase
    extends IResultUseCase<
        { id: string; data: IUpdateArticleTagsCredentials },
        IArticleActionResponse
    > {}

/**
 * Use case for updating an article's tags.
 *
 * @class UpdateArticleTagsUseCase
 * @implements {IUpdateArticleTagsUseCase}
 *
 * @description
 * Updates the set of tags associated with an article
 * via the articles repository.
 */
export class UpdateArticleTagsUseCase implements IUpdateArticleTagsUseCase {
    private readonly articlesRepository: IArticlesRepositoryPort;
    /**
     * @param {IArticlesRepositoryPort} articlesRepository - Repository for articles operations (injected)
     */
    constructor({ articlesRepository }: { articlesRepository: IArticlesRepositoryPort }) {
        this.articlesRepository = articlesRepository;
    }
    /**
     * Executes the update article tags use case.
     *
     * @param {object} request - The article ID and tag IDs to assign
     * @returns {Promise<Result<IArticleActionResponse>>} `ok(ITagEntity[])` on success, `err(Failure)` on failure
     */
    async execute(request: {
        id: string;
        data: IUpdateArticleTagsCredentials;
    }): Promise<Result<IArticleActionResponse>> {
        return this.articlesRepository.updateArticleTags(request.id, request.data);
    }
}
