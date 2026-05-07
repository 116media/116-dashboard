import type { IArticlesRepositoryPort } from "@/modules/articles/application/repositories/articles.repository.port";
import type { IArticleImageEntity } from "@/modules/articles/domain/entities/IArticleImageEntity";
import type { IUploadArticleImageCredentials } from "@/modules/articles/presentation/model/IUploadArticleImageCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IUploadArticleImageUseCase
 * @extends {IResultUseCase<{ id: string; data: IUploadArticleImageCredentials }, IArticleImageEntity>}
 */
interface IUploadArticleImageUseCase
    extends IResultUseCase<
        { id: string; data: IUploadArticleImageCredentials },
        IArticleImageEntity
    > {}

/**
 * Use case for uploading an image to an article.
 *
 * @class UploadArticleImageUseCase
 * @implements {IUploadArticleImageUseCase}
 *
 * @description
 * Uploads an image file and associates it with an article as the specified
 * image type via the articles repository.
 */
export class UploadArticleImageUseCase implements IUploadArticleImageUseCase {
    private readonly articlesRepository: IArticlesRepositoryPort;
    /**
     * @param {IArticlesRepositoryPort} articlesRepository - Repository for articles operations (injected)
     */
    constructor({ articlesRepository }: { articlesRepository: IArticlesRepositoryPort }) {
        this.articlesRepository = articlesRepository;
    }
    /**
     * Executes the upload article image use case.
     *
     * @param {object} request - The article ID and image data
     * @returns {Promise<Result<IArticleImageEntity>>} `ok(IArticleImageEntity)` on success, `err(Failure)` on failure
     */
    async execute(request: { id: string; data: IUploadArticleImageCredentials }): Promise<Result<IArticleImageEntity>> {
        return this.articlesRepository.uploadArticleImage(request.id, request.data);
    }
}
