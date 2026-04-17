import type { FormInstance } from "antd";
import { Form, Input, Select } from "antd";
import type { FC } from "react";
import { useMemo } from "react";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import type { ICreateVideoCredentials } from "@/modules/videos/presentation/model/ICreateVideoCredentials";
import { VideosContentValidator } from "@/modules/videos/presentation/utils/validators/videos.content.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppSelector } from "@/shared/presentation/store/store";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

const { Item } = Form;
const { TextArea } = Input;

/**
 * Props for the VideoCreateStep1Form component.
 *
 * @interface IVideoCreateStep1FormProps
 * @property {FormInstance<ICreateVideoCredentials>} form - Ant Design form instance for field control
 * @property {Failure | null | undefined} error - Backend error to display in the alert
 * @property {(values: ICreateVideoCredentials) => void} onSubmit - Callback when the form is submitted
 */
interface IVideoCreateStep1FormProps {
    form: FormInstance<ICreateVideoCredentials>;
    error: Failure | null | undefined;
    onSubmit: (values: ICreateVideoCredentials) => void;
}

/**
 * Step 1 form for the video creation wizard.
 *
 * @component
 *
 * @description
 * Renders category, title, slug, description, optional customer,
 * and optional order item fields. Category and customer options
 * are loaded from the Redux store.
 *
 * @param {IVideoCreateStep1FormProps} props - Component props
 * @returns {JSX.Element} The rendered step 1 creation form
 */
const VideoCreateStep1Form: FC<IVideoCreateStep1FormProps> = ({ form, error, onSubmit }) => {
    const { data: categories } = useAppSelector(
        ({ catalog: { getAllCategories } }) => getAllCategories
    );
    const { data: customers } = useAppSelector(
        ({ catalog: { getAllCustomers } }) => getAllCustomers
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

    const customerOptions = useMemo(
        () =>
            ((customers as { items: ICustomerEntity[] })?.items ?? []).map((c) => ({
                label: c.fullName,
                value: c.id
            })),
        [customers]
    );

    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="video_create_step1_form"
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

            <Item name="customerId" label="Client (optionnel)">
                <Select
                    showSearch
                    allowClear
                    optionFilterProp="label"
                    options={customerOptions}
                    placeholder="Sélectionner un client"
                />
            </Item>

            <Item name="orderItemId" label="Commande (optionnel)">
                <Input placeholder="Identifiant de la commande" />
            </Item>
        </Form>
    );
};

export default VideoCreateStep1Form;
