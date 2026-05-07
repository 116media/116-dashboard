import type { FormInstance } from "antd";
import { Form } from "antd";
import { useState } from "react";
import type { IRejectVideoCredentials } from "@/modules/videos/presentation/model/IRejectVideoCredentials";
import { rejectVideoAction } from "@/modules/videos/presentation/store/rejectvideo.action";
import { VideosNotification } from "@/modules/videos/presentation/utils/notification/videos.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the reject video hook.
 *
 * @interface IUseRejectVideo
 */
interface IUseRejectVideo {
    form: FormInstance<IRejectVideoCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (id: string, values: IRejectVideoCredentials) => Promise<void>;
    resetReject: () => void;
}

/**
 * Custom hook for the reject video form logic.
 *
 * @description
 * Manages form state, submission, and success feedback for
 * rejecting a video with a reason. On success, sets a
 * success message and shows a toast notification.
 *
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useRejectVideo = (): IUseRejectVideo => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IRejectVideoCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ videos: { rejectVideo } }) => rejectVideo);

    const onSubmit = async (id: string, values: IRejectVideoCredentials): Promise<void> => {
        const result = await dispatch(
            rejectVideoAction({
                id,
                data: { rejectionReason: values.rejectionReason }
            })
        );

        if (rejectVideoAction.fulfilled.match(result)) {
            setSuccess(VideosNotification.rejectSuccess.description);
            showNotification(VideosNotification.rejectSuccess);
            form.resetFields();
        }
    };

    const resetReject = () => {
        setSuccess(null);
    };

    return { form, loading, error, success, onSubmit, resetReject };
};
