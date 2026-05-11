import type { ILyricsRepositoryPort } from "@/modules/lyrics/application/repositories/lyrics.repository.port";
import type { ILyricsEntity } from "@/modules/lyrics/domain/entities/ILyricsEntity";
import type { IUpdateLyricsCredentials } from "@/modules/lyrics/presentation/model/IUpdateLyricsCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IUpdateLyricsUseCase
 * @extends {IResultUseCase<{ id: string; data: IUpdateLyricsCredentials }, ILyricsEntity>}
 */
interface IUpdateLyricsUseCase
    extends IResultUseCase<{ id: string; data: IUpdateLyricsCredentials }, ILyricsEntity> {}

/**
 * Use case for updating an existing lyrics record.
 *
 * @class UpdateLyricsUseCase
 * @implements {IUpdateLyricsUseCase}
 *
 * @description
 * Updates the lyrics text content for an existing lyrics record
 * via the lyrics repository.
 */
export class UpdateLyricsUseCase implements IUpdateLyricsUseCase {
    private readonly lyricsRepository: ILyricsRepositoryPort;
    /**
     * @param {ILyricsRepositoryPort} lyricsRepository - Repository for lyrics operations (injected)
     */
    constructor({ lyricsRepository }: { lyricsRepository: ILyricsRepositoryPort }) {
        this.lyricsRepository = lyricsRepository;
    }
    /**
     * Executes the update lyrics use case.
     *
     * @param {object} request - The lyrics ID and updated data
     * @returns {Promise<Result<ILyricsEntity>>} `ok(ILyricsEntity)` on success, `err(Failure)` on failure
     */
    async execute(request: {
        id: string;
        data: IUpdateLyricsCredentials;
    }): Promise<Result<ILyricsEntity>> {
        return this.lyricsRepository.updateLyrics(request.id, request.data);
    }
}
