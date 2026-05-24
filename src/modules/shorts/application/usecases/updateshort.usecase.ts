import type { IShortsRepositoryPort } from "@/modules/shorts/application/repositories/shorts.repository.port";
import type { IShortVideoEntity } from "@/modules/shorts/domain/entities/IShortVideoEntity";
import type { IUpdateShortCredentials } from "@/modules/shorts/presentation/model/IUpdateShortCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IUpdateShortUseCase
 * @extends {IResultUseCase<{ id: string; data: IUpdateShortCredentials }, IShortVideoEntity>}
 */
interface IUpdateShortUseCase
    extends IResultUseCase<{ id: string; data: IUpdateShortCredentials }, IShortVideoEntity> {}

/**
 * Use case for updating a short video.
 *
 * @class UpdateShortUseCase
 * @implements {IUpdateShortUseCase}
 *
 * @description
 * Updates a short video's title, linked video, and optionally
 * replaces the video file via the shorts repository.
 */
export class UpdateShortUseCase implements IUpdateShortUseCase {
    private readonly shortsRepository: IShortsRepositoryPort;

    constructor({ shortsRepository }: { shortsRepository: IShortsRepositoryPort }) {
        this.shortsRepository = shortsRepository;
    }

    async execute(params: {
        id: string;
        data: IUpdateShortCredentials;
    }): Promise<Result<IShortVideoEntity>> {
        return this.shortsRepository.updateShort(params.id, params.data);
    }
}
