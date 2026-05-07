import type { IArticlesRepositoryPort } from "@/modules/articles/application/repositories/articles.repository.port";
import type { IArticleEntity } from "@/modules/articles/domain/entities/IArticleEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IGetArticleByIdUseCase
 * @extends {IResultUseCase<string, IArticleEntity>}
 */
interface IGetArticleByIdUseCase extends IResultUseCase<string, IArticleEntity> {}

/**
 * Use case for fetching an article by ID.
 *
 * @class GetArticleByIdUseCase
 * @implements {IGetArticleByIdUseCase}
 *
 * @description
 * Retrieves a single article by its unique identifier
 * via the articles repository.
 */
export class GetArticleByIdUseCase implements IGetArticleByIdUseCase {
    private readonly articlesRepository: IArticlesRepositoryPort;
    /**
     * @param {IArticlesRepositoryPort} articlesRepository - Repository for articles operations (injected)
     */
    constructor({ articlesRepository }: { articlesRepository: IArticlesRepositoryPort }) {
        this.articlesRepository = articlesRepository;
    }
    /**
     * Executes the get article by ID use case.
     *
     * @param {string} params - The unique identifier of the article
     * @returns {Promise<Result<IArticleEntity>>} `ok(IArticleEntity)` on success, `err(Failure)` on failure
     */
    async execute(params: string): Promise<Result<IArticleEntity>> {
        return this.articlesRepository.getArticleById(params);
    }
}
