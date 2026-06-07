import type { FormInstance } from "antd";
import { Form, Input, InputNumber, Select } from "antd";
import type { FC } from "react";
import { useEffect } from "react";
import type { IPromotionLevelEntity } from "@/modules/lookup/domain/entities/IPromotionLevelEntity";
import type { ICreatePromotionLevelCredentials } from "@/modules/lookup/presentation/model/ICreatePromotionLevelCredentials";
import { PromotionLevelsValidator } from "@/modules/lookup/presentation/utils/validators/lookup.promotion-levels.validator";
import type { Failure } from "@/shared/domain/failures/failure";
import type { FormContext } from "@/shared/domain/types/pagination";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import SelectOptionTagged from "@/shared/presentation/ui/SelectOptions/SelectOptionTagged";

const { Item } = Form;

/**
 * Props for the PromotionLevelForm component.
 *
 * @interface IPromotionLevelFormProps
 * @property {FormInstance} form - Ant Design form instance
 * @property {Failure | null | undefined} error - API error to display
 * @property {FormContext} formContext - "CREATE" or "EDIT" mode
 * @property {IPromotionLevelEntity} [initialValues] - Pre-populated values for edit mode
 */
interface IPromotionLevelFormProps {
    form: FormInstance;
    formContext: FormContext;
    error: Failure | null | undefined;
    initialValues?: IPromotionLevelEntity | null;
    onSubmit: (values: ICreatePromotionLevelCredentials) => void;
}

/**
 * Shared form for creating and editing promotion levels.
 *
 * @component
 *
 * @description
 * Renders name, durationDays, and priceUsd fields with client-side
 * validation matching the backend constraints. Pre-populates from
 * `initialValues` when in EDIT mode. Displays API errors via `ErrorAlert`.
 *
 * @param {IPromotionLevelFormProps} props - Component props
 * @returns {JSX.Element} The promotion level form
 */
const PromotionLevelForm: FC<IPromotionLevelFormProps> = ({
    form,
    error,
    formContext,
    initialValues,
    onSubmit
}) => {
    const spotPriorityOptions = [
        { value: 1, label: "Carrousel héros", tag: "Spot 1" },
        { value: 2, label: "Carrousel latéral", tag: "Spot 2" },
        { value: 3, label: "Binôme inférieur", tag: "Spot 3" }
    ];

    useEffect(() => {
        if (formContext === "EDIT" && initialValues) {
            form.setFieldsValue({
                name: initialValues.name,
                durationDays: initialValues.durationDays,
                priceUsd: initialValues.priceUsd,
                spotPriority: initialValues.spotPriority ?? null
            });
        }
    }, [formContext, initialValues, form]);

    return (
        <Form
            form={form}
            size="large"
            layout="vertical"
            onFinish={onSubmit}
            name="promotion_level_form"
            validateTrigger={["onSubmit", "onBlur"]}
        >
            <ErrorAlert error={error} showIcon closable banner={false} />

            <Item name="name" label="Nom" rules={PromotionLevelsValidator.name("Nom")}>
                <Input maxLength={40} placeholder="Nom du niveau de promotion" />
            </Item>

            <Item
                name="durationDays"
                label="Durée (jours)"
                rules={PromotionLevelsValidator.durationDays("Durée")}
            >
                <InputNumber min={1} placeholder="Nombre de jours" />
            </Item>

            <Item
                name="priceUsd"
                label="Prix (USD)"
                rules={PromotionLevelsValidator.priceUsd("Prix")}
            >
                <InputNumber min={0} step={0.5} placeholder="Prix en USD" />
            </Item>

            <Item
                name="spotPriority"
                label="Spot de promotion"
                rules={PromotionLevelsValidator.spotPriority("Spot de promotion")}
            >
                <Select
                    allowClear
                    placeholder="Aucun spot"
                    options={spotPriorityOptions}
                    optionRender={SelectOptionTagged}
                />
            </Item>
        </Form>
    );
};

export default PromotionLevelForm;
