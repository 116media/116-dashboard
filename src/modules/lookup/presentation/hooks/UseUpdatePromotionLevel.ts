import type { FormInstance } from "antd";
import { Form } from "antd";
import { useEffect, useState } from "react";
import type { IPromotionLevelEntity } from "@/modules/lookup/domain/entities/IPromotionLevelEntity";
import type { IUpdatePromotionLevelCredentials } from "@/modules/lookup/presentation/model/IUpdatePromotionLevelCredentials";
import {
    resetUpdatePromotionLevelAction,
    updatePromotionLevelAction
} from "@/modules/lookup/presentation/store/updatepromotionlevel.action";
import { PromotionLevelsNotification } from "@/modules/lookup/presentation/utils/notification/lookup.promotion-levels.notification";
import type { Failure, ServerFailure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the update promotion level hook.
 *
 * @interface IUseUpdatePromotionLevel
 */
interface IUseUpdatePromotionLevel {
    form: FormInstance<IUpdatePromotionLevelCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: IUpdatePromotionLevelCredentials) => Promise<void>;
    resetUpdate: () => void;
}

/**
 * Custom hook for the edit promotion level form logic.
 *
 * @description
 * Manages form state, pre-population from initial values,
 * submission, and success feedback for updating a promotion level.
 *
 * @param promotionLevel - The promotion level to edit (used for pre-population and ID)
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useUpdatePromotionLevel = (
    promotionLevel: IPromotionLevelEntity | null,
    onSuccess?: () => void
): IUseUpdatePromotionLevel => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IUpdatePromotionLevelCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(
        ({ lookup: { updatePromotionLevel } }) => updatePromotionLevel
    );

    useEffect(() => {
        if (promotionLevel) {
            form.setFieldsValue({
                name: promotionLevel.name,
                durationDays: promotionLevel.durationDays,
                priceUsd: promotionLevel.priceUsd
            });
        }
    }, [promotionLevel, form]);

    const onSubmit = async (values: IUpdatePromotionLevelCredentials): Promise<void> => {
        if (!promotionLevel) return;

        const result = await dispatch(
            updatePromotionLevelAction({ id: promotionLevel.id, data: values })
        );

        if (updatePromotionLevelAction.fulfilled.match(result)) {
            setSuccess(PromotionLevelsNotification.updateSuccess.description);
            showNotification(PromotionLevelsNotification.updateSuccess);
            onSuccess?.();
        }

        if (updatePromotionLevelAction.rejected.match(result)) {
            const failure = result.payload as ServerFailure | undefined;
            const spotError = failure?.errors?.find((e) => e.errorCode === "InvalidSpotPriority");
            if (spotError) {
                form.setFields([{ name: "spotPriority", errors: [spotError.errorMessage] }]);
            }
        }
    };

    const resetUpdate = () => {
        setSuccess(null);
        form.resetFields();
        dispatch(resetUpdatePromotionLevelAction());
        form.resetFields();
    };

    return { form, loading, error, success, onSubmit, resetUpdate };
};
