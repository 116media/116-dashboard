import type { Rule } from "antd/es/form";
import { ValidatorUtils } from "@/shared/presentation/utils/validators/validators.utils";

export const SettingsValidator = {
    userName: (name: string): Rule[] => [
        ValidatorUtils.required(name),
        ValidatorUtils.minmax(name, { min: 2, max: 50 })
    ],

    countryName: (name: string): Rule[] => [ValidatorUtils.required(name)],

    phonePartial: (name: string, phoneDialCode?: string): Rule[] => [
        ValidatorUtils.required(name),
        ValidatorUtils.phone(name, phoneDialCode)
    ]
} as const;
