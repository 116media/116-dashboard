import type { ILookupRepositoryPort } from "@/modules/lookup/application/repositories/lookup.repository.port";
import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";
import type { IUpdateTagCredentials } from "@/modules/lookup/presentation/model/IUpdateTagCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IUpdateTagUseCase
 * @extends {IResultUseCase<{ id: string; data: IUpdateTagCredentials }, ITagEntity>}
 */
interface IUpdateTagUseCase
    extends IResultUseCase<{ id: string; data: IUpdateTagCredentials }, ITagEntity> {}

/**
 * Use case for updating an existing tag.
 *
 * @class UpdateTagUseCase
 * @implements {IUpdateTagUseCase}
 */
export class UpdateTagUseCase implements IUpdateTagUseCase {
    private readonly lookupRepository: ILookupRepositoryPort;

    /**
     * @param {ILookupRepositoryPort} lookupRepository - Repository for lookup operations (injected)
     */
    constructor({ lookupRepository }: { lookupRepository: ILookupRepositoryPort }) {
        this.lookupRepository = lookupRepository;
    }

    /**
     * Executes the update tag use case.
     *
     * @param {{ id: string; data: { name: string; slug: string } }} input - Tag ID and update payload
     * @returns {Promise<Result<ITagEntity>>} `ok(ITagEntity)` on success, `err(Failure)` on failure
     */
    async execute(input: { id: string; data: IUpdateTagCredentials }): Promise<Result<ITagEntity>> {
        return this.lookupRepository.updateTag(input.id, input.data);
    }
}
