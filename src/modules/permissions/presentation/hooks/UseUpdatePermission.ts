import type { FormInstance } from "antd";
import { Form } from "antd";
import { useEffect, useState } from "react";
import type { IPermissionEntity } from "@/modules/permissions/domain/entities/IPermission";
import type { IUpdatePermissionCredentials } from "@/modules/permissions/presentation/model/IUpdatePermissionCredentials";
import {
    resetUpdatePermissionAction,
    updatePermissionAction
} from "@/modules/permissions/presentation/store/update.action";
import { PermissionsNotification } from "@/modules/permissions/presentation/utils/notification/permissions.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the update permission hook.
 *
 * @interface IUseUpdatePermission
 */
interface IUseUpdatePermission {
    form: FormInstance<IUpdatePermissionCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: IUpdatePermissionCredentials) => Promise<void>;
    resetUpdate: () => void;
}

/**
 * Custom hook for the edit permission form logic.
 *
 * @description
 * Manages form state, pre-population from initial values,
 * submission, and success feedback for updating a permission.
 *
 * @param permission - The permission to edit
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useUpdatePermission = (
    permission: IPermissionEntity | null,
    onSuccess?: () => void
): IUseUpdatePermission => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IUpdatePermissionCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ permissions: { update } }) => update);

    useEffect(() => {
        if (permission) {
            form.setFieldsValue({
                resource: permission.resource,
                action: permission.action,
                description: permission.description
            });
        }
    }, [permission, form]);

    const onSubmit = async (values: IUpdatePermissionCredentials): Promise<void> => {
        if (!permission) return;

        const result = await dispatch(updatePermissionAction({ id: permission.id, data: values }));

        if (updatePermissionAction.fulfilled.match(result)) {
            setSuccess(PermissionsNotification.updateSuccess.description);
            showNotification(PermissionsNotification.updateSuccess);
            onSuccess?.();
        }
    };

    const resetUpdate = () => {
        setSuccess(null);
        form.resetFields();
        dispatch(resetUpdatePermissionAction());
        form.resetFields();
    };

    return { form, loading, error, success, onSubmit, resetUpdate };
};
