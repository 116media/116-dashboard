import type { FormInstance } from "antd";
import { Form } from "antd";
import { useState } from "react";
import type { ICreateLyricsCredentials } from "@/modules/lyrics/presentation/model/ICreateLyricsCredentials";
import { createLyricsAction } from "@/modules/lyrics/presentation/store/createlyrics.action";
import { LyricsNotification } from "@/modules/lyrics/presentation/utils/notification/lyrics.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the create lyrics hook.
 *
 * @interface IUseCreateLyrics
 */
interface IUseCreateLyrics {
    form: FormInstance<ICreateLyricsCredentials>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: ICreateLyricsCredentials) => Promise<void>;
    resetCreate: () => void;
}

/**
 * Custom hook for the create lyrics form logic.
 *
 * @description
 * Manages form state, submission, and success feedback for
 * creating new lyrics. On success, sets a success message
 * and shows a toast notification.
 *
 * @param onSuccess - Optional callback invoked after successful creation
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useCreateLyrics = (onSuccess?: () => void): IUseCreateLyrics => {
    const dispatch = useAppDispatch();
    const [form] = useForm<ICreateLyricsCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ lyrics: { createLyrics } }) => createLyrics);

    const onSubmit = async (values: ICreateLyricsCredentials): Promise<void> => {
        const result = await dispatch(
            createLyricsAction({
                songTitle: values.songTitle,
                artistName: values.artistName,
                lyricsText: values.lyricsText,
                language: values.language,
                videoId: values.videoId
            })
        );

        if (createLyricsAction.fulfilled.match(result)) {
            setSuccess(LyricsNotification.createSuccess.description);
            showNotification(LyricsNotification.createSuccess);
            form.resetFields();
            onSuccess?.();
        }
    };

    const resetCreate = () => {
        setSuccess(null);
    };

    return { form, loading, error, success, onSubmit, resetCreate };
};
