import type { FormInstance } from "antd";
import { Form } from "antd";
import { useState } from "react";
import type { ICreateShortCredentials } from "@/modules/shorts/presentation/model/ICreateShortCredentials";
import {
    createShortAction,
    resetCreateShortAction
} from "@/modules/shorts/presentation/store/createshort.action";
import { ShortsNotification } from "@/modules/shorts/presentation/utils/notification/shorts.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";
import { generateSlug } from "@/shared/presentation/utils/slug/slug.utils";

const { useForm } = Form;

/**
 * Return type for the create short hook.
 *
 * @interface IUseCreateShort
 */
interface IUseCreateShort {
    form: FormInstance<ICreateShortCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    videoFile: File | null;
    setVideoFile: (file: File | null) => void;
    onSubmit: (values: ICreateShortCredentials) => Promise<void>;
    resetCreate: () => void;
}

/**
 * Custom hook for the create short video form logic.
 *
 * @description
 * Manages form state, file state for the video upload, submission,
 * and success feedback for creating a new short video. On success,
 * sets a success message and shows a toast notification.
 *
 * @param onSuccess - Optional callback invoked after successful creation
 * @returns Form instance, loading/error state, file state, success message, and submit handler
 */
export const useCreateShort = (onSuccess?: () => void): IUseCreateShort => {
    const dispatch = useAppDispatch();
    const [form] = useForm<ICreateShortCredentials>();
    const [success, setSuccess] = useState<string | null>(null);
    const [videoFile, setVideoFile] = useState<File | null>(null);

    const { loading, error } = useAppSelector(({ shorts: { createShort } }) => createShort);

    const onSubmit = async (values: ICreateShortCredentials): Promise<void> => {
        if (!videoFile) return;

        const result = await dispatch(
            createShortAction({
                title: values.title,
                slug: generateSlug(values.title, { unique: true }),
                videoFile,
                videoId: values.videoId
            })
        );

        if (createShortAction.fulfilled.match(result)) {
            setSuccess(ShortsNotification.createSuccess.description);
            showNotification(ShortsNotification.createSuccess);
            form.resetFields();
            setVideoFile(null);
            onSuccess?.();
        }
    };

    const resetCreate = () => {
        setSuccess(null);
        form.resetFields();
        dispatch(resetCreateShortAction());
        setVideoFile(null);
    };

    return { form, loading, error, success, videoFile, setVideoFile, onSubmit, resetCreate };
};
