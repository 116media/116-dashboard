import type { IVideosRepositoryPort } from "@/modules/videos/application/repositories/videos.repository.port";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import type { IScheduleShootCredentials } from "@/modules/videos/presentation/model/IScheduleShootCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IScheduleShootUseCase
 * @extends {IResultUseCase<{ id: string; data: IScheduleShootCredentials }, IVideoEntity>}
 */
interface IScheduleShootUseCase
    extends IResultUseCase<{ id: string; data: IScheduleShootCredentials }, IVideoEntity> {}

/**
 * Use case for scheduling a video shoot.
 *
 * @class ScheduleShootUseCase
 * @implements {IScheduleShootUseCase}
 *
 * @description
 * Schedules a shooting date for a video, setting the planned
 * recording time via the videos repository.
 */
export class ScheduleShootUseCase implements IScheduleShootUseCase {
    private readonly videosRepository: IVideosRepositoryPort;
    /**
     * @param {IVideosRepositoryPort} videosRepository - Repository for videos operations (injected)
     */
    constructor({ videosRepository }: { videosRepository: IVideosRepositoryPort }) {
        this.videosRepository = videosRepository;
    }
    /**
     * Executes the schedule shoot use case.
     *
     * @param {object} request - The video ID and scheduled shooting timestamp
     * @returns {Promise<Result<IVideoEntity>>} `ok(IVideoEntity)` on success, `err(Failure)` on failure
     */
    async execute(request: { id: string; data: IScheduleShootCredentials }): Promise<Result<IVideoEntity>> {
        return this.videosRepository.scheduleShoot(request.id, request.data);
    }
}
