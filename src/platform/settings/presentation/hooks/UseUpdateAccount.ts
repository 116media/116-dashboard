import type { FormInstance } from "antd";
import { Form } from "antd";
import { useEffect, useState } from "react";
import { setCurrentUserAction } from "@/platform/session/presentation/store/currentuser.action";
import type { IUpdateAccountCredentials } from "@/platform/settings/presentation/model/IUpdateAccountCredentials";
import {
    resetUpdateAccountAction,
    updateAccountAction
} from "@/platform/settings/presentation/store/profile.action";
import { SettingsNotification } from "@/platform/settings/presentation/utils/notification/settings.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { COUNTRY_LIST, type ICountryObject } from "@/shared/infrastructure/constants/countries";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm, useWatch } = Form;

interface IUseUpdateAccount {
    form: FormInstance<IUpdateAccountCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    isOpen: boolean;
    open: () => void;
    close: () => void;
    onSubmit: (formValues: IUpdateAccountCredentials) => void;
    resetUpdate: () => void;
}

/**
 * Custom hook for the account info edit modal.
 *
 * @description
 * Manages modal open/close state, form pre-population with current
 * profile data, country selection, and account update submission.
 * Syncs the updated user data with the auth store on success.
 *
 * @returns Modal state, form instance, and submit handler
 */
export const useUpdateAccount = (): IUseUpdateAccount => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IUpdateAccountCredentials>();
    const [isOpen, setIsOpen] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [country, setCountry] = useState<ICountryObject>();

    const { loading, error } = useAppSelector(({ settings: { updateAccount } }) => updateAccount);

    const profile = useAppSelector(({ session: { currentUser } }) => currentUser.data);

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
        setSuccess(null);
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
            setSuccess(SettingsNotification.profileUpdateSuccess.description);
            showNotification(SettingsNotification.profileUpdateSuccess);
            dispatch(setCurrentUserAction(result.payload));
        }
    };

    const resetUpdate = () => {
        setSuccess(null);
        form.resetFields();
        dispatch(resetUpdateAccountAction());
    };

    return { form, loading, error, success, isOpen, open, close, onSubmit, resetUpdate };
};
