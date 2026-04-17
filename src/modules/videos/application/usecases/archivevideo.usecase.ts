import type { IVideosRepositoryPort } from "@/modules/videos/application/repositories/videos.repository.port";
import type { IVideoActionResponse } from "@/modules/videos/domain/entities/IVideoActionResponse";

import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IArchiveVideoUseCase
 * @extends {IResultUseCase<string, IVideoActionResponse>}
 */
interface IArchiveVideoUseCase extends IResultUseCase<string, IVideoActionResponse> {}

/**
 * Use case for archiving a video.
 *
 * @class ArchiveVideoUseCase
 * @implements {IArchiveVideoUseCase}
 *
 * @description
 * Archives a video, removing it from active listings while preserving
 * its data via the videos repository.
 */
export class ArchiveVideoUseCase implements IArchiveVideoUseCase {
    private readonly videosRepository: IVideosRepositoryPort;
    /**
     * @param {IVideosRepositoryPort} videosRepository - Repository for videos operations (injected)
     */
    constructor({ videosRepository }: { videosRepository: IVideosRepositoryPort }) {
        this.videosRepository = videosRepository;
    }
    /**
     * Executes the archive video use case.
     *
     * @param {string} params - The unique identifier of the video to archive
     * @returns {Promise<Result<IVideoActionResponse>>} `ok(void)` on success, `err(Failure)` on failure
     */
    async execute(params: string): Promise<Result<IVideoActionResponse>> {
        return this.videosRepository.archiveVideo(params);
    }
}
