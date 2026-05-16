import type { FormInstance } from "antd";
import { Form, Input, Select } from "antd";
import type { FC } from "react";
import { useMemo } from "react";
import type { ICreateLyricsCredentials } from "@/modules/lyrics/presentation/model/ICreateLyricsCredentials";
import { LyricsContentValidator } from "@/modules/lyrics/presentation/utils/validators/lyrics.content.validator";
import type { IVideoSummaryEntity } from "@/modules/videos/domain/entities/IVideoSummaryEntity";
import type { Failure } from "@/shared/domain/failures/failure";
import type { IPaginatedResult } from "@/shared/domain/types/pagination";
import { useAppSelector } from "@/shared/presentation/store/store";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import LanguageSelect from "@/shared/presentation/ui/LanguageSelect";
import RichTextEditor from "@/shared/presentation/ui/RichTextEditor";
import { SelectOptionDetail } from "@/shared/presentation/ui/SelectOptions";

const { Item } = Form;

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
 * Renders song title, artist name, lyrics rich text editor, language
 * picker, and optional video selector. Validation rules enforce
 * maximum lengths matching backend constraints.
 */
const LyricsForm: FC<ILyricsFormProps> = ({ form, error, onSubmit }) => {
    const { data: videos } = useAppSelector(({ videos: { getVideos } }) => getVideos);

    const videoOptions = useMemo(
        () =>
            ((videos as IPaginatedResult<IVideoSummaryEntity>)?.items ?? []).map((v) => ({
                label: v.title,
                value: v.id,
                secondary: v.categoryName
            })),
        [videos]
    );

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
                <RichTextEditor mode="simple" minHeight={200} placeholder="Texte des paroles" />
            </Item>

            <Item name="language" label="Langue" rules={LyricsContentValidator.language("Langue")}>
                <LanguageSelect />
            </Item>

            <Item name="videoId" label="Vidéo associée">
                <Select
                    showSearch
                    allowClear
                    options={videoOptions}
                    placeholder="Rechercher une vidéo"
                    optionRender={SelectOptionDetail}
                />
            </Item>
        </Form>
    );
};

export default LyricsForm;
