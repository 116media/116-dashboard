import type { FormInstance } from "antd";
import { Form } from "antd";
import { useState } from "react";
import type { ICreatePermissionCredentials } from "@/modules/permissions/presentation/model/ICreatePermissionCredentials";
import { createPermissionAction } from "@/modules/permissions/presentation/store/create.action";
import { PermissionsNotification } from "@/modules/permissions/presentation/utils/notification/permissions.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the create permission hook.
 *
 * @interface IUseCreatePermission
 */
interface IUseCreatePermission {
    form: FormInstance<ICreatePermissionCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: ICreatePermissionCredentials) => Promise<void>;
    resetCreate: () => void;
}

/**
 * Custom hook for the create permission form logic.
 *
 * @description
 * Manages form state, submission, and success feedback for
 * creating a new permission. On success, sets a success message
 * and shows a toast notification.
 *
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useCreatePermission = (onSuccess?: () => void): IUseCreatePermission => {
    const dispatch = useAppDispatch();
    const [form] = useForm<ICreatePermissionCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ permissions: { create } }) => create);

    const onSubmit = async (values: ICreatePermissionCredentials): Promise<void> => {
        const result = await dispatch(createPermissionAction(values));

        if (createPermissionAction.fulfilled.match(result)) {
            setSuccess(PermissionsNotification.createSuccess.description);
            showNotification(PermissionsNotification.createSuccess);
            form.resetFields();
            onSuccess?.();
        }
    };

    const resetCreate = () => {
        setSuccess(null);
    };

    return { form, loading, error, success, onSubmit, resetCreate };
};
