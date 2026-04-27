import type { ILookupRepositoryPort } from "@/modules/lookup/application/repositories/lookup.repository.port";
import type { ITagActionResponse } from "@/modules/lookup/domain/entities/ITagActionResponse";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IDeleteTagUseCase
 * @extends {IResultUseCase<string, ITagActionResponse>}
 */
interface IDeleteTagUseCase extends IResultUseCase<string, ITagActionResponse> {}

/**
 * Use case for permanently deleting a tag.
 *
 * @class DeleteTagUseCase
 * @implements {IDeleteTagUseCase}
 *
 * @description
 * Permanently removes the tag from the database.
 * This action is irreversible.
 */
export class DeleteTagUseCase implements IDeleteTagUseCase {
    private readonly lookupRepository: ILookupRepositoryPort;

    /**
     * @param {ILookupRepositoryPort} lookupRepository - Repository for lookup operations (injected)
     */
    constructor({ lookupRepository }: { lookupRepository: ILookupRepositoryPort }) {
        this.lookupRepository = lookupRepository;
    }

    /**
     * Executes the delete tag use case.
     *
     * @param {string} id - Tag UUID
     * @returns {Promise<Result<ITagActionResponse>>} `ok(ITagActionResponse)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<ITagActionResponse>> {
        return this.lookupRepository.deleteTag(id);
    }
}
