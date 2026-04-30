import type { FormInstance } from "antd";
import { Form, Input, Select } from "antd";
import type { FC } from "react";
import { useMemo } from "react";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import type {
    IOrderItemOption,
    IUsePaidOrderItems
} from "@/modules/commerce/presentation/hooks/UsePaidOrderItems";
import type { ICreateVideoCredentials } from "@/modules/videos/presentation/model/ICreateVideoCredentials";
import { VideosContentValidator } from "@/modules/videos/presentation/utils/validators/videos.content.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import { useAppSelector } from "@/shared/presentation/store/store";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { SelectOptionBadged, SelectOptionDetail } from "@/shared/presentation/ui/SelectOptions";

const { Item } = Form;

/**
 * Props for the VideoInfoForm component.
 *
 * @interface IVideoInfoFormProps
 * @property {FormInstance<ICreateVideoCredentials>} form - Ant Design form instance for field control
 * @property {Failure | null | undefined} error - Backend error to display in the alert
 * @property {(values: ICreateVideoCredentials) => void} onSubmit - Callback when the form is submitted
 * @property {IUsePaidOrderItems} orderItems - Lifted order items state from the parent wizard
 * @property {(option: IOrderItemOption | undefined) => void} [onOrderItemChange] - Called when order item selection changes
 */
interface IVideoInfoFormProps {
    error: Failure | null | undefined;
    form: FormInstance<ICreateVideoCredentials>;
    orderItems: IUsePaidOrderItems;
    onSubmit: (values: ICreateVideoCredentials) => void;
    onOrderItemChange?: (option: IOrderItemOption | undefined) => void;
}

/**
 * Step 1 form for the video creation wizard.
 *
 * @component
 *
 * @description
 * Renders category, title, optional customer, and optional order item fields.
 * Category and customer options are loaded from the Redux store.
 *
 * @param {IVideoInfoFormProps} props - Component props
 * @returns {JSX.Element} The rendered step 1 creation form
 */
const VideoInfoForm: FC<IVideoInfoFormProps> = ({
    form,
    error,
    orderItems,
    onSubmit,
    onOrderItemChange
}) => {
    const { data: categories } = useAppSelector(
        ({ catalog: { getAllCategories } }) => getAllCategories
    );
    const { data: customers } = useAppSelector(
        ({ catalog: { getAllCustomers } }) => getAllCustomers
    );

    const categoryOptions = useMemo(
        () =>
            ((categories as { items: ICategoryEntity[] })?.items ?? [])
                .filter((c) => c.isActive && c.isVideoType)
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
                value: c.id,
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
                    options={categoryOptions}
                    placeholder="Sélectionner une catégorie"
                />
            </Item>

            <Item name="title" label="Titre" rules={VideosContentValidator.title("Titre")}>
                <Input maxLength={200} placeholder="Titre de la vidéo" />
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
                    onChange={(value) => {
                        const option = orderItems.options.find(
                            (o: IOrderItemOption) => o.value === value
                        );
                        form.setFieldValue("socialBoost", option?.socialBoost ?? false);
                        onOrderItemChange?.(option);
                    }}
                />
            </Item>
        </Form>
    );
};

export default VideoInfoForm;
