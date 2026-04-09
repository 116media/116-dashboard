import { Button, Drawer, Flex, InputNumber, List, Popconfirm, Typography } from "antd";
import { type FC, useState } from "react";
import type { ICategoryEntity } from "@/modules/catalog/domain/entities/ICategoryEntity";
import type { ICategoryPricingEntity } from "@/modules/catalog/domain/entities/ICategoryPricingEntity";
import CategoryPricingForm from "@/modules/catalog/presentation/components/forms/CategoryPricingForm";
import { useAddCategoryPricing } from "@/modules/catalog/presentation/hooks/UseAddCategoryPricing";
import { useManageCategoryPricing } from "@/modules/catalog/presentation/hooks/UseManageCategoryPricing";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconDeleteFilled, IconEditOutlined } from "@/shared/presentation/ui/Icons";

const { Text, Title } = Typography;

interface ICategoryPricingPanelProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    category: ICategoryEntity | null;
}

const CategoryPricingPanel: FC<ICategoryPricingPanelProps> = ({
    open,
    category,
    onClose,
    onSuccess
}) => {
    const addPricing = useAddCategoryPricing(category?.id ?? null, onSuccess);
    const managePricing = useManageCategoryPricing(category?.id ?? null, onSuccess);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState<number>(0);

    const handleStartEdit = (pricing: ICategoryPricingEntity) => {
        setEditingId(pricing.tierId);
        setEditValue(pricing.priceUsd);
    };

    const handleSaveEdit = async (pricingId: string) => {
        await managePricing.onUpdatePricing(pricingId, { priceUsd: editValue });
        setEditingId(null);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
    };

    return (
        <Drawer
            open={open}
            width={480}
            onClose={onClose}
            destroyOnClose
            title={`Tarifs — ${category?.name ?? ""}`}
        >
            <ErrorAlert error={addPricing.error} showIcon closable banner={false} />
            <ErrorAlert error={managePricing.updateError} showIcon closable banner={false} />
            <ErrorAlert error={managePricing.removeError} showIcon closable banner={false} />

            <Title level={5}>Tarifs existants</Title>

            <List
                size="small"
                dataSource={category?.pricing ?? []}
                locale={{ emptyText: "Aucun tarif configuré" }}
                renderItem={(pricing: ICategoryPricingEntity) => (
                    <List.Item
                        actions={
                            editingId === pricing.tierId
                                ? [
                                      <Button
                                          key="save"
                                          type="link"
                                          size="small"
                                          loading={managePricing.updateLoading}
                                          onClick={() => handleSaveEdit(pricing.tierId)}
                                      >
                                          Enregistrer
                                      </Button>,
                                      <Button
                                          key="cancel"
                                          type="link"
                                          size="small"
                                          onClick={handleCancelEdit}
                                      >
                                          Annuler
                                      </Button>
                                  ]
                                : [
                                      <Button
                                          key="edit"
                                          type="text"
                                          size="small"
                                          icon={<IconEditOutlined />}
                                          onClick={() => handleStartEdit(pricing)}
                                      />,
                                      <Popconfirm
                                          key="delete"
                                          title="Supprimer ce tarif ?"
                                          onConfirm={() =>
                                              managePricing.onRemovePricing(pricing.tierId)
                                          }
                                          okText="Oui"
                                          cancelText="Non"
                                      >
                                          <Button
                                              type="text"
                                              size="small"
                                              danger
                                              loading={managePricing.removeLoading}
                                              icon={<IconDeleteFilled />}
                                          />
                                      </Popconfirm>
                                  ]
                        }
                    >
                        <Flex gap={8} align="center" flex={1}>
                            <Text strong>{pricing.tierName}</Text>
                            {editingId === pricing.tierId ? (
                                <InputNumber
                                    min={0}
                                    step={0.5}
                                    size="small"
                                    value={editValue}
                                    onChange={(v) => setEditValue(v ?? 0)}
                                    style={{ width: 100 }}
                                />
                            ) : (
                                <Text type="secondary">{pricing.priceUsd.toFixed(2)} $</Text>
                            )}
                        </Flex>
                    </List.Item>
                )}
            />

            <Title level={5} style={{ marginTop: 24 }}>
                Ajouter un tarif
            </Title>

            <CategoryPricingForm
                form={addPricing.form}
                error={addPricing.error}
                onSubmit={addPricing.onSubmit}
            />

            <Button
                type="primary"
                loading={addPricing.loading}
                onClick={() => addPricing.form.submit()}
            >
                Ajouter
            </Button>
        </Drawer>
    );
};

export default CategoryPricingPanel;
