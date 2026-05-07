import type { FormInstance } from "antd";
import { Form, Input, Typography } from "antd";
import type { FC } from "react";
import type { IAttachYoutubeIdCredentials } from "@/modules/videos/presentation/model/IAttachYoutubeIdCredentials";
import { VideosYoutubeValidator } from "@/modules/videos/presentation/utils/validators/videos.youtube.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

const { Item } = Form;
const { Paragraph } = Typography;

/**
 * Props for the YoutubeIdForm component.
 *
 * @interface IYoutubeIdFormProps
 * @property {FormInstance<IAttachYoutubeIdCredentials>} form - Ant Design form instance for field control
 * @property {Failure | null | undefined} error - Backend error to display in the alert
 * @property {(values: IAttachYoutubeIdCredentials) => void} onSubmit - Callback when the form is submitted
 */
interface IYoutubeIdFormProps {
    form: FormInstance<IAttachYoutubeIdCredentials>;
    error: Failure | null | undefined;
    onSubmit: (values: IAttachYoutubeIdCredentials) => void;
}

/**
 * Form for attaching a YouTube video ID.
 *
 * @component
 *
 * @description
 * Renders a single input field for the YouTube video ID with
 * helper text explaining where to find the ID. Used inside the
 * YouTube ID modal.
 *
 * @param {IYoutubeIdFormProps} props - Component props
 * @returns {JSX.Element} The rendered YouTube ID form
 */
const YoutubeIdForm: FC<IYoutubeIdFormProps> = ({ form, error, onSubmit }) => {
    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="youtube_id_form"
            validateTrigger={["onSubmit", "onBlur"]}
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            <Paragraph type="secondary">
                Saisissez l'identifiant YouTube de la vidéo. Il se trouve dans l'URL de la vidéo :
                https://www.youtube.com/watch?v=<strong>IDENTIFIANT</strong>
            </Paragraph>

            <Item
                name="youtubeVideoId"
                label="Identifiant YouTube"
                rules={VideosYoutubeValidator.youtubeVideoId("Identifiant YouTube")}
            >
                <Input maxLength={20} placeholder="ex: dQw4w9WgXcQ" />
            </Item>
        </Form>
    );
};

export default YoutubeIdForm;
