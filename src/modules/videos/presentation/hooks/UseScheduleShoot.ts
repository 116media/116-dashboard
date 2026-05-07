import type { FormInstance } from "antd";
import { Form } from "antd";
import { useState } from "react";
import type { IScheduleShootCredentials } from "@/modules/videos/presentation/model/IScheduleShootCredentials";
import { scheduleShootAction } from "@/modules/videos/presentation/store/scheduleshoot.action";
import { VideosNotification } from "@/modules/videos/presentation/utils/notification/videos.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the schedule shoot hook.
 *
 * @interface IUseScheduleShoot
 */
interface IUseScheduleShoot {
    form: FormInstance<IScheduleShootCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (id: string, values: IScheduleShootCredentials) => Promise<void>;
    resetShoot: () => void;
}

/**
 * Custom hook for the schedule shoot form logic.
 *
 * @description
 * Manages form state, submission, and success feedback for
 * scheduling a video shoot. On success, sets a success message
 * and shows a toast notification.
 *
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useScheduleShoot = (): IUseScheduleShoot => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IScheduleShootCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ videos: { scheduleShoot } }) => scheduleShoot);

    const onSubmit = async (id: string, values: IScheduleShootCredentials): Promise<void> => {
        const result = await dispatch(
            scheduleShootAction({
                id,
                data: { shootingScheduledAt: values.shootingScheduledAt }
            })
        );

        if (scheduleShootAction.fulfilled.match(result)) {
            setSuccess(VideosNotification.scheduleShootSuccess.description);
            showNotification(VideosNotification.scheduleShootSuccess);
            form.resetFields();
        }
    };

    const resetShoot = () => {
        setSuccess(null);
    };

    return { form, loading, error, success, onSubmit, resetShoot };
};
