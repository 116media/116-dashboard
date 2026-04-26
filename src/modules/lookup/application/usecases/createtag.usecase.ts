import type { ILookupRepositoryPort } from "@/modules/lookup/application/repositories/lookup.repository.port";
import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface ICreateTagUseCase
 * @extends {IResultUseCase<{ name: string; slug: string }, ITagEntity>}
 */
interface ICreateTagUseCase extends IResultUseCase<{ name: string; slug: string }, ITagEntity> {}

/**
 * Use case for creating a new tag.
 *
 * @class CreateTagUseCase
 * @implements {ICreateTagUseCase}
 */
export class CreateTagUseCase implements ICreateTagUseCase {
    private readonly lookupRepository: ILookupRepositoryPort;

    /**
     * @param {ILookupRepositoryPort} lookupRepository - Repository for lookup operations (injected)
     */
    constructor({ lookupRepository }: { lookupRepository: ILookupRepositoryPort }) {
        this.lookupRepository = lookupRepository;
    }

    /**
     * Executes the create tag use case.
     *
     * @param {{ name: string; slug: string }} data - Tag name
     * @returns {Promise<Result<ITagEntity>>} `ok(ITagEntity)` on success, `err(Failure)` on failure
     */
    async execute(data: { name: string; slug: string }): Promise<Result<ITagEntity>> {
        return this.lookupRepository.createTag(data);
    }
}
