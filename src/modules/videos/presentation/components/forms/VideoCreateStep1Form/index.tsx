import type { FormInstance } from "antd";
import { Flex, Form, Input, Select, Typography } from "antd";
import type { FC } from "react";
import { useMemo } from "react";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { ICustomerEntity } from "@/modules/catalog/domain/entities/ICustomerEntity";
import { usePaidOrderItems } from "@/modules/commerce/presentation/hooks/UsePaidOrderItems";
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
    const orderItems = usePaidOrderItems();

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
                value: c.id,
                company: c.company
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
                    optionRender={(option) => (
                        <Flex justify="space-between" align="center">
                            <span>{option.label}</span>
                            {option.data.company && (
                                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                                    {option.data.company}
                                </Typography.Text>
                            )}
                        </Flex>
                    )}
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
                    optionRender={(option) => (
                        <Flex justify="space-between" align="center" gap={16}>
                            <Flex gap={8} align="center">
                                <Typography.Text code style={{ fontSize: 11 }}>
                                    {option.data.shortId}
                                </Typography.Text>
                                <span>{option.label}</span>
                            </Flex>
                            {option.data.customerName && (
                                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                                    {option.data.customerName}
                                </Typography.Text>
                            )}
                        </Flex>
                    )}
                />
            </Item>
        </Form>
    );
};

export default VideoCreateStep1Form;
