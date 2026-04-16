import type { IUser } from "@/modules/auth/domain/entities/IUser";
import type { ISettingsRepositoryPort } from "@/platform/settings/application/repositories/settings.repository.port";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IGetProfileUseCase
 * @extends {IResultUseCase<void, IUser>}
 */
interface IGetProfileUseCase extends IResultUseCase<void, IUser> {}

/**
 * Use case for fetching the current authenticated user's profile.
 *
 * @class GetProfileUseCase
 * @implements {IGetProfileUseCase}
 *
 * @description
 * Retrieves the user's profile data (name, email, avatar, etc.)
 * from the settings repository.
 */
export class GetProfileUseCase implements IGetProfileUseCase {
    private readonly settingsRepository: ISettingsRepositoryPort;

    /**
     * @param {ISettingsRepositoryPort} settingsRepository - Repository for settings operations (injected)
     */
    constructor({ settingsRepository }: { settingsRepository: ISettingsRepositoryPort }) {
        this.settingsRepository = settingsRepository;
    }

    /**
     * Executes the get profile use case.
     *
     * @returns {Promise<Result<IUser>>} `ok(IUser)` on success, `err(Failure)` on failure
     */
    async execute(): Promise<Result<IUser>> {
        return this.settingsRepository.getProfile();
    }
}
