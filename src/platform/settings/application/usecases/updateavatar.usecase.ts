import type { IUser } from "@/modules/auth/domain/entities/IUser";
import type { ISettingsRepositoryPort } from "@/platform/settings/application/repositories/settings.repository.port";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IUpdateAvatarUseCase
 * @extends {IResultUseCase<File, IUser>}
 */
interface IUpdateAvatarUseCase extends IResultUseCase<File, IUser> {}

/**
 * Use case for uploading a new profile avatar.
 *
 * @class UpdateAvatarUseCase
 * @implements {IUpdateAvatarUseCase}
 *
 * @description
 * Uploads a new avatar image file and returns the updated user profile.
 */
export class UpdateAvatarUseCase implements IUpdateAvatarUseCase {
    private readonly settingsRepository: ISettingsRepositoryPort;

    /**
     * @param {ISettingsRepositoryPort} settingsRepository - Repository for settings operations (injected)
     */
    constructor({ settingsRepository }: { settingsRepository: ISettingsRepositoryPort }) {
        this.settingsRepository = settingsRepository;
    }

    /**
     * Executes the update avatar use case.
     *
     * @param {File} file - The image file to upload
     * @returns {Promise<Result<IUser>>} `ok(IUser)` with the updated profile on success, `err(Failure)` on failure
     */
    async execute(file: File): Promise<Result<IUser>> {
        return this.settingsRepository.updateAvatar(file);
    }
}
