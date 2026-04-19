import type { FormInstance } from "antd";
import { Form, Input } from "antd";
import type { FC } from "react";
import type { ICreateLyricsCredentials } from "@/modules/lyrics/presentation/model/ICreateLyricsCredentials";
import { LyricsContentValidator } from "@/modules/lyrics/presentation/utils/validators/lyrics.content.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

const { Item } = Form;
const { TextArea } = Input;

/**
 * Props for the LyricsForm component.
 *
 * @interface ILyricsFormProps
 * @property {FormInstance<ICreateLyricsCredentials>} form - Ant Design form instance for field control
 * @property {Failure | null | undefined} error - Backend error to display in the alert
 * @property {(values: ICreateLyricsCredentials) => void} onSubmit - Callback when the form is submitted
 */
interface ILyricsFormProps {
    form: FormInstance<ICreateLyricsCredentials>;
    error: Failure | null | undefined;
    onSubmit: (values: ICreateLyricsCredentials) => void;
}

/**
 * Form for creating and editing lyrics.
 *
 * @component
 *
 * @description
 * Renders song title, artist name, lyrics text (TextArea), language,
 * and optional video ID / article ID fields. Validation rules enforce
 * maximum lengths matching backend constraints.
 *
 * @param {ILyricsFormProps} props - Component props
 * @returns {JSX.Element} The rendered lyrics form
 */
const LyricsForm: FC<ILyricsFormProps> = ({ form, error, onSubmit }) => {
    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="lyrics_form"
            validateTrigger={["onSubmit", "onBlur"]}
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            <Item
                name="songTitle"
                label="Titre de la chanson"
                rules={LyricsContentValidator.songTitle("Titre de la chanson")}
            >
                <Input maxLength={200} placeholder="Titre de la chanson" />
            </Item>

            <Item
                name="artistName"
                label="Nom de l'artiste"
                rules={LyricsContentValidator.artistName("Nom de l'artiste")}
            >
                <Input maxLength={100} placeholder="Nom de l'artiste" />
            </Item>

            <Item
                name="lyricsText"
                label="Paroles"
                rules={LyricsContentValidator.lyricsText("Paroles")}
            >
                <TextArea rows={8} placeholder="Texte des paroles" />
            </Item>

            <Item name="language" label="Langue" rules={LyricsContentValidator.language("Langue")}>
                <Input maxLength={10} placeholder="fr, en, sw, ..." />
            </Item>

            <Item name="videoId" label="ID Video">
                <Input placeholder="UUID de la video" />
            </Item>

            <Item name="articleId" label="ID Article">
                <Input placeholder="UUID de l'article" />
            </Item>
        </Form>
    );
};

export default LyricsForm;
