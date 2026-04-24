import type { FormInstance } from "antd";
import { Form, Input, Typography } from "antd";
import type { FC } from "react";
import type { IAttachYoutubeIdCredentials } from "@/modules/videos/presentation/model/IAttachYoutubeIdCredentials";
import { VideosYoutubeValidator } from "@/modules/videos/presentation/utils/validators/videos.youtube.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import VideoPlayer from "@/shared/presentation/ui/VideoPlayer";

const { Item } = Form;
const { Paragraph } = Typography;

interface IYoutubeIdFormProps {
    error: Failure | null | undefined;
    form: FormInstance<IAttachYoutubeIdCredentials>;
    onSubmit: (values: IAttachYoutubeIdCredentials) => void;
}

/**
 * Form for attaching a YouTube video ID with live preview.
 *
 * @component
 *
 * @description
 * Renders a single input field for the YouTube video ID with
 * helper text explaining where to find the ID. Shows a live
 * Plyr-powered YouTube preview below the input when a valid
 * ID is entered.
 */
const YoutubeIdForm: FC<IYoutubeIdFormProps> = ({ form, error, onSubmit }) => {
    const youtubeId = Form.useWatch("youtubeVideoId", form);

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

            {youtubeId && youtubeId.length >= 8 && (
                <VideoPlayer youtubeId={youtubeId} maxHeight={300} />
            )}
        </Form>
    );
};

export default YoutubeIdForm;
