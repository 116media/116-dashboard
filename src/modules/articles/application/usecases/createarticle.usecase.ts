import type { IArticlesRepositoryPort } from "@/modules/articles/application/repositories/articles.repository.port";
import type { IArticleEntity } from "@/modules/articles/domain/entities/IArticleEntity";
import type { ICreateArticleCredentials } from "@/modules/articles/presentation/model/ICreateArticleCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface ICreateArticleUseCase
 * @extends {IResultUseCase<ICreateArticleCredentials, IArticleEntity>}
 */
interface ICreateArticleUseCase extends IResultUseCase<ICreateArticleCredentials, IArticleEntity> {}

/**
 * Use case for creating a new article.
 *
 * @class CreateArticleUseCase
 * @implements {ICreateArticleUseCase}
 *
 * @description
 * Creates a new article with the specified category, title, slug,
 * and optional customer/order item associations via the articles repository.
 */
export class CreateArticleUseCase implements ICreateArticleUseCase {
    private readonly articlesRepository: IArticlesRepositoryPort;
    /**
     * @param {IArticlesRepositoryPort} articlesRepository - Repository for articles operations (injected)
     */
    constructor({ articlesRepository }: { articlesRepository: IArticlesRepositoryPort }) {
        this.articlesRepository = articlesRepository;
    }
    /**
     * Executes the create article use case.
     *
     * @param {ICreateArticleCredentials} params - Article creation parameters
     * @returns {Promise<Result<IArticleEntity>>} `ok(IArticleEntity)` on success, `err(Failure)` on failure
     */
    async execute(params: ICreateArticleCredentials): Promise<Result<IArticleEntity>> {
        return this.articlesRepository.createArticle(params);
    }
}
