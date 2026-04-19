import type { ILyricsRepositoryPort } from "@/modules/lyrics/application/repositories/lyrics.repository.port";
import type { ILyricsEntity } from "@/modules/lyrics/domain/entities/ILyricsEntity";
import type { IUpdateLyricsSeoCredentials } from "@/modules/lyrics/presentation/model/IUpdateLyricsSeoCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IUpdateLyricsSeoUseCase
 * @extends {IResultUseCase<{ id: string; data: IUpdateLyricsSeoCredentials }, ILyricsEntity>}
 */
interface IUpdateLyricsSeoUseCase
    extends IResultUseCase<{ id: string; data: IUpdateLyricsSeoCredentials }, ILyricsEntity> {}

/**
 * Use case for updating lyrics SEO metadata.
 *
 * @class UpdateLyricsSeoUseCase
 * @implements {IUpdateLyricsSeoUseCase}
 *
 * @description
 * Updates the SEO meta title, meta description, and meta keywords
 * for a lyrics record via the lyrics repository.
 */
export class UpdateLyricsSeoUseCase implements IUpdateLyricsSeoUseCase {
    private readonly lyricsRepository: ILyricsRepositoryPort;
    /**
     * @param {ILyricsRepositoryPort} lyricsRepository - Repository for lyrics operations (injected)
     */
    constructor({ lyricsRepository }: { lyricsRepository: ILyricsRepositoryPort }) {
        this.lyricsRepository = lyricsRepository;
    }
    /**
     * Executes the update lyrics SEO use case.
     *
     * @param {object} request - The lyrics ID and SEO metadata
     * @returns {Promise<Result<ILyricsEntity>>} `ok(ILyricsEntity)` on success, `err(Failure)` on failure
     */
    async execute(request: {
        id: string;
        data: IUpdateLyricsSeoCredentials;
    }): Promise<Result<ILyricsEntity>> {
        return this.lyricsRepository.updateLyricsSeo(request.id, request.data);
    }
}
