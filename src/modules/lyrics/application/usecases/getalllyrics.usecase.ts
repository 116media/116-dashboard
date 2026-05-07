import type { ILyricsRepositoryPort } from "@/modules/lyrics/application/repositories/lyrics.repository.port";
import type { ILyricsEntity } from "@/modules/lyrics/domain/entities/ILyricsEntity";
import type { ILyricsQueryParams } from "@/modules/lyrics/presentation/model/ILyricsQueryParams";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";

/**
 * @interface IGetAllLyricsUseCase
 * @extends {IResultUseCase<ILyricsQueryParams, IPaginatedResult<ILyricsEntity>>}
 */
interface IGetAllLyricsUseCase
    extends IResultUseCase<ILyricsQueryParams, IPaginatedResult<ILyricsEntity>> {}

/**
 * Use case for fetching all lyrics.
 *
 * @class GetAllLyricsUseCase
 * @implements {IGetAllLyricsUseCase}
 *
 * @description
 * Retrieves a paginated list of lyrics with an optional search term
 * via the lyrics repository.
 */
export class GetAllLyricsUseCase implements IGetAllLyricsUseCase {
    private readonly lyricsRepository: ILyricsRepositoryPort;
    /**
     * @param {ILyricsRepositoryPort} lyricsRepository - Repository for lyrics operations (injected)
     */
    constructor({ lyricsRepository }: { lyricsRepository: ILyricsRepositoryPort }) {
        this.lyricsRepository = lyricsRepository;
    }
    /**
     * Executes the get all lyrics use case.
     *
     * @param {ILyricsQueryParams} params - Pagination and search parameters
     * @returns {Promise<Result<IPaginatedResult<ILyricsEntity>>>} `ok(IPaginatedResult<ILyricsEntity>)` on success, `err(Failure)` on failure
     */
    async execute(params: ILyricsQueryParams): Promise<Result<IPaginatedResult<ILyricsEntity>>> {
        return this.lyricsRepository.getAllLyrics(params);
    }
}
