import type { FormInstance } from "antd";
import { Form, Input, Typography } from "antd";
import { type FC, useEffect, useState } from "react";
import type { IAttachYoutubeUrlCredentials } from "@/modules/videos/presentation/model/IAttachYoutubeUrlCredentials";
import { VideosYoutubeValidator } from "@/modules/videos/presentation/utils/validators/videos.youtube.validator";
import {
    extractYoutubeId,
    isValidYoutubeUrl
} from "@/modules/videos/presentation/utils/youtube/youtube.utils";
import type { Failure } from "@/shared/domain/failures/failure";
import { Colors } from "@/shared/presentation/constants/theme";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconCheckCircleFilled } from "@/shared/presentation/ui/Icons";
import VideoPlayer from "@/shared/presentation/ui/VideoPlayer";

const { Item } = Form;
const { Paragraph } = Typography;

interface IYoutubeUrlFormProps {
    error: Failure | null | undefined;
    form: FormInstance<IAttachYoutubeUrlCredentials>;
    onSubmit: (values: IAttachYoutubeUrlCredentials) => void;
}

/**
 * Form for attaching a YouTube video URL with live preview.
 *
 * @component
 *
 * @description
 * Renders a single input field for the YouTube video URL with
 * helper text. Shows a live Plyr-powered YouTube preview below
 * the input when a valid URL is entered.
 * The preview is debounced (800 ms) to prevent Plyr from mounting
 * and unmounting while the YouTube IFrame API is still initializing,
 * which would crash with a null getAttribute error.
 */
const YoutubeUrlForm: FC<IYoutubeUrlFormProps> = ({ form, error, onSubmit }) => {
    const youtubeUrl = Form.useWatch("youtubeVideoUrl", form);
    const isValid = isValidYoutubeUrl(youtubeUrl);

    const [debouncedYoutubeUrl, setDebouncedYoutubeUrl] = useState<string | null>(
        () => extractYoutubeId(youtubeUrl) ?? null
    );

    useEffect(() => {
        const id = extractYoutubeId(youtubeUrl) ?? null;
        if (!isValid || !id) {
            setDebouncedYoutubeUrl(null);
            return;
        }
        const timer = setTimeout(() => setDebouncedYoutubeUrl(id), 800);
        return () => clearTimeout(timer);
    }, [youtubeUrl, isValid]);

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
                Collez le lien YouTube de la vidéo. Exemple :{" "}
                <strong>https://www.youtube.com/watch?v=IDENTIFIANT</strong>
            </Paragraph>

            <Item
                label="Lien YouTube"
                name="youtubeVideoUrl"
                rules={VideosYoutubeValidator.youtubeVideoUrl("Lien YouTube")}
            >
                <Input
                    maxLength={200}
                    placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    suffix={
                        isValid ? (
                            <IconCheckCircleFilled style={{ color: Colors.Success }} />
                        ) : (
                            <span />
                        )
                    }
                />
            </Item>

            {debouncedYoutubeUrl && <VideoPlayer youtubeId={debouncedYoutubeUrl} maxHeight={300} />}
        </Form>
    );
};

export default YoutubeUrlForm;
