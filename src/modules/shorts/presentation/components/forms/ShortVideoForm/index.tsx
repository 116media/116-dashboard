import type { FormInstance } from "antd";
import { Button, Form, Input, Upload } from "antd";
import type { FC } from "react";
import type { ICreateShortCredentials } from "@/modules/shorts/presentation/model/ICreateShortCredentials";
import { ShortsContentValidator } from "@/modules/shorts/presentation/utils/validators/shorts.content.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconInboxOutlined } from "@/shared/presentation/ui/Icons";

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
 * Renders title, slug, optional videoId fields, and a video file upload.
 * The file is captured via Ant Design Upload with `beforeUpload` returning
 * false to prevent automatic upload.
 *
 * @param {IShortVideoFormProps} props - Component props
 * @returns {JSX.Element} The rendered short video creation form
 */
const ShortVideoForm: FC<IShortVideoFormProps> = ({
    form,
    error,
    videoFile,
    onVideoFileChange,
    onSubmit
}) => {
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
                <Upload
                    maxCount={1}
                    accept="video/*"
                    fileList={
                        videoFile
                            ? [
                                  {
                                      uid: "-1",
                                      name: videoFile.name,
                                      status: "done"
                                  }
                              ]
                            : []
                    }
                    beforeUpload={(f) => {
                        onVideoFileChange(f as unknown as File);
                        return false;
                    }}
                    onRemove={() => onVideoFileChange(null)}
                >
                    <Button icon={<IconInboxOutlined />}>Sélectionner un fichier vidéo</Button>
                </Upload>
            </Item>
        </Form>
    );
};

export default ShortVideoForm;
