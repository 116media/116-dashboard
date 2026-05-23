import type { FormInstance } from "antd";
import { Form } from "antd";
import { useEffect, useState } from "react";
import type { IVideoSummaryEntity } from "@/modules/videos/domain/entities/IVideoSummaryEntity";
import type { IScheduleShootCredentials } from "@/modules/videos/presentation/model/IScheduleShootCredentials";
import { getVideoByIdAction } from "@/modules/videos/presentation/store/getvideobyid.action";
import {
    resetScheduleShootAction,
    scheduleShootAction
} from "@/modules/videos/presentation/store/scheduleshoot.action";
import { VideosNotification } from "@/modules/videos/presentation/utils/notification/videos.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { dayjs } from "@/shared/presentation/utils/dayjs/dayjs.utils";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the schedule shoot hook.
 *
 * @interface IUseScheduleShoot
 */
interface IUseScheduleShoot {
    loading: boolean;
    success: string | null;
    error: Failure | null | undefined;
    form: FormInstance<IScheduleShootCredentials>;
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
export const useScheduleShoot = (video: IVideoSummaryEntity | null): IUseScheduleShoot => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IScheduleShootCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ videos: { scheduleShoot } }) => scheduleShoot);

    useEffect(() => {
        if (!video?.id) return;

        const fetchDetail = async () => {
            const result = await dispatch(getVideoByIdAction(video.id));
            if (getVideoByIdAction.fulfilled.match(result)) {
                const detail = result.payload;
                if (detail.shootingScheduledAt) {
                    form.setFieldsValue({
                        shootingScheduledAt: dayjs(detail.shootingScheduledAt)
                    });
                }
            }
        };

        fetchDetail();
    }, [video, dispatch, form]);

    const onSubmit = async (id: string, values: IScheduleShootCredentials): Promise<void> => {
        const { shootingScheduledAt } = values;
        const result = await dispatch(
            scheduleShootAction({
                id,
                data: {
                    shootingScheduledAt: dayjs(shootingScheduledAt).toISOString()
                }
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
        form.resetFields();
        dispatch(resetScheduleShootAction());
    };

    return { form, loading, error, success, onSubmit, resetShoot };
};
