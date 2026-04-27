import type { ILookupRepositoryPort } from "@/modules/lookup/application/repositories/lookup.repository.port";
import type { ITagEntity } from "@/modules/lookup/domain/entities/ITagEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IGetAllTagsUseCase
 * @extends {IResultUseCase<void, ITagEntity[]>}
 */
interface IGetAllTagsUseCase extends IResultUseCase<string | undefined, ITagEntity[]> {}

/**
 * Use case for fetching all tags.
 *
 * @class GetAllTagsUseCase
 * @implements {IGetAllTagsUseCase}
 */
export class GetAllTagsUseCase implements IGetAllTagsUseCase {
    private readonly lookupRepository: ILookupRepositoryPort;

    /**
     * @param {ILookupRepositoryPort} lookupRepository - Repository for lookup operations (injected)
     */
    constructor({ lookupRepository }: { lookupRepository: ILookupRepositoryPort }) {
        this.lookupRepository = lookupRepository;
    }

    /**
     * Executes the get all tags use case.
     *
     * @returns {Promise<Result<ITagEntity[]>>} `ok(ITagEntity[])` on success, `err(Failure)` on failure
     */
    async execute(search?: string): Promise<Result<ITagEntity[]>> {
        return this.lookupRepository.getAllTags(search);
    }
}
