import type { IVideosRepositoryPort } from "@/modules/videos/application/repositories/videos.repository.port";
import type { IVideoActionResponse } from "@/modules/videos/domain/entities/IVideoActionResponse";
import type { IUnpromoteVideoCredentials } from "@/modules/videos/presentation/model/IUnpromoteVideoCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

interface IUnpromoteVideoParams {
    slug: string;
    data: IUnpromoteVideoCredentials;
}

interface IUnpromoteVideoUseCase
    extends IResultUseCase<IUnpromoteVideoParams, IVideoActionResponse> {}

/**
 * Use case for force-unpromoting a promoted video.
 *
 * @class UnpromoteVideoUseCase
 * @implements {IUnpromoteVideoUseCase}
 *
 * @description
 * Removes the active promotion from a video (SuperAdmin only).
 * Requires a justification reason which is stored for audit purposes.
 */
export class UnpromoteVideoUseCase implements IUnpromoteVideoUseCase {
    private readonly videosRepository: IVideosRepositoryPort;

    /**
     * @param {IVideosRepositoryPort} videosRepository - Repository for videos operations (injected)
     */
    constructor({ videosRepository }: { videosRepository: IVideosRepositoryPort }) {
        this.videosRepository = videosRepository;
    }

    /**
     * Executes the unpromote video use case.
     *
     * @param {IUnpromoteVideoParams} params - The video slug and unpromote reason
     * @returns {Promise<Result<IVideoActionResponse>>} `ok(response)` on success, `err(Failure)` on failure
     */
    async execute(params: IUnpromoteVideoParams): Promise<Result<IVideoActionResponse>> {
        return this.videosRepository.unpromoteVideo(params.slug, params.data);
    }
}
