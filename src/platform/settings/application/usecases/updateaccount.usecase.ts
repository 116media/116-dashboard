import type { IUser } from "@/modules/auth/domain/entities/IUser";
import type { ISettingsRepositoryPort } from "@/platform/settings/application/repositories/settings.repository.port";
import type { IUpdateAccountCredentials } from "@/platform/settings/presentation/model/IUpdateAccountCredentials";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IUpdateAccountUseCase
 * @extends {IResultUseCase<IUpdateAccountCredentials, IUser>}
 */
interface IUpdateAccountUseCase extends IResultUseCase<IUpdateAccountCredentials, IUser> {}

/**
 * Use case for updating the user's account information.
 *
 * @class UpdateAccountUseCase
 * @implements {IUpdateAccountUseCase}
 *
 * @description
 * Updates account fields such as username, country, and phone number.
 */
export class UpdateAccountUseCase implements IUpdateAccountUseCase {
    private readonly settingsRepository: ISettingsRepositoryPort;

    /**
     * @param {ISettingsRepositoryPort} settingsRepository - Repository for settings operations (injected)
     */
    constructor({ settingsRepository }: { settingsRepository: ISettingsRepositoryPort }) {
        this.settingsRepository = settingsRepository;
    }

    /**
     * Executes the update account use case.
     *
     * @param {IUpdateAccountCredentials} data - Updated account fields
     * @returns {Promise<Result<IUser>>} `ok(IUser)` with the updated profile on success, `err(Failure)` on failure
     */
    async execute(data: IUpdateAccountCredentials): Promise<Result<IUser>> {
        return this.settingsRepository.updateOwnProfile(data);
    }
}
