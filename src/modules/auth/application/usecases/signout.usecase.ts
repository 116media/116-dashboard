import type { IAuthRepositoryPort } from "@/modules/auth/application/repositories/auth.repository.port";
import type { ISignOutResponse } from "@/modules/auth/domain/entities/ISignOutResponse";
import type { IUseCase } from "@/shared/application/usecases/IUseCase";

interface ISignOutUseCase extends IUseCase<void, ISignOutResponse> {}

export class SignOutUseCase implements ISignOutUseCase {
    private readonly authRepository: IAuthRepositoryPort;

    constructor({ authRepository }: { authRepository: IAuthRepositoryPort }) {
        this.authRepository = authRepository;
    }

    async execute(): Promise<ISignOutResponse> {
        return this.authRepository.signOut();
    }
}
