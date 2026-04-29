import { Button, Card, Drawer, Flex, Typography } from "antd";
import type { FC } from "react";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import CategoryPricingForm from "@/modules/catalog/presentation/components/forms/CategoryPricingForm";
import CategoryPricingList from "@/modules/catalog/presentation/components/ui/CategoryPricingList";
import CategoryPricingListLoading from "@/modules/catalog/presentation/components/ui/CategoryPricingList/CategoryPricingList.Loading";
import { useAddCategoryPricing } from "@/modules/catalog/presentation/hooks/UseAddCategoryPricing";
import { useManageCategoryPricing } from "@/modules/catalog/presentation/hooks/UseManageCategoryPricing";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";

const { Title } = Typography;

/**
 * Props for the CategoryPricingPanel component.
 *
 * @interface ICategoryPricingPanelProps
 * @property {boolean} open - Whether the drawer is visible
 * @property {ICategoryEntity | null} category - The category to manage pricing for
 * @property {() => void} onClose - Closes the drawer
 * @property {boolean} loading - Whether the category data is being refreshed
 * @property {() => void} onSuccess - Callback after a successful add/update/remove
 */
interface ICategoryPricingPanelProps {
    open: boolean;
    loading: boolean;
    onClose: () => void;
    onSuccess: () => void;
    category: ICategoryEntity | null;
}

/**
 * Drawer panel for managing category pricing tiers.
 *
 * @component
 *
 * @description
 * Displays existing pricing tiers via `CategoryPricingList` with
 * inline edit and delete.
 *
 * @param {ICategoryPricingPanelProps} props - Component props
 * @returns {JSX.Element} The pricing management drawer
 */
const CategoryPricingPanel: FC<ICategoryPricingPanelProps> = ({
    open,
    loading,
    category,
    onClose,
    onSuccess
}) => {
    const addPricing = useAddCategoryPricing(category?.id ?? null, onSuccess);
    const managePricing = useManageCategoryPricing(category?.id ?? null, onSuccess);

    const handleUpdate = async (pricingId: string, priceUsd: number) => {
        await managePricing.onUpdatePricing(pricingId, { priceUsd });
    };

    return (
        <Drawer
            size={520}
            open={open}
            destroyOnHidden
            onClose={onClose}
            title={`Tarifs — ${category?.name ?? ""}`}
        >
            <ErrorAlert error={addPricing.error} showIcon closable banner={false} />
            <ErrorAlert error={managePricing.updateError} showIcon closable banner={false} />
            <ErrorAlert error={managePricing.removeError} showIcon closable banner={false} />

            <Title level={5}>Tarifs existants</Title>

            <Flex orientation="vertical">
                {loading ? (
                    <CategoryPricingListLoading />
                ) : (
                    <CategoryPricingList
                        pricing={category?.pricing ?? []}
                        updateLoading={managePricing.updateLoading}
                        removeLoading={managePricing.removeLoading}
                        onUpdate={handleUpdate}
                        onRemove={managePricing.onRemovePricing}
                    />
                )}

                <Title level={5} style={{ marginTop: 24 }}>
                    Ajouter un tarif
                </Title>
                <Card>
                    <CategoryPricingForm
                        form={addPricing.form}
                        error={addPricing.error}
                        onSubmit={addPricing.onSubmit}
                    />

                    <Flex justify="end">
                        <Button
                            type="primary"
                            loading={addPricing.loading}
                            onClick={() => addPricing.form.submit()}
                        >
                            Ajouter
                        </Button>
                    </Flex>
                </Card>
            </Flex>
        </Drawer>
    );
};

export default CategoryPricingPanel;
