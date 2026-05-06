import type { FormInstance } from "antd";
import { Form } from "antd";
import { useEffect, useState } from "react";
import type { ILyricsEntity } from "@/modules/lyrics/domain/entities/ILyricsEntity";
import type { IUpdateLyricsSeoCredentials } from "@/modules/lyrics/presentation/model/IUpdateLyricsSeoCredentials";
import {
    resetUpdateLyricsSeoAction,
    updateLyricsSeoAction
} from "@/modules/lyrics/presentation/store/updatelyricsseo.action";
import { LyricsNotification } from "@/modules/lyrics/presentation/utils/notification/lyrics.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";

const { useForm } = Form;

/**
 * Return type for the update lyrics SEO hook.
 *
 * @interface IUseUpdateLyricsSeo
 */
interface IUseUpdateLyricsSeo {
    loading: boolean;
    success: string | null;
    error: Failure | null | undefined;
    form: FormInstance<IUpdateLyricsSeoCredentials>;
    onSubmit: (values: IUpdateLyricsSeoCredentials) => Promise<void>;
    resetSeo: () => void;
}

/**
 * Custom hook for the lyrics SEO metadata form logic.
 *
 * @description
 * Manages form state, pre-population of metaTitle and metaDescription
 * from the lyrics entity, submission, and success
 * feedback for updating lyrics SEO metadata.
 *
 * @param lyricsEntity - The lyrics record whose SEO to edit (used for pre-population and ID)
 * @param onSuccess - Optional callback invoked after successful update
 * @returns Form instance, loading/error state, success message, and submit handler
 */
export const useUpdateLyricsSeo = (
    lyricsEntity: ILyricsEntity | null,
    onSuccess?: () => void
): IUseUpdateLyricsSeo => {
    const dispatch = useAppDispatch();
    const [form] = useForm<IUpdateLyricsSeoCredentials>();
    const [success, setSuccess] = useState<string | null>(null);

    const { loading, error } = useAppSelector(({ lyrics: { updateLyricsSeo } }) => updateLyricsSeo);

    useEffect(() => {
        if (lyricsEntity) {
            form.setFieldsValue({
                metaTitle: lyricsEntity.metaTitle ?? "",
                metaDescription: lyricsEntity.metaDescription ?? ""
            });
        }
    }, [lyricsEntity, form]);

    const onSubmit = async (values: IUpdateLyricsSeoCredentials): Promise<void> => {
        if (!lyricsEntity) return;

        const result = await dispatch(
            updateLyricsSeoAction({
                data: values,
                id: lyricsEntity.id
            })
        );

        if (updateLyricsSeoAction.fulfilled.match(result)) {
            setSuccess(LyricsNotification.updateSeoSuccess.description);
            showNotification(LyricsNotification.updateSeoSuccess);
            onSuccess?.();
        }
    };

    const resetSeo = () => {
        setSuccess(null);
        form.resetFields();
        dispatch(resetUpdateLyricsSeoAction());
        form.resetFields();
    };

    return { form, loading, error, success, onSubmit, resetSeo };
};
