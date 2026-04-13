import type { AwilixContainer } from "awilix";
import { asClass } from "awilix";
import { ForgotPasswordUseCase } from "@/modules/auth/application/usecases/forgotpassword.usecase";
import { LoginUseCase } from "@/modules/auth/application/usecases/login.usecase";
import { ResendOtpUseCase } from "@/modules/auth/application/usecases/resendotp.usecase";
import { ResetPasswordUseCase } from "@/modules/auth/application/usecases/resetpassword.usecase";
import { SignOutUseCase } from "@/modules/auth/application/usecases/signout.usecase";
import { SignOutAllUseCase } from "@/modules/auth/application/usecases/signoutall.usecase";
import { VerifyOtpUseCase } from "@/modules/auth/application/usecases/verifyotp.usecase";
import { AuthRepositoryImpl } from "@/modules/auth/infrastructure/repositories/auth.repository.impl";

export function registerAuthDependencies(container: AwilixContainer): void {
    container.register({
        authRepository: asClass(AuthRepositoryImpl).singleton(),

        loginUseCase: asClass(LoginUseCase).transient(),
        forgotPasswordUseCase: asClass(ForgotPasswordUseCase).transient(),
        verifyOtpUseCase: asClass(VerifyOtpUseCase).transient(),
        resendOtpUseCase: asClass(ResendOtpUseCase).transient(),
        resetPasswordUseCase: asClass(ResetPasswordUseCase).transient(),
        signOutUseCase: asClass(SignOutUseCase).transient(),
        signOutAllUseCase: asClass(SignOutAllUseCase).transient()
    });
}
