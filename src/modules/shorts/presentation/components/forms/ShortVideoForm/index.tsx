import type { FormInstance } from "antd";
import { Form, Input } from "antd";
import type { FC } from "react";
import type { ICreateShortCredentials } from "@/modules/shorts/presentation/model/ICreateShortCredentials";
import { ShortsContentValidator } from "@/modules/shorts/presentation/utils/validators/shorts.content.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import FileUploader from "@/shared/presentation/ui/FileUploader";
import { IMAGE_PRESET } from "@/shared/presentation/ui/FileUploader/presets";

const { Item } = Form;

/**
 * Props for the ShortVideoForm component.
 *
 * @interface IShortVideoFormProps
 * @property {FormInstance<ICreateShortCredentials>} form - Ant Design form instance for field control
 * @property {Failure | null | undefined} error - Backend error to display in the alert
 * @property {File | null} videoFile - Currently selected video file
 * @property {(file: File | null) => void} onVideoFileChange - Callback when the video file changes
 * @property {(values: ICreateShortCredentials) => void} onSubmit - Callback when the form is submitted
 */
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
 * using the shared FileUploader in deferred mode. The file is
 * captured locally and uploaded when the form submits.
 */
const ShortVideoForm: FC<IShortVideoFormProps> = ({ form, error, onVideoFileChange, onSubmit }) => {
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
                    preset={IMAGE_PRESET}
                    onFileSelect={onVideoFileChange}
                    onRemove={() => onVideoFileChange(null)}
                />
            </Item>
        </Form>
    );
};

export default ShortVideoForm;
