import type { ICatalogRepositoryPort } from "@/modules/catalog/application/repositories/catalog.repository.port";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { IUploadCategoryPosterCredentials } from "@/modules/catalog/presentation/model/IUploadCategoryPosterCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IUploadCategoryPosterUseCase
 * @extends {IResultUseCase<{ id: string; data: IUploadCategoryPosterCredentials }, ICategoryEntity>}
 */
interface IUploadCategoryPosterUseCase
    extends IResultUseCase<
        { id: string; data: IUploadCategoryPosterCredentials },
        ICategoryEntity
    > {}

/**
 * Use case for uploading (or replacing) a category poster image.
 *
 * @class UploadCategoryPosterUseCase
 * @implements {IUploadCategoryPosterUseCase}
 *
 * @description
 * Uploads a poster image for a category via the dedicated poster endpoint and
 * returns the updated category with the resolved poster URL.
 */
export class UploadCategoryPosterUseCase implements IUploadCategoryPosterUseCase {
    private readonly catalogRepository: ICatalogRepositoryPort;
    /**
     * @param {ICatalogRepositoryPort} catalogRepository - Repository for catalog operations (injected)
     */
    constructor({ catalogRepository }: { catalogRepository: ICatalogRepositoryPort }) {
        this.catalogRepository = catalogRepository;
    }
    /**
     * Executes the upload category poster use case.
     *
     * @param {object} request - The category ID and the poster file payload
     * @returns {Promise<Result<ICategoryEntity>>} `ok(ICategoryEntity)` on success, `err(Failure)` on failure
     */
    async execute(request: {
        id: string;
        data: IUploadCategoryPosterCredentials;
    }): Promise<Result<ICategoryEntity>> {
        return this.catalogRepository.uploadCategoryPoster(request.id, request.data);
    }
}
