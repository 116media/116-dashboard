import type { FormInstance } from "antd";
import { DatePicker, Form, Input, Select } from "antd";
import type { FC } from "react";
import { useMemo } from "react";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import { usePaidOrderItems } from "@/modules/commerce/presentation/hooks/UsePaidOrderItems";
import type { IUpdateVideoCredentials } from "@/modules/videos/presentation/model/IUpdateVideoCredentials";
import { VideosContentValidator } from "@/modules/videos/presentation/utils/validators/videos.content.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppSelector } from "@/shared/presentation/store/store";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconFireFilled, IconStarFilled } from "@/shared/presentation/ui/Icons";
import RichTextEditor from "@/shared/presentation/ui/RichTextEditor";
import { SelectOptionBadged, SelectOptionDetail } from "@/shared/presentation/ui/SelectOptions";
import SwitchField from "@/shared/presentation/ui/SwitchField";

const { Item } = Form;

/**
 * Props for the VideoDetailsForm component.
 *
 * @interface IVideoDetailsFormProps
 * @property {FormInstance<IUpdateVideoCredentials>} form - Ant Design form instance for field control
 * @property {Failure | null | undefined} error - Backend error to display in the alert
 * @property {(values: IUpdateVideoCredentials) => void} onSubmit - Callback when the form is submitted
 */
interface IVideoDetailsFormProps {
    error: Failure | null | undefined;
    form: FormInstance<IUpdateVideoCredentials>;
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
 * @param {IVideoDetailsFormProps} props - Component props
 * @returns {JSX.Element} The rendered video content form
 */
const VideoDetailsForm: FC<IVideoDetailsFormProps> = ({ form, error, onSubmit }) => {
    const { data: categories } = useAppSelector(
        ({ catalog: { getAllCategories } }) => getAllCategories
    );
    const { data: customers } = useAppSelector(
        ({ catalog: { getAllCustomers } }) => getAllCustomers
    );
    const orderItems = usePaidOrderItems();

    const categoryOptions = useMemo(
        () =>
            ((categories as { items: ICategoryEntity[] })?.items ?? [])
                .filter((c) => c.isActive)
                .map((c) => ({ label: c.name, value: c.id })),
        [categories]
    );

    const customerOptions = useMemo(
        () =>
            ((customers as { items: ICustomerEntity[] })?.items ?? []).map((c) => ({
                value: c.id,
                label: c.fullName,
                secondary: c.company ?? undefined
            })),
        [customers]
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
                    options={categoryOptions}
                    placeholder="Sélectionner une catégorie"
                />
            </Item>

            <Item name="title" label="Titre" rules={VideosContentValidator.title("Titre")}>
                <Input maxLength={200} placeholder="Titre de la vidéo" />
            </Item>

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
                    description="Promouvoir cette vidéo sur les réseaux sociaux."
                />
            </Item>

            <Item name="isFeatured" valuePropName="checked">
                <SwitchField
                    title="En vedette"
                    icon={<IconStarFilled />}
                    description="Afficher cette vidéo en avant sur la page d'accueil."
                />
            </Item>

            <Item noStyle shouldUpdate={(prev, curr) => prev.isFeatured !== curr.isFeatured}>
                {({ getFieldValue }) =>
                    getFieldValue("isFeatured") ? (
                        <Item name="featuredUntil" label="En vedette jusqu'au">
                            <DatePicker style={{ width: "100%" }} placeholder="Date d'expiration" />
                        </Item>
                    ) : null
                }
            </Item>

            <Item name="customerId" label="Client">
                <Select
                    showSearch
                    allowClear
                    options={customerOptions}
                    placeholder="Sélectionner un client"
                    onChange={(value) => {
                        form.setFieldValue("orderItemId", undefined);
                        orderItems.fetchByCustomer(value || undefined);
                    }}
                    optionRender={SelectOptionDetail}
                />
            </Item>

            <Item name="orderItemId" label="Commande">
                <Select
                    showSearch
                    allowClear
                    loading={orderItems.loading}
                    disabled={orderItems.loading}
                    options={orderItems.options}
                    placeholder="Sélectionner une commande"
                    popupMatchSelectWidth={false}
                    optionRender={SelectOptionBadged}
                />
            </Item>
        </Form>
    );
};

export default VideoDetailsForm;
