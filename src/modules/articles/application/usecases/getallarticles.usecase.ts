import type { IArticlesRepositoryPort } from "@/modules/articles/application/repositories/articles.repository.port";
import type { IArticleSummaryEntity } from "@/modules/articles/domain/entities/IArticleSummaryEntity";
import type { IArticlesQueryParams } from "@/modules/articles/presentation/model/IArticlesQueryParams";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";

/**
 * @interface IGetAllArticlesUseCase
 * @extends {IResultUseCase<IArticlesQueryParams, IPaginatedResult<IArticleSummaryEntity>>}
 */
interface IGetAllArticlesUseCase
    extends IResultUseCase<IArticlesQueryParams, IPaginatedResult<IArticleSummaryEntity>> {}

/**
 * Use case for fetching all articles.
 *
 * @class GetAllArticlesUseCase
 * @implements {IGetAllArticlesUseCase}
 *
 * @description
 * Retrieves a paginated list of article summaries with optional filters
 * for status, category, and search term via the articles repository.
 */
export class GetAllArticlesUseCase implements IGetAllArticlesUseCase {
    private readonly articlesRepository: IArticlesRepositoryPort;
    /**
     * @param {IArticlesRepositoryPort} articlesRepository - Repository for articles operations (injected)
     */
    constructor({ articlesRepository }: { articlesRepository: IArticlesRepositoryPort }) {
        this.articlesRepository = articlesRepository;
    }
    /**
     * Executes the get all articles use case.
     *
     * @param {IArticlesQueryParams} params - Pagination and filter parameters
     * @returns {Promise<Result<IPaginatedResult<IArticleSummaryEntity>>>} `ok(IPaginatedResult<IArticleSummaryEntity>)` on success, `err(Failure)` on failure
     */
    async execute(
        params: IArticlesQueryParams
    ): Promise<Result<IPaginatedResult<IArticleSummaryEntity>>> {
        return this.articlesRepository.getAllArticles(params);
    }
}
