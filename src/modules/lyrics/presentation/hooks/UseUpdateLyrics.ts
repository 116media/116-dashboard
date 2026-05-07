import type { FormInstance } from "antd";
import { Form } from "antd";
import { useEffect, useState } from "react";
import type { ILyricsEntity } from "@/modules/lyrics/domain/entities/ILyricsEntity";
import { updateLyricsAction } from "@/modules/lyrics/presentation/store/updatelyrics.action";
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
    form: FormInstance<{ lyricsText: string }>;
    loading: boolean;
    error: Failure | null | undefined;
    success: string | null;
    onSubmit: (values: { lyricsText: string }) => Promise<void>;
    resetUpdate: () => void;
}

/**
 * Custom hook for the edit lyrics form logic.
 *
 * @description
 * Manages form state, pre-population from the lyrics entity,
 * submission, and success feedback for updating lyrics text.
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
    const [form] = useForm<{ lyricsText: string }>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ lyrics: { updateLyrics } }) => updateLyrics);

    useEffect(() => {
        if (lyricsEntity) {
            form.setFieldsValue({
                lyricsText: lyricsEntity.lyricsText
            });
        }
    }, [lyricsEntity, form]);

    const onSubmit = async (values: { lyricsText: string }): Promise<void> => {
        if (!lyricsEntity) return;

        const result = await dispatch(
            updateLyricsAction({
                id: lyricsEntity.id,
                data: values
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
    };

    return { form, loading, error, success, onSubmit, resetUpdate };
};
