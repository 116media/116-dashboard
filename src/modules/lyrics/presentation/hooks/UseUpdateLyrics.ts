import type { FormInstance } from "antd";
import { Form } from "antd";
import { useEffect, useState } from "react";
import type { ILyricsEntity } from "@/modules/lyrics/domain/entities/ILyricsEntity";
import type { IUpdateLyricsCredentials } from "@/modules/lyrics/presentation/model/IUpdateLyricsCredentials";
import {
    resetUpdateLyricsAction,
    updateLyricsAction
} from "@/modules/lyrics/presentation/store/updatelyrics.action";
import { LyricsNotification } from "@/modules/lyrics/presentation/utils/notification/lyrics.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the update lyrics hook.
 *
 * @interface IUseUpdateLyrics
 */
interface IUseUpdateLyrics {
    loading: boolean;
    success: string | null;
    error: Failure | null | undefined;
    form: FormInstance<IUpdateLyricsCredentials>;
    onSubmit: (values: IUpdateLyricsCredentials) => Promise<void>;
    resetUpdate: () => void;
}

/**
 * Custom hook for the edit lyrics form logic.
 *
 * @description
 * Manages form state, pre-population from the lyrics entity,
 * submission, and success feedback for updating lyrics.
 *
 * @param lyricsEntity - The lyrics record to edit (used for pre-population and ID)
 * @param onSuccess - Optional callback invoked after successful update
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useUpdateLyrics = (
    lyricsEntity: ILyricsEntity | null,
    onSuccess?: () => void
): IUseUpdateLyrics => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IUpdateLyricsCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ lyrics: { updateLyrics } }) => updateLyrics);

    useEffect(() => {
        if (lyricsEntity) {
            form.setFieldsValue({
                language: lyricsEntity.language,
                songTitle: lyricsEntity.songTitle,
                artistName: lyricsEntity.artistName,
                lyricsText: lyricsEntity.lyricsText,
                videoId: lyricsEntity.videoId ?? undefined
            });
        }
    }, [lyricsEntity, form]);

    const onSubmit = async (values: IUpdateLyricsCredentials): Promise<void> => {
        if (!lyricsEntity) return;

        const result = await dispatch(
            updateLyricsAction({
                data: values,
                id: lyricsEntity.id
            })
        );

        if (updateLyricsAction.fulfilled.match(result)) {
            setSuccess(LyricsNotification.updateSuccess.description);
            showNotification(LyricsNotification.updateSuccess);
            onSuccess?.();
        }
    };

    const resetUpdate = () => {
        setSuccess(null);
        form.resetFields();
        dispatch(resetUpdateLyricsAction());
    };

    return { form, loading, error, success, onSubmit, resetUpdate };
};
