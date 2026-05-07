import type { ISettingsRepositoryPort } from "@/platform/settings/application/repositories/settings.repository.port";
import type { IChangePasswordResponse } from "@/platform/settings/domain/entities/IChangePasswordResponse";
import type { IChangePasswordData } from "@/platform/settings/presentation/model/IChangePasswordData";
import type { IResultUseCase } from "@/shared/application/usecases/IUseCase";
import type { Result } from "@/shared/domain/results/result";

/**
 * @interface IChangePasswordUseCase
 * @extends {IResultUseCase<IChangePasswordData, IChangePasswordResponse>}
 */
interface IChangePasswordUseCase
    extends IResultUseCase<IChangePasswordData, IChangePasswordResponse> {}

/**
 * Use case for changing the user's password.
 *
 * @class ChangePasswordUseCase
 * @implements {IChangePasswordUseCase}
 *
 * @description
 * Validates the current password and updates it to the new one
 * via the settings repository.
 */
export class ChangePasswordUseCase implements IChangePasswordUseCase {
    private readonly settingsRepository: ISettingsRepositoryPort;

    /**
     * @param {ISettingsRepositoryPort} settingsRepository - Repository for settings operations (injected)
     */
    constructor({ settingsRepository }: { settingsRepository: ISettingsRepositoryPort }) {
        this.settingsRepository = settingsRepository;
    }

    /**
     * Executes the change password use case.
     *
     * @param {{ oldPassword: string; newPassword: string }} data - Current and new password
     * @returns {Promise<Result<IChangePasswordResponse>>} `ok(IChangePasswordResponse)` on success, `err(Failure)` on failure
     */
    async execute(data: IChangePasswordData): Promise<Result<IChangePasswordResponse>> {
        return this.settingsRepository.changePassword(data);
    }
}
