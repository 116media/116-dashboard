import type { FormInstance } from "antd";
import { Form } from "antd";
import type { IChangePasswordCredentials } from "@/platform/settings/presentation/model/IChangePasswordCredentials";
import { settingsSlice } from "@/platform/settings/presentation/store";
import { changePasswordAction } from "@/platform/settings/presentation/store/security.action";
import { SettingsNotification } from "@/platform/settings/presentation/utils/notification/settings.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

interface IUseChangePassword {
    form: FormInstance<IChangePasswordCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    onSubmit: (values: IChangePasswordCredentials) => void;
    resetChangePassword: () => void;
}

/**
 * Custom hook for the change password form.
 *
 * @description
 * Manages form state, submission, and success notification
 * for changing the user's password.
 *
 * @returns Form instance, loading/error state, and submit handler
 */
export const useChangePassword = (): IUseChangePassword => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IChangePasswordCredentials>();
    const { loading, error } = useAppSelector(({ settings: { changePassword } }) => changePassword);

    const onSubmit = async (values: IChangePasswordCredentials) => {
        const { oldPassword, newPassword } = values;
        const result = await dispatch(changePasswordAction({ oldPassword, newPassword }));
        if (changePasswordAction.fulfilled.match(result)) {
            form.resetFields();
            showNotification(SettingsNotification.changePasswordSuccess);
        }
    };

    const resetChangePassword = () => {
        dispatch(settingsSlice.actions.purge(["changePassword"]));
    };

    return { form, loading, error, onSubmit, resetChangePassword };
};
