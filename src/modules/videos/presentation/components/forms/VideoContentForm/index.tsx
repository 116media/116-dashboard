import type { FormInstance } from "antd";
import { DatePicker, Form } from "antd";
import type { FC } from "react";
import { VideosContentValidator } from "@/modules/videos/presentation/utils/validators/videos.content.validator";
import { IconFireFilled, IconStarFilled } from "@/shared/presentation/ui/Icons";
import RichTextEditor from "@/shared/presentation/ui/RichTextEditor";
import SwitchField from "@/shared/presentation/ui/SwitchField";

const { Item } = Form;

interface IVideoContentFormProps {
    form: FormInstance;
    socialBoostLocked?: boolean;
    featuredLocked?: boolean;
}

/**
 * Step 2 form for the video creation wizard.
 *
 * @component
 *
 * @description
 * Renders description, social boost, and featured toggle fields.
 */
const VideoContentForm: FC<IVideoContentFormProps> = ({
    form,
    socialBoostLocked,
    featuredLocked
}) => {
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

            <Item name="isFeatured" valuePropName="checked">
                <SwitchField
                    title="En vedette"
                    icon={<IconStarFilled />}
                    disabled={featuredLocked}
                    description="Afficher cette vidéo en avant sur la page d'accueil."
                />
            </Item>

            <Item noStyle shouldUpdate={(prev, curr) => prev.isFeatured !== curr.isFeatured}>
                {({ getFieldValue }) =>
                    getFieldValue("isFeatured") ? (
                        <Item name="featuredUntil" label="En vedette jusqu'au">
                            <DatePicker disabled={featuredLocked} placeholder="Date d'expiration" />
                        </Item>
                    ) : null
                }
            </Item>
        </Form>
    );
};

export default VideoContentForm;
