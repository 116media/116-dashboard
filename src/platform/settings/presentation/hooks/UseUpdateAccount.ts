import type { FormInstance } from "antd";
import { Form } from "antd";
import { useEffect, useState } from "react";
import { authSlice } from "@/modules/auth/presentation/store";
import type { IUpdateAccountCredentials } from "@/platform/settings/presentation/model/IUpdateAccountCredentials";
import { updateAccountAction } from "@/platform/settings/presentation/store/profile.action";
import { SettingsNotification } from "@/platform/settings/presentation/utils/notification/settings.notification";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";
import { COUNTRY_LIST, type ICountryObject } from "@/shared/infrastructure/constants/countries";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm, useWatch } = Form;

interface IUseUpdateAccount {
    form: FormInstance<IUpdateAccountCredentials>;
    loading: boolean;
    error: IApiProblemDetails | null | undefined;
    isOpen: boolean;
    open: () => void;
    close: () => void;
    onSubmit: (formValues: IUpdateAccountCredentials) => void;
}

export const useUpdateAccount = (): IUseUpdateAccount => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IUpdateAccountCredentials>();
    const [isOpen, setIsOpen] = useState(false);
    const [country, setCountry] = useState<ICountryObject>();

    const { loading, error } = useAppSelector(({ settings: { updateAccount } }) => updateAccount);

    const profile = useAppSelector(({ settings: { profile } }) => profile.data);

    const selectedCountryName = useWatch("countryName", form);

    useEffect(() => {
        if (selectedCountryName) {
            const found = COUNTRY_LIST.find((c) => c.name === selectedCountryName);
            if (found) setCountry(found);
        }
    }, [selectedCountryName]);

    useEffect(() => {
        if (isOpen && profile) {
            form.setFieldsValue({
                userName: profile.userName,
                email: profile.email ?? "",
                countryName: profile.countryName ?? undefined,
                phonePartial: profile.partialPhoneNumber ?? undefined
            });
        }
    }, [isOpen, profile, form]);

    const open = () => setIsOpen(true);

    const close = () => {
        setIsOpen(false);
        form.resetFields();
    };

    const onSubmit = async (formValues: IUpdateAccountCredentials) => {
        const credentials: IUpdateAccountCredentials = {
            email: formValues.email,
            userName: formValues.userName,
            countryName: formValues.countryName,
            countryFlag: country?.flag,
            phonePartial: formValues.phonePartial,
            phoneISOCode: country?.isoCode,
            phoneDialCode: country?.dialCode
        };

        const result = await dispatch(updateAccountAction(credentials));
        if (updateAccountAction.fulfilled.match(result)) {
            close();
            showNotification(SettingsNotification.profileUpdateSuccess);
            dispatch(authSlice.actions.updateUser(result.payload));
        }
    };

    return { form, loading, error, isOpen, open, close, onSubmit };
};
