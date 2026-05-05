import type { ILyricsRepositoryPort } from "@/modules/lyrics/application/repositories/lyrics.repository.port";
import type { ILyricsActionResponse } from "@/modules/lyrics/domain/entities/ILyricsActionResponse";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IDeleteLyricsUseCase
 * @extends {IResultUseCase<string, ILyricsActionResponse>}
 */
interface IDeleteLyricsUseCase extends IResultUseCase<string, ILyricsActionResponse> {}

/**
 * Use case for permanently deleting a lyrics record.
 *
 * @class DeleteLyricsUseCase
 * @implements {IDeleteLyricsUseCase}
 *
 * @description
 * Deletes a lyrics record via the lyrics repository.
 */
export class DeleteLyricsUseCase implements IDeleteLyricsUseCase {
    private readonly lyricsRepository: ILyricsRepositoryPort;

    /**
     * @param {ILyricsRepositoryPort} lyricsRepository - Repository for lyrics operations (injected)
     */
    constructor({ lyricsRepository }: { lyricsRepository: ILyricsRepositoryPort }) {
        this.lyricsRepository = lyricsRepository;
    }

    /**
     * Executes the delete lyrics use case.
     *
     * @param {string} id - The lyrics UUID to delete
     * @returns {Promise<Result<ILyricsActionResponse>>} `ok(ILyricsActionResponse)` on success, `err(Failure)` on failure
     */
    async execute(id: string): Promise<Result<ILyricsActionResponse>> {
        return this.lyricsRepository.deleteLyrics(id);
    }
}
