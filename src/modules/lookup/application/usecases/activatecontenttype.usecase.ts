import type { ILookupRepositoryPort } from "@/modules/lookup/application/repositories/lookup.repository.port";
import type { IContentTypeEntity } from "@/modules/lookup/domain/entities/IContentTypeEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IActivateContentTypeUseCase
 * @extends {IResultUseCase<string, IContentTypeEntity>}
 */
interface IActivateContentTypeUseCase extends IResultUseCase<string, IContentTypeEntity> {}

/**
 * Use case for activating an inactive content type.
 *
 * @class ActivateContentTypeUseCase
 * @implements {IActivateContentTypeUseCase}
 */
export class ActivateContentTypeUseCase implements IActivateContentTypeUseCase {
    private readonly lookupRepository: ILookupRepositoryPort;

    /**
     * @param {ILookupRepositoryPort} lookupRepository - Repository for lookup operations (injected)
     */
    constructor({ lookupRepository }: { lookupRepository: ILookupRepositoryPort }) {
        this.lookupRepository = lookupRepository;
    }

    /**
     * Executes the activate content type use case.
     *
     * @param {string} id - Content type UUID
     * @returns {Promise<Result<IContentTypeEntity>>} `ok(IContentTypeEntity)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<IContentTypeEntity>> {
        return this.lookupRepository.activateContentType(id);
    }
}
