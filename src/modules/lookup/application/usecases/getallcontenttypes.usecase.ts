import type { ILookupRepositoryPort } from "@/modules/lookup/application/repositories/lookup.repository.port";
import type { IContentTypeEntity } from "@/modules/lookup/domain/entities/IContentTypeEntity";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IGetAllContentTypesUseCase
 * @extends {IResultUseCase<void, IContentTypeEntity[]>}
 */
interface IGetAllContentTypesUseCase
    extends IResultUseCase<string | undefined, IContentTypeEntity[]> {}

/**
 * Use case for fetching all content types.
 *
 * @class GetAllContentTypesUseCase
 * @implements {IGetAllContentTypesUseCase}
 */
export class GetAllContentTypesUseCase implements IGetAllContentTypesUseCase {
    private readonly lookupRepository: ILookupRepositoryPort;

    /**
     * @param {ILookupRepositoryPort} lookupRepository - Repository for lookup operations (injected)
     */
    constructor({ lookupRepository }: { lookupRepository: ILookupRepositoryPort }) {
        this.lookupRepository = lookupRepository;
    }

    /**
     * Executes the get all content types use case.
     *
     * @returns {Promise<Result<IContentTypeEntity[]>>} `ok(IContentTypeEntity[])` on success, `err(Failure)` on failure
     */
    async execute(search?: string): Promise<Result<IContentTypeEntity[]>> {
        return this.lookupRepository.getAllContentTypes(search);
    }
}
