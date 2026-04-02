import type { ILookupRepositoryPort } from "@/modules/lookup/application/repositories/lookup.repository.port";
import type { IContentTypeEntity } from "@/modules/lookup/domain/entities/IContentTypeEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IDeactivateContentTypeUseCase
 * @extends {IResultUseCase<string, IContentTypeEntity>}
 */
interface IDeactivateContentTypeUseCase extends IResultUseCase<string, IContentTypeEntity> {}

/**
 * Use case for deactivating an active content type.
 *
 * @class DeactivateContentTypeUseCase
 * @implements {IDeactivateContentTypeUseCase}
 */
export class DeactivateContentTypeUseCase implements IDeactivateContentTypeUseCase {
    private readonly lookupRepository: ILookupRepositoryPort;

    /**
     * @param {ILookupRepositoryPort} lookupRepository - Repository for lookup operations (injected)
     */
    constructor({ lookupRepository }: { lookupRepository: ILookupRepositoryPort }) {
        this.lookupRepository = lookupRepository;
    }

    /**
     * Executes the deactivate content type use case.
     *
     * @param {string} id - Content type UUID
     * @returns {Promise<Result<IContentTypeEntity>>} `ok(IContentTypeEntity)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<IContentTypeEntity>> {
        return this.lookupRepository.deactivateContentType(id);
    }
}
