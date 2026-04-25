import type { FormInstance } from "antd";
import { Form, Input } from "antd";
import { type FC, useMemo } from "react";
import type { ICreateShortCredentials } from "@/modules/shorts/presentation/model/ICreateShortCredentials";
import { ShortsContentValidator } from "@/modules/shorts/presentation/utils/validators/shorts.content.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import FileUploader from "@/shared/presentation/ui/FileUploader";
import { VIDEO_PRESET } from "@/shared/presentation/ui/FileUploader/presets";
import VideoPlayer from "@/shared/presentation/ui/VideoPlayer";

const { Item } = Form;

interface IShortVideoFormProps {
    form: FormInstance<ICreateShortCredentials>;
    error: Failure | null | undefined;
    videoFile: File | null;
    onVideoFileChange: (file: File | null) => void;
    onSubmit: (values: ICreateShortCredentials) => void;
}

/**
 * Form for creating a new short video.
 *
 * @component
 *
 * @description
 * Renders title, optional videoId fields, and a file upload
 * using the shared FileUploader in deferred mode with video preset.
 * Shows a Plyr-powered video preview when a file is selected.
 */
const ShortVideoForm: FC<IShortVideoFormProps> = ({
    form,
    error,
    videoFile,
    onVideoFileChange,
    onSubmit
}) => {
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

            <Item name="videoId" label="ID vidéo">
                <Input placeholder="Identifiant de la vidéo existante" />
            </Item>

            <Item label="Fichier vidéo" required>
                <FileUploader
                    mode="deferred"
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
