import type { ILyricsRepositoryPort } from "@/modules/lyrics/application/repositories/lyrics.repository.port";
import type { ILyricsEntity } from "@/modules/lyrics/domain/entities/ILyricsEntity";
import type { ICreateLyricsCredentials } from "@/modules/lyrics/presentation/model/ICreateLyricsCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface ICreateLyricsUseCase
 * @extends {IResultUseCase<ICreateLyricsCredentials, ILyricsEntity>}
 */
interface ICreateLyricsUseCase extends IResultUseCase<ICreateLyricsCredentials, ILyricsEntity> {}

/**
 * Use case for creating new lyrics.
 *
 * @class CreateLyricsUseCase
 * @implements {ICreateLyricsUseCase}
 *
 * @description
 * Creates a new lyrics record with the specified song title, artist name,
 * lyrics text, language, and optional video/article associations
 * via the lyrics repository.
 */
export class CreateLyricsUseCase implements ICreateLyricsUseCase {
    private readonly lyricsRepository: ILyricsRepositoryPort;
    /**
     * @param {ILyricsRepositoryPort} lyricsRepository - Repository for lyrics operations (injected)
     */
    constructor({ lyricsRepository }: { lyricsRepository: ILyricsRepositoryPort }) {
        this.lyricsRepository = lyricsRepository;
    }
    /**
     * Executes the create lyrics use case.
     *
     * @param {ICreateLyricsCredentials} params - Lyrics creation parameters
     * @returns {Promise<Result<ILyricsEntity>>} `ok(ILyricsEntity)` on success, `err(Failure)` on failure
     */
    async execute(params: ICreateLyricsCredentials): Promise<Result<ILyricsEntity>> {
        return this.lyricsRepository.createLyrics(params);
    }
}
