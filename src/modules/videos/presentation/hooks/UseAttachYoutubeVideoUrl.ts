import type { FormInstance } from "antd";
import { Form } from "antd";
import { useState } from "react";
import type { IAttachYoutubeUrlCredentials } from "@/modules/videos/presentation/model/IAttachYoutubeUrlCredentials";
import {
    attachYoutubeIdAction,
    resetAttachYoutubeVideoUrlAction
} from "@/modules/videos/presentation/store/attachyoutubeid.action";
import { VideosNotification } from "@/modules/videos/presentation/utils/notification/videos.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the attach YouTube ID hook.
 *
 * @interface IUseAttachYoutubeVideoUrl
 */
interface IUseAttachYoutubeVideoUrl {
    form: FormInstance<IAttachYoutubeUrlCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (id: string, values: IAttachYoutubeUrlCredentials) => Promise<void>;
    resetYoutube: () => void;
}

/**
 * Custom hook for the attach YouTube ID form logic.
 *
 * @description
 * Manages form state, submission, and success feedback for
 * attaching a YouTube video ID to a video. On success, sets
 * a success message and shows a toast notification.
 *
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useAttachYoutubeVideoUrl = (): IUseAttachYoutubeVideoUrl => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IAttachYoutubeUrlCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ videos: { attachYoutubeId } }) => attachYoutubeId);

    const onSubmit = async (id: string, values: IAttachYoutubeUrlCredentials): Promise<void> => {
        const result = await dispatch(
            attachYoutubeIdAction({
                id,
                data: { youtubeVideoUrl: values.youtubeVideoUrl }
            })
        );

        if (attachYoutubeIdAction.fulfilled.match(result)) {
            setSuccess(VideosNotification.attachYoutubeSuccess.description);
            showNotification(VideosNotification.attachYoutubeSuccess);
            form.resetFields();
        }
    };

    const resetYoutube = () => {
        setSuccess(null);
        form.resetFields();
        dispatch(resetAttachYoutubeVideoUrlAction());
    };

    return { form, loading, error, success, onSubmit, resetYoutube };
};
