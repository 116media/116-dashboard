import type { IArticlesRepositoryPort } from "@/modules/articles/application/repositories/articles.repository.port";
import type { IArticleActionResponse } from "@/modules/articles/domain/entities/IArticleActionResponse";
import type { IUnpromoteArticleCredentials } from "@/modules/articles/presentation/model/IUnpromoteArticleCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

interface IUnpromoteArticleParams {
    slug: string;
    data: IUnpromoteArticleCredentials;
}

interface IUnpromoteArticleUseCase
    extends IResultUseCase<IUnpromoteArticleParams, IArticleActionResponse> {}

/**
 * Use case for force-unpromoting a promoted article.
 *
 * @class UnpromoteArticleUseCase
 * @implements {IUnpromoteArticleUseCase}
 *
 * @description
 * Removes the active promotion from an article (SuperAdmin only).
 * Requires a justification reason which is stored for audit purposes.
 */
export class UnpromoteArticleUseCase implements IUnpromoteArticleUseCase {
    private readonly articlesRepository: IArticlesRepositoryPort;

    /**
     * @param {IArticlesRepositoryPort} articlesRepository - Repository for articles operations (injected)
     */
    constructor({ articlesRepository }: { articlesRepository: IArticlesRepositoryPort }) {
        this.articlesRepository = articlesRepository;
    }

    /**
     * Executes the unpromote article use case.
     *
     * @param {IUnpromoteArticleParams} params - The article slug and unpromote reason
     * @returns {Promise<Result<IArticleActionResponse>>} `ok(response)` on success, `err(Failure)` on failure
     */
    async execute(params: IUnpromoteArticleParams): Promise<Result<IArticleActionResponse>> {
        return this.articlesRepository.unpromoteArticle(params.slug, params.data);
    }
}
