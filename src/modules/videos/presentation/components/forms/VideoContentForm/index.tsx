import type { FormInstance } from "antd";
import { Form } from "antd";
import type { FC } from "react";
import { VideosContentValidator } from "@/modules/videos/presentation/utils/validators/videos.content.validator";
import { IconFireFilled } from "@/shared/presentation/ui/Icons";
import RichTextEditor from "@/shared/presentation/ui/RichTextEditor";
import SwitchField from "@/shared/presentation/ui/SwitchField";

const { Item } = Form;

interface IVideoContentFormProps {
    form: FormInstance;
    socialBoostLocked?: boolean;
}

/**
 * Step 2 form for the video creation wizard.
 *
 * @component
 *
 * @description
 * Renders description, social boost, and featured toggle fields.
 */
const VideoContentForm: FC<IVideoContentFormProps> = ({ form, socialBoostLocked }) => {
    return (
        <Form form={form} size="large" layout="vertical" name="video_wizard_step2">
            <Item
                name="description"
                label="Description"
                rules={VideosContentValidator.description("Description")}
            >
                <RichTextEditor
                    mode="simple"
                    minHeight={150}
                    placeholder="Description de la vidéo"
                />
            </Item>

            <Item name="socialBoost" valuePropName="checked">
                <SwitchField
                    title="Boost social"
                    icon={<IconFireFilled />}
                    disabled={socialBoostLocked}
                    description="Promouvoir cette vidéo sur les réseaux sociaux."
                />
            </Item>
        </Form>
    );
};

export default VideoContentForm;
