import { Table } from "antd";
import { type FC, useCallback, useState } from "react";
import { useAuthorization } from "@/modules/auth/presentation/hooks/UseAuthorization";
import type { IPricingTierEntity } from "@/modules/lookup/domain/entities/IPricingTierEntity";
import PricingTierForm from "@/modules/lookup/presentation/components/forms/PricingTierForm";
import type { PricingTierAction } from "@/modules/lookup/presentation/components/tables/PricingTiersTable/columns";
import { pricingTiersTableColumns } from "@/modules/lookup/presentation/components/tables/PricingTiersTable/columns";
import PricingTierActionModal from "@/modules/lookup/presentation/components/ui/PricingTierActionModal";
import { PRICING_TIER_STATUS_OPTIONS } from "@/modules/lookup/presentation/constants/lookup.pricing-tiers.status";
import { useCreatePricingTier } from "@/modules/lookup/presentation/hooks/UseCreatePricingTier";
import { usePricingTierActions } from "@/modules/lookup/presentation/hooks/UsePricingTierActions";
import { usePricingTiersList } from "@/modules/lookup/presentation/hooks/UsePricingTiersList";
import { useUpdatePricingTier } from "@/modules/lookup/presentation/hooks/UseUpdatePricingTier";
import CreateEditModal from "@/shared/presentation/ui/CreateEditModal";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconDollarOutlined } from "@/shared/presentation/ui/Icons";
import PageHeader from "@/shared/presentation/ui/PageHeader";
import ResizableTitle from "@/shared/presentation/ui/ResizableTable/ResizableTitle";
import TableToolbar from "@/shared/presentation/ui/TableToolbar";

/**
 * Container for the pricing tiers list tab.
 *
 * @component
 *
 * @description
 * Orchestrates the pricing tiers table, create/edit modals, and action
 * confirmation modal. Wires all hooks and manages modal state.
 * Uses client-side status filtering with no pagination or search.
 */
const PricingTiersListContainer: FC = () => {
    const list = usePricingTiersList();
    const createPricingTier = useCreatePricingTier();
    const [selectedEntity, setSelectedEntity] = useState<IPricingTierEntity | null>(null);
    const updatePricingTier = useUpdatePricingTier(selectedEntity);
    const actions = usePricingTierActions(list.reload);

    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [actionOpen, setActionOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState<PricingTierAction | null>(null);

    const { isSuperAdmin } = useAuthorization();

    const handleAction = useCallback((action: PricingTierAction, entity: IPricingTierEntity) => {
        setSelectedEntity(entity);

        switch (action) {
            case "edit":
                setEditOpen(true);
                break;
            default:
                setCurrentAction(action);
                setActionOpen(true);
                break;
        }
    }, []);

    const handleActionConfirm = async () => {
        if (!selectedEntity || !currentAction) return;

        const actionMap = {
            activate: actions.onActivate,
            deactivate: actions.onDeactivate
        } as const;

        const handler = actionMap[currentAction as keyof typeof actionMap];
        if (handler) {
            await handler(selectedEntity.id);
            setActionOpen(false);
        }
    };

    const [columnWidths, setColumnWidths] = useState<Record<number, number>>({});

    const handleResize =
        (index: number) =>
        (_: React.SyntheticEvent, { size }: { size: { width: number } }) => {
            setColumnWidths((prev) => ({ ...prev, [index]: size.width }));
        };

    const baseColumns = pricingTiersTableColumns(handleAction, isSuperAdmin);

    const tableColumns = baseColumns.map((col, index) => ({
        ...col,
        width: columnWidths[index] ?? col.width,
        onHeaderCell: () => ({
            width: columnWidths[index] ?? col.width,
            onResize: handleResize(index)
        })
    }));

    return (
        <>
            <ErrorAlert banner showIcon closable error={list.error} onClose={list.reload} />

            <PageHeader
                title="Niveaux tarifaires"
                subtitle="Gérer les niveaux tarifaires disponibles."
                icon={<IconDollarOutlined />}
                onCreate={isSuperAdmin ? () => setCreateOpen(true) : undefined}
                createLabel="Créer un niveau"
            />

            <TableToolbar
                statusFilter={list.statusFilter}
                onStatusFilterChange={list.onStatusFilterChange}
                statusOptions={PRICING_TIER_STATUS_OPTIONS}
                searchValue=""
                onSearchChange={() => {}}
                onSearch={() => {}}
            />

            <Table
                rowKey="id"
                dataSource={list.items}
                columns={tableColumns}
                loading={list.loading}
                components={{ header: { cell: ResizableTitle } }}
                pagination={{ showSizeChanger: true, defaultPageSize: 10 }}
            />

            {createOpen && (
                <CreateEditModal
                    width={420}
                    open={createOpen}
                    formContext="CREATE"
                    loading={createPricingTier.loading}
                    success={createPricingTier.success}
                    onClose={() => setCreateOpen(false)}
                    onSubmit={() => createPricingTier.form.submit()}
                    title={{
                        create: "Créer un niveau tarifaire",
                        edit: "Modifier le niveau tarifaire"
                    }}
                    onSuccessClose={() => {
                        setCreateOpen(false);
                        createPricingTier.resetCreate();
                        list.reload();
                    }}
                >
                    <PricingTierForm
                        form={createPricingTier.form}
                        error={createPricingTier.error}
                        formContext="CREATE"
                    />
                </CreateEditModal>
            )}

            {editOpen && (
                <CreateEditModal
                    width={420}
                    open={editOpen}
                    formContext="EDIT"
                    loading={updatePricingTier.loading}
                    success={updatePricingTier.success}
                    onClose={() => {
                        setEditOpen(false);
                        updatePricingTier.resetUpdate();
                    }}
                    onSubmit={() => updatePricingTier.form.submit()}
                    title={{
                        create: "Créer un niveau tarifaire",
                        edit: "Modifier le niveau tarifaire"
                    }}
                    onSuccessClose={() => {
                        setEditOpen(false);
                        updatePricingTier.resetUpdate();
                        list.reload();
                    }}
                >
                    <PricingTierForm
                        form={updatePricingTier.form}
                        error={updatePricingTier.error}
                        formContext="EDIT"
                        initialValues={selectedEntity}
                    />
                </CreateEditModal>
            )}

            <PricingTierActionModal
                open={actionOpen}
                pricingTier={selectedEntity}
                action={currentAction}
                loading={actions.loading}
                error={actions.error}
                onConfirm={handleActionConfirm}
                onCancel={() => setActionOpen(false)}
            />
        </>
    );
};

export default PricingTiersListContainer;
