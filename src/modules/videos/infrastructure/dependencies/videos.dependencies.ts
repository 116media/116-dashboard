import type { AwilixContainer } from "awilix";
import { asClass } from "awilix";
import { ApproveVideoUseCase } from "@/modules/videos/application/usecases/approvevideo.usecase";
import { ArchiveVideoUseCase } from "@/modules/videos/application/usecases/archivevideo.usecase";
import { AttachYoutubeVideoUrlUseCase } from "@/modules/videos/application/usecases/attachyoutubeid.usecase";
import { CreateVideoUseCase } from "@/modules/videos/application/usecases/createvideo.usecase";
import { DeleteVideoUseCase } from "@/modules/videos/application/usecases/deletevideo.usecase";
import { GetActiveVideosUseCase } from "@/modules/videos/application/usecases/getactivevideos.usecase";
import { GetAllVideosUseCase } from "@/modules/videos/application/usecases/getallvideos.usecase";
import { GetVideoByIdUseCase } from "@/modules/videos/application/usecases/getvideobyid.usecase";
import { PublishVideoUseCase } from "@/modules/videos/application/usecases/publishvideo.usecase";
import { RejectVideoUseCase } from "@/modules/videos/application/usecases/rejectvideo.usecase";
import { ScheduleShootUseCase } from "@/modules/videos/application/usecases/scheduleshoot.usecase";
import { SubmitVideoUseCase } from "@/modules/videos/application/usecases/submitvideo.usecase";
import { UpdateVideoUseCase } from "@/modules/videos/application/usecases/updatevideo.usecase";
import { UpdateVideoSeoUseCase } from "@/modules/videos/application/usecases/updatevideoseo.usecase";
import { UpdateVideoTagsUseCase } from "@/modules/videos/application/usecases/updatevideotags.usecase";
import { UploadVideoThumbnailUseCase } from "@/modules/videos/application/usecases/uploadvideothumbnail.usecase";
import { VideosRepositoryImpl } from "@/modules/videos/infrastructure/repositories/videos.repository.impl";

/**
 * Registers videos module dependencies in the Awilix container.
 *
 * @description
 * Registers the repository as a singleton and all use cases as transient.
 * Called during application bootstrap in the service locator.
 *
 * @param container - The Awilix dependency injection container
 */
export function registerVideosDependencies(container: AwilixContainer): void {
    container.register({
        // Repository
        videosRepository: asClass(VideosRepositoryImpl).singleton(),

        // Queries
        getAllVideosUseCase: asClass(GetAllVideosUseCase).transient(),
        getActiveVideosUseCase: asClass(GetActiveVideosUseCase).transient(),
        getVideoByIdUseCase: asClass(GetVideoByIdUseCase).transient(),

        // Commands -- CRUD
        createVideoUseCase: asClass(CreateVideoUseCase).transient(),
        updateVideoUseCase: asClass(UpdateVideoUseCase).transient(),
        deleteVideoUseCase: asClass(DeleteVideoUseCase).transient(),

        // Commands -- Workflow
        submitVideoUseCase: asClass(SubmitVideoUseCase).transient(),
        approveVideoUseCase: asClass(ApproveVideoUseCase).transient(),
        publishVideoUseCase: asClass(PublishVideoUseCase).transient(),
        rejectVideoUseCase: asClass(RejectVideoUseCase).transient(),
        archiveVideoUseCase: asClass(ArchiveVideoUseCase).transient(),

        // Commands -- Media & Metadata
        uploadVideoThumbnailUseCase: asClass(UploadVideoThumbnailUseCase).transient(),
        attachYoutubeIdUseCase: asClass(AttachYoutubeVideoUrlUseCase).transient(),
        updateVideoSeoUseCase: asClass(UpdateVideoSeoUseCase).transient(),
        updateVideoTagsUseCase: asClass(UpdateVideoTagsUseCase).transient(),
        scheduleShootUseCase: asClass(ScheduleShootUseCase).transient()
    });
}
