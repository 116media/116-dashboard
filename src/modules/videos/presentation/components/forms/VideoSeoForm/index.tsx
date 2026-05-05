import type { FormInstance } from "antd";
import { Form, Input } from "antd";
import type { FC } from "react";
import type { IUpdateVideoSeoCredentials } from "@/modules/videos/presentation/model/IUpdateVideoSeoCredentials";
import { VideosSeoValidator } from "@/modules/videos/presentation/utils/validators/videos.seo.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

const { Item } = Form;
const { TextArea } = Input;

/**
 * Props for the VideoSeoForm component.
 *
 * @interface IVideoSeoFormProps
 * @property {FormInstance<IUpdateVideoSeoCredentials>} form - Ant Design form instance for field control
 * @property {Failure | null | undefined} error - Backend error to display in the alert
 * @property {(values: IUpdateVideoSeoCredentials) => void} onSubmit - Callback when the form is submitted
 */
interface IVideoSeoFormProps {
    form: FormInstance<IUpdateVideoSeoCredentials>;
    error?: Failure | null | undefined;
    onSubmit: (values: IUpdateVideoSeoCredentials) => void;
}

/**
 * Form for editing video SEO metadata.
 *
 * @component
 *
 * @description
 * Renders meta title and meta description fields with character
 * count indicators. Validation rules enforce maximum lengths
 * matching backend constraints.
 *
 * @param {IVideoSeoFormProps} props - Component props
 * @returns {JSX.Element} The rendered SEO form
 */
const VideoSeoForm: FC<IVideoSeoFormProps> = ({ form, error, onSubmit }) => {
    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="video_seo_form"
            validateTrigger={["onSubmit", "onBlur"]}
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            <Item
                name="metaTitle"
                label="Titre SEO"
                rules={VideosSeoValidator.metaTitle("Titre SEO")}
            >
                <Input maxLength={70} showCount placeholder="Titre SEO de la vidéo" />
            </Item>

            <Item
                name="metaDescription"
                label="Description SEO"
                rules={VideosSeoValidator.metaDescription("Description SEO")}
            >
                <TextArea
                    rows={3}
                    showCount
                    maxLength={160}
                    placeholder="Description SEO de la vidéo"
                />
            </Item>
        </Form>
    );
};

export default VideoSeoForm;
