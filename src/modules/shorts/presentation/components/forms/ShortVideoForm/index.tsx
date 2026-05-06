import type { FormInstance } from "antd";
import { Form, Input, Select } from "antd";
import { type FC, useEffect, useMemo } from "react";
import type { ICreateShortCredentials } from "@/modules/shorts/presentation/model/ICreateShortCredentials";
import { ShortsContentValidator } from "@/modules/shorts/presentation/utils/validators/shorts.content.validator";
import type { IVideoSummaryEntity } from "@/modules/videos/domain/entities/IVideoSummaryEntity";
import { getActiveVideosAction } from "@/modules/videos/presentation/store/getactivevideos.action";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppDispatch, useAppSelector } from "@/shared/presentation/store/store";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import FileUploader from "@/shared/presentation/ui/FileUploader";
import { VIDEO_PRESET } from "@/shared/presentation/ui/FileUploader/presets";
import { SelectOptionDetail } from "@/shared/presentation/ui/SelectOptions";
import VideoPlayer from "@/shared/presentation/ui/VideoPlayer";

const { Item } = Form;

interface IShortVideoFormProps {
    videoFile: File | null;
    error: Failure | null | undefined;
    form: FormInstance<ICreateShortCredentials>;
    onVideoFileChange: (file: File | null) => void;
    onSubmit: (values: ICreateShortCredentials) => void;
}

/**
 * Form for creating a new short video.
 *
 * @component
 *
 * @description
 * Renders title, video select (from active videos), and a file
 * upload using the shared FileUploader in deferred mode with video
 * preset. Shows a Plyr-powered video preview when a file is selected.
 */
const ShortVideoForm: FC<IShortVideoFormProps> = ({
    form,
    error,
    videoFile,
    onVideoFileChange,
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

    const previewUrl = useMemo(
        () => (videoFile ? URL.createObjectURL(videoFile) : null),
        [videoFile]
    );

    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="short_video_create_form"
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

            <Item label="Fichier vidéo" required>
                <FileUploader
                    mode="deferred"
                    showPreview={false}
                    preset={VIDEO_PRESET}
                    onFileSelect={onVideoFileChange}
                    onRemove={() => onVideoFileChange(null)}
                />
            </Item>

            {previewUrl && <VideoPlayer src={previewUrl} maxHeight={400} />}
        </Form>
    );
};

export default ShortVideoForm;
