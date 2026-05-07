import type { ILookupRepositoryPort } from "@/modules/lookup/application/repositories/lookup.repository.port";
import type { IContentTypeEntity } from "@/modules/lookup/domain/entities/IContentTypeEntity";
import type { ICreateContentTypeCredentials } from "@/modules/lookup/presentation/model/ICreateContentTypeCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface ICreateContentTypeUseCase
 * @extends {IResultUseCase<ICreateContentTypeCredentials, IContentTypeEntity>}
 */
interface ICreateContentTypeUseCase
    extends IResultUseCase<ICreateContentTypeCredentials, IContentTypeEntity> {}

/**
 * Use case for creating a new content type.
 *
 * @class CreateContentTypeUseCase
 * @implements {ICreateContentTypeUseCase}
 */
export class CreateContentTypeUseCase implements ICreateContentTypeUseCase {
    private readonly lookupRepository: ILookupRepositoryPort;

    /**
     * @param {ILookupRepositoryPort} lookupRepository - Repository for lookup operations (injected)
     */
    constructor({ lookupRepository }: { lookupRepository: ILookupRepositoryPort }) {
        this.lookupRepository = lookupRepository;
    }

    /**
     * Executes the create content type use case.
     *
     * @param {{ name: string }} data - Content type name
     * @returns {Promise<Result<IContentTypeEntity>>} `ok(IContentTypeEntity)` on success, `err(Failure)` on failure
     */
    async execute(data: ICreateContentTypeCredentials): Promise<Result<IContentTypeEntity>> {
        return this.lookupRepository.createContentType(data);
    }
}
