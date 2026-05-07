import type { FormInstance } from "antd";
import { Form, Input, Select, Switch } from "antd";
import type { FC } from "react";
import { useMemo } from "react";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { IUpdateVideoCredentials } from "@/modules/videos/presentation/model/IUpdateVideoCredentials";
import { VideosContentValidator } from "@/modules/videos/presentation/utils/validators/videos.content.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppSelector } from "@/shared/presentation/store/store";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

const { Item } = Form;
const { TextArea } = Input;

/**
 * Props for the VideoContentForm component.
 *
 * @interface IVideoContentFormProps
 * @property {FormInstance<IUpdateVideoCredentials>} form - Ant Design form instance for field control
 * @property {Failure | null | undefined} error - Backend error to display in the alert
 * @property {(values: IUpdateVideoCredentials) => void} onSubmit - Callback when the form is submitted
 */
interface IVideoContentFormProps {
    form: FormInstance<IUpdateVideoCredentials>;
    error: Failure | null | undefined;
    onSubmit: (values: IUpdateVideoCredentials) => void;
}

/**
 * Content form for video editing.
 *
 * @component
 *
 * @description
 * Renders category, title, slug, description, social boost,
 * and featured toggle fields. Category options are loaded
 * from the catalog store.
 *
 * @param {IVideoContentFormProps} props - Component props
 * @returns {JSX.Element} The rendered video content form
 */
const VideoContentForm: FC<IVideoContentFormProps> = ({ form, error, onSubmit }) => {
    const { data: categories } = useAppSelector(
        ({ catalog: { getAllCategories } }) => getAllCategories
    );

    const categoryOptions = useMemo(
        () =>
            ((categories as { items: ICategoryEntity[] })?.items ?? [])
                .filter((c) => c.isActive)
                .map((c) => ({
                    label: c.name,
                    value: c.id
                })),
        [categories]
    );

    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="video_content_form"
            validateTrigger={["onSubmit", "onBlur"]}
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            <Item
                name="categoryId"
                label="Catégorie"
                rules={VideosContentValidator.categoryId("Catégorie")}
            >
                <Select
                    showSearch
                    optionFilterProp="label"
                    options={categoryOptions}
                    placeholder="Sélectionner une catégorie"
                />
            </Item>

            <Item name="title" label="Titre" rules={VideosContentValidator.title("Titre")}>
                <Input maxLength={200} placeholder="Titre de la vidéo" />
            </Item>

            <Item name="slug" label="Slug" rules={VideosContentValidator.slug("Slug")}>
                <Input maxLength={250} placeholder="slug-de-la-video" />
            </Item>

            <Item
                name="description"
                label="Description"
                rules={VideosContentValidator.description("Description")}
            >
                <TextArea
                    maxLength={2000}
                    showCount
                    rows={4}
                    placeholder="Description de la vidéo"
                />
            </Item>

            <Item name="socialBoost" label="Boost social" valuePropName="checked">
                <Switch />
            </Item>

            <Item name="isFeatured" label="En vedette" valuePropName="checked">
                <Switch />
            </Item>
        </Form>
    );
};

export default VideoContentForm;
