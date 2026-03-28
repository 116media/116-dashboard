import type { Rule } from "antd/es/form";
import { ValidatorUtils } from "@/shared/presentation/utils/validators/validators.utils";

export const ChangePasswordValidator = {
    oldPassword: (name: string): Rule[] => [ValidatorUtils.required(name)],

    newPassword: (name: string): Rule[] => [
        ValidatorUtils.required(name),
        {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[\s\S]{6,}$/,
            message: `${name} doit avoir au moins 6 caractères et contenir 1 majuscule, 1 minuscule, 1 chiffre`
        }
    ],

    confirmPassword: (name: string): Rule[] => [
        ValidatorUtils.required(name),
        ({ getFieldValue }) => ({
            validator(_: unknown, value: string) {
                if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error("Les mots de passe ne correspondent pas"));
            }
        })
    ]
} as const;
