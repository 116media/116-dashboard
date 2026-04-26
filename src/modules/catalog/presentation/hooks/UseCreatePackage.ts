import type { FormInstance } from "antd";
import { Form } from "antd";
import { useState } from "react";
import type { ICreatePackageCredentials } from "@/modules/catalog/presentation/model/ICreatePackageCredentials";
import {
    createPackageAction,
    resetCreatePackageAction
} from "@/modules/catalog/presentation/store/createpackage.action";
import { PackagesNotification } from "@/modules/catalog/presentation/utils/notification/catalog.packages.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the create package hook.
 *
 * @interface IUseCreatePackage
 */
interface IUseCreatePackage {
    form: FormInstance<ICreatePackageCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: ICreatePackageCredentials) => Promise<void>;
    resetCreate: () => void;
}

/**
 * Custom hook for the create package form logic.
 *
 * @description
 * Manages form state, submission, and success feedback for
 * creating a new package. On success, sets a success message
 * and shows a toast notification.
 *
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useCreatePackage = (onSuccess?: () => void): IUseCreatePackage => {
    const dispatch = useAppDispatch();
    const [form] = useForm<ICreatePackageCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ catalog: { createPackage } }) => createPackage);

    const onSubmit = async (values: ICreatePackageCredentials): Promise<void> => {
        const result = await dispatch(createPackageAction(values));

        if (createPackageAction.fulfilled.match(result)) {
            setSuccess(PackagesNotification.createSuccess.description);
            showNotification(PackagesNotification.createSuccess);
            form.resetFields();
            onSuccess?.();
        }
    };

    const resetCreate = () => {
        setSuccess(null);
        form.resetFields();
        dispatch(resetCreatePackageAction());
    };

    return { form, loading, error, success, onSubmit, resetCreate };
};
