import type { ILookupRepositoryPort } from "@/modules/lookup/application/repositories/lookup.repository.port";
import type { IContentTypeEntity } from "@/modules/lookup/domain/entities/IContentTypeEntity";
import type { IUpdateContentTypeCredentials } from "@/modules/lookup/presentation/model/IUpdateContentTypeCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IUpdateContentTypeUseCase
 * @extends {IResultUseCase<{ id: string; data: IUpdateContentTypeCredentials }, IContentTypeEntity>}
 */
interface IUpdateContentTypeUseCase
    extends IResultUseCase<
        { id: string; data: IUpdateContentTypeCredentials },
        IContentTypeEntity
    > {}

/**
 * Use case for updating an existing content type.
 *
 * @class UpdateContentTypeUseCase
 * @implements {IUpdateContentTypeUseCase}
 */
export class UpdateContentTypeUseCase implements IUpdateContentTypeUseCase {
    private readonly lookupRepository: ILookupRepositoryPort;

    /**
     * @param {ILookupRepositoryPort} lookupRepository - Repository for lookup operations (injected)
     */
    constructor({ lookupRepository }: { lookupRepository: ILookupRepositoryPort }) {
        this.lookupRepository = lookupRepository;
    }

    /**
     * Executes the update content type use case.
     *
     * @param {{ id: string; data: { name: string } }} input - Content type ID and update payload
     * @returns {Promise<Result<IContentTypeEntity>>} `ok(IContentTypeEntity)` on success, `err(Failure)` on failure
     */
    async execute(input: {
        id: string;
        data: IUpdateContentTypeCredentials;
    }): Promise<Result<IContentTypeEntity>> {
        return this.lookupRepository.updateContentType(input.id, input.data);
    }
}
