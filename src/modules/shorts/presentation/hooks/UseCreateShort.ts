import type { FormInstance } from "antd";
import { Form } from "antd";
import { useState } from "react";
import type { ICreateShortCredentials } from "@/modules/shorts/presentation/model/ICreateShortCredentials";
import {
    createShortAction,
    resetCreateShortAction
} from "@/modules/shorts/presentation/store/createshort.action";
import {
    resetUploadShortVideoAction,
    uploadShortVideoAction
} from "@/modules/shorts/presentation/store/uploadshortvideo.action";
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
 * Creates the short video in two steps following the backend draft model: first it creates a
 * JSON metadata draft, then it uploads the selected video file to that draft via the dedicated
 * upload endpoint. The combined `loading` covers both steps so the modal stays busy until the
 * file has been attached.
 *
 * @param onSuccess - Optional callback invoked after successful creation
 * @returns Form instance, loading/error state, file state, success message, and submit handler
 */
export const useCreateShort = (onSuccess?: () => void): IUseCreateShort => {
    const dispatch = useAppDispatch();
    const [form] = useForm<ICreateShortCredentials>();
    const [success, setSuccess] = useState<string | null>(null);
    const [videoFile, setVideoFile] = useState<File | null>(null);

    const { loading: createLoading, error: createError } = useAppSelector(
        ({ shorts: { createShort } }) => createShort
    );
    const { loading: uploadLoading, error: uploadError } = useAppSelector(
        ({ shorts: { uploadShortVideo } }) => uploadShortVideo
    );

    const onSubmit = async (values: ICreateShortCredentials): Promise<void> => {
        if (!videoFile) return;

        const created = await dispatch(
            createShortAction({
                title: values.title,
                slug: generateSlug(values.title, { unique: true }),
                videoId: values.videoId
            })
        );

        if (!createShortAction.fulfilled.match(created)) return;

        const uploaded = await dispatch(
            uploadShortVideoAction({ id: created.payload.id, data: { file: videoFile } })
        );

        if (!uploadShortVideoAction.fulfilled.match(uploaded)) return;

        setSuccess(ShortsNotification.createSuccess.description);
        showNotification(ShortsNotification.createSuccess);
        form.resetFields();
        setVideoFile(null);
        onSuccess?.();
    };

    const resetCreate = () => {
        setSuccess(null);
        form.resetFields();
        dispatch(resetCreateShortAction());
        dispatch(resetUploadShortVideoAction());
        setVideoFile(null);
    };

    return {
        form,
        loading: createLoading || uploadLoading,
        error: createError ?? uploadError,
        success,
        videoFile,
        setVideoFile,
        onSubmit,
        resetCreate
    };
};
