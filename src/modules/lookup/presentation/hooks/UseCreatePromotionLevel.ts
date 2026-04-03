import type { FormInstance } from "antd";
import { Form } from "antd";
import { useState } from "react";
import type { ICreatePromotionLevelCredentials } from "@/modules/lookup/presentation/model/ICreatePromotionLevelCredentials";
import { createPromotionLevelAction } from "@/modules/lookup/presentation/store/createpromotionlevel.action";
import { PromotionLevelsNotification } from "@/modules/lookup/presentation/utils/notification/lookup.promotion-levels.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the create promotion level hook.
 *
 * @interface IUseCreatePromotionLevel
 */
interface IUseCreatePromotionLevel {
    form: FormInstance<ICreatePromotionLevelCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: ICreatePromotionLevelCredentials) => Promise<void>;
    resetCreate: () => void;
}

/**
 * Custom hook for the create promotion level form logic.
 *
 * @description
 * Manages form state, submission, and success feedback for
 * creating a new promotion level. On success, sets a success message
 * and shows a toast notification.
 *
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useCreatePromotionLevel = (): IUseCreatePromotionLevel => {
    const dispatch = useAppDispatch();
    const [form] = useForm<ICreatePromotionLevelCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(
        ({ lookup: { createPromotionLevel } }) => createPromotionLevel
    );

    const onSubmit = async (values: ICreatePromotionLevelCredentials): Promise<void> => {
        const result = await dispatch(createPromotionLevelAction(values));

        if (createPromotionLevelAction.fulfilled.match(result)) {
            setSuccess(PromotionLevelsNotification.createSuccess.description);
            showNotification(PromotionLevelsNotification.createSuccess);
            form.resetFields();
        }
    };

    const resetCreate = () => {
        setSuccess(null);
    };

    return { form, loading, error, success, onSubmit, resetCreate };
};
