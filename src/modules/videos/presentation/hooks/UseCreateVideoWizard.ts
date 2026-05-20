import type { FormInstance } from "antd";
import { Form } from "antd";
import { useCallback, useState } from "react";
import type { IVideoEntity } from "@/modules/videos/domain/entities/IVideoEntity";
import type { ICreateVideoCredentials } from "@/modules/videos/presentation/model/ICreateVideoCredentials";
import type { IUpdateVideoSeoCredentials } from "@/modules/videos/presentation/model/IUpdateVideoSeoCredentials";
import { createVideoAction } from "@/modules/videos/presentation/store/createvideo.action";
import { getVideoByIdAction } from "@/modules/videos/presentation/store/getvideobyid.action";
import { submitVideoAction } from "@/modules/videos/presentation/store/submitvideo.action";
import { updateVideoAction } from "@/modules/videos/presentation/store/updatevideo.action";
import { updateVideoSeoAction } from "@/modules/videos/presentation/store/updatevideoseo.action";
import { updateVideoTagsAction } from "@/modules/videos/presentation/store/updatevideotags.action";
import { VideosNotification } from "@/modules/videos/presentation/utils/notification/videos.notification";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch } from "@/shared/presentation/store/store";
import { showNotification } from "@/shared/presentation/utils/notification/notification.utils";
import { generateSlug } from "@/shared/presentation/utils/slug/slug.utils";

const { useForm } = Form;

interface IWizardStep2Credentials {
    description: string;
    socialBoost: boolean;
    isFeatured: boolean;
}

interface IUseCreateVideoWizard {
    currentStep: number;
    videoId: string | null;
    video: IVideoEntity | null;
    loading: boolean;
    error: Failure | null | undefined;
    step1Form: FormInstance<ICreateVideoCredentials>;
    step2Form: FormInstance<IWizardStep2Credentials>;
    seoForm: FormInstance<IUpdateVideoSeoCredentials>;
    tagNames: string[];
    onTagsChange: (names: string[]) => void;
    goNext: () => Promise<void>;
    goBack: () => void;
    onSubmit: () => Promise<void>;
    reset: () => void;
}

/**
 * Manages the 4-step video creation wizard lifecycle.
 *
 * @description
 * Orchestrates form instances, API calls, and step navigation.
 * Step 1 creates the draft, Step 2 updates content,
 * Step 3 sets tags + SEO, Step 4 submits.
 */
export const useCreateVideoWizard = (onSuccess: () => void): IUseCreateVideoWizard => {
    const dispatch = useAppDispatch();
    const [currentStep, setCurrentStep] = useState(0);
    const [videoId, setVideoId] = useState<string | null>(null);
    const [video, setVideo] = useState<IVideoEntity | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Failure | null | undefined>(null);
    const [tagNames, setTagNames] = useState<string[]>([]);

    const [step1Form] = useForm<ICreateVideoCredentials>();
    const [step2Form] = useForm<IWizardStep2Credentials>();
    const [seoForm] = useForm<IUpdateVideoSeoCredentials>();

    const fetchVideo = useCallback(
        async (id: string) => {
            const result = await dispatch(getVideoByIdAction(id));
            if (getVideoByIdAction.fulfilled.match(result)) {
                setVideo(result.payload);
            }
        },
        [dispatch]
    );

    const handleStep1 = async () => {
        const values = await step1Form.validateFields();

        if (videoId) {
            setCurrentStep(1);
            return;
        }

        setLoading(true);
        setError(null);

        const result = await dispatch(
            createVideoAction({
                ...values,
                slug: generateSlug(values.title, { unique: true })
            })
        );

        if (createVideoAction.fulfilled.match(result)) {
            const created = result.payload;
            setVideoId(created.id);
            setVideo(created);
            setLoading(false);
            setCurrentStep(1);
        } else if (createVideoAction.rejected.match(result)) {
            setError(result.payload);
            setLoading(false);
        }
    };

    const handleStep2 = async () => {
        const values = await step2Form.validateFields();
        if (!videoId || !video) return;

        setLoading(true);
        setError(null);

        const result = await dispatch(
            updateVideoAction({
                id: videoId,
                data: {
                    categoryId: video.categoryId,
                    title: video.title,
                    slug: video.slug,
                    description: values.description,
                    socialBoost: values.socialBoost ?? false,
                    isFeatured: values.isFeatured ?? false
                }
            })
        );

        if (updateVideoAction.fulfilled.match(result)) {
            await fetchVideo(videoId);
            setLoading(false);
            setCurrentStep(2);
        } else if (updateVideoAction.rejected.match(result)) {
            setError(result.payload);
            setLoading(false);
        }
    };

    const handleStep3 = async () => {
        if (!videoId) return;

        setLoading(true);
        setError(null);

        if (tagNames.length > 0) {
            await dispatch(updateVideoTagsAction({ id: videoId, data: { tagNames } }));
        }

        try {
            const seoValues = await seoForm.validateFields();
            await dispatch(updateVideoSeoAction({ id: videoId, data: seoValues }));
        } catch {
            // SEO is optional
        }

        await fetchVideo(videoId);
        setLoading(false);
        setCurrentStep(3);
    };

    const goNext = async () => {
        switch (currentStep) {
            case 0:
                await handleStep1();
                break;
            case 1:
                await handleStep2();
                break;
            case 2:
                await handleStep3();
                break;
        }
    };

    const goBack = () => {
        setCurrentStep((prev) => Math.max(0, prev - 1));
    };

    const onSubmitFinal = async () => {
        if (!videoId) return;

        setLoading(true);
        setError(null);

        const result = await dispatch(submitVideoAction(videoId));

        if (submitVideoAction.fulfilled.match(result)) {
            showNotification(VideosNotification.submitSuccess);
            setLoading(false);
            onSuccess();
        } else if (submitVideoAction.rejected.match(result)) {
            setError(result.payload);
            setLoading(false);
        }
    };

    const reset = () => {
        setCurrentStep(0);
        setVideoId(null);
        setVideo(null);
        setLoading(false);
        setError(null);
        setTagNames([]);
        step1Form.resetFields();
        step2Form.resetFields();
        seoForm.resetFields();
    };

    return {
        currentStep,
        videoId,
        video,
        loading,
        error,
        step1Form,
        step2Form,
        seoForm,
        tagNames,
        onTagsChange: setTagNames,
        goNext,
        goBack,
        onSubmit: onSubmitFinal,
        reset
    };
};
