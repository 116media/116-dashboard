import type { FormInstance } from "antd";
import { Form, Input, Select } from "antd";
import { type FC, useEffect, useMemo } from "react";
import type { IUpdateShortCredentials } from "@/modules/shorts/presentation/model/IUpdateShortCredentials";
import { ShortsContentValidator } from "@/modules/shorts/presentation/utils/validators/shorts.content.validator";
import type { IVideoSummaryEntity } from "@/modules/videos/domain/entities/IVideoSummaryEntity";
import { getActiveVideosAction } from "@/modules/videos/presentation/store/getactivevideos.action";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import FileUploader from "@/shared/presentation/ui/FileUploader";
import { VIDEO_PRESET } from "@/shared/presentation/ui/FileUploader/presets";
import { SelectOptionDetail } from "@/shared/presentation/ui/SelectOptions";

const { Item } = Form;

interface IShortDetailsFormProps {
    form: FormInstance<IUpdateShortCredentials>;
    error?: Failure | null | undefined;
    uploading: boolean;
    currentVideoUrl?: string | null;
    onVideoUpload: (file: File) => Promise<void>;
    onSubmit: () => Promise<void>;
}

/**
 * Form for editing a short video.
 *
 * @component
 *
 * @description
 * Renders title and video select (from active videos) for the JSON metadata update. The video
 * file is replaced through a dedicated, decoupled upload (`onVideoUpload`) that fires as soon as
 * a file is selected — separate from the metadata submission — and shows a preview of the
 * current video.
 */
const ShortDetailsForm: FC<IShortDetailsFormProps> = ({
    form,
    error,
    uploading,
    currentVideoUrl,
    onVideoUpload,
    onSubmit
}) => {
    const dispatch = useAppDispatch();

    const { data: videos, loading: videosLoading } = useAppSelector(
        ({ videos: { getActiveVideos } }) => getActiveVideos
    );

    useEffect(() => {
        dispatch(getActiveVideosAction());
    }, [dispatch]);

    const videoOptions = useMemo(
        () =>
            (Array.isArray(videos) ? videos : []).map((v: IVideoSummaryEntity) => ({
                value: v.id,
                label: v.title,
                secondary: v.categoryName
            })),
        [videos]
    );

    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="short_details_form"
            validateTrigger={["onSubmit", "onBlur"]}
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            <Item name="title" label="Titre" rules={ShortsContentValidator.title("Titre")}>
                <Input maxLength={200} placeholder="Titre du réel" />
            </Item>

            <Item name="videoId" label="Vidéo associée">
                <Select
                    allowClear
                    options={videoOptions}
                    loading={videosLoading}
                    optionRender={SelectOptionDetail}
                    placeholder="Sélectionner une vidéo"
                    showSearch={{ optionFilterProp: "label" }}
                />
            </Item>

            <Item label="Fichier vidéo">
                <FileUploader
                    mode="deferred"
                    value={currentVideoUrl}
                    disabled={uploading}
                    preset={VIDEO_PRESET}
                    onFileSelect={(file) => {
                        void onVideoUpload(file);
                    }}
                />
            </Item>
        </Form>
    );
};

export default ShortDetailsForm;
