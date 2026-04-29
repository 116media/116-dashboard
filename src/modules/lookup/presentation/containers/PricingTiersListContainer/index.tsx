import { Table } from "antd";
import type { FC } from "react";
import { useAuthorization } from "@/modules/auth/presentation/hooks/UseAuthorization";
import type { IPricingTierEntity } from "@/modules/lookup/domain/entities/IPricingTierEntity";
import PricingTierForm from "@/modules/lookup/presentation/components/forms/PricingTierForm";
import type { PricingTierAction } from "@/modules/lookup/presentation/components/tables/PricingTiersTable/columns";
import { pricingTiersTableColumns } from "@/modules/lookup/presentation/components/tables/PricingTiersTable/columns";
import PricingTierActionModal from "@/modules/lookup/presentation/components/ui/PricingTierActionModal";
import { PRICING_TIER_STATUS_OPTIONS } from "@/modules/lookup/presentation/constants/lookup.pricing-tiers.status";
import { useCreatePricingTier } from "@/modules/lookup/presentation/hooks/UseCreatePricingTier";
import { useLookupModals } from "@/modules/lookup/presentation/hooks/UseLookupModals";
import { usePricingTierActions } from "@/modules/lookup/presentation/hooks/UsePricingTierActions";
import { usePricingTiersList } from "@/modules/lookup/presentation/hooks/UsePricingTiersList";
import { useUpdatePricingTier } from "@/modules/lookup/presentation/hooks/UseUpdatePricingTier";
import { useResizableColumns } from "@/shared/presentation/hooks/UseResizableColumns";
import CreateEditModal from "@/shared/presentation/ui/CreateEditModal";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconDollarOutlined } from "@/shared/presentation/ui/Icons";
import PageHeader from "@/shared/presentation/ui/PageHeader";
import ResizableTitle from "@/shared/presentation/ui/ResizableTable";
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
    const modals = useLookupModals<IPricingTierEntity, PricingTierAction>();
    const createPricingTier = useCreatePricingTier(list.reload);
    const updatePricingTier = useUpdatePricingTier(modals.selectedEntity, list.reload);
    const actions = usePricingTierActions(list.reload);
    const { isSuperAdmin } = useAuthorization();

    const { columns: tableColumns } = useResizableColumns(
        pricingTiersTableColumns(modals.handleAction, isSuperAdmin)
    );

    return (
        <>
            <ErrorAlert banner showIcon closable error={list.error} onClose={list.reload} />

            <PageHeader
                title="Niveaux tarifaires"
                subtitle="Gérer les niveaux tarifaires disponibles."
                icon={<IconDollarOutlined />}
                onCreate={isSuperAdmin ? () => modals.setCreateOpen(true) : undefined}
                createLabel="Créer un niveau"
            />

            <TableToolbar
                statusFilter={list.statusFilter}
                onStatusFilterChange={list.onStatusFilterChange}
                statusOptions={PRICING_TIER_STATUS_OPTIONS}
                searchValue={list.searchValue}
                onSearchChange={list.onSearchChange}
                onSearch={list.onSearch}
                searchLoading={list.loading}
            />

            <Table
                rowKey="id"
                scroll={{ x: 200 }}
                dataSource={list.items}
                columns={tableColumns}
                loading={list.loading}
                components={{ header: { cell: ResizableTitle } }}
                rowSelection={{ type: "checkbox", columnWidth: 36 }}
                pagination={{ showSizeChanger: true, defaultPageSize: 10 }}
            />

            {modals.createOpen && (
                <CreateEditModal
                    width={480}
                    open={modals.createOpen}
                    formContext="CREATE"
                    loading={createPricingTier.loading}
                    success={createPricingTier.success}
                    onClose={() => modals.setCreateOpen(false)}
                    onSubmit={() => createPricingTier.form.submit()}
                    title={{
                        create: "Créer un niveau tarifaire",
                        edit: "Modifier le niveau tarifaire"
                    }}
                    onSuccessClose={() => {
                        modals.setCreateOpen(false);
                        createPricingTier.resetCreate();
                        list.reload();
                    }}
                >
                    <PricingTierForm
                        form={createPricingTier.form}
                        error={createPricingTier.error}
                        formContext="CREATE"
                        onSubmit={createPricingTier.onSubmit}
                    />
                </CreateEditModal>
            )}

            {modals.editOpen && (
                <CreateEditModal
                    width={480}
                    open={modals.editOpen}
                    formContext="EDIT"
                    loading={updatePricingTier.loading}
                    success={updatePricingTier.success}
                    onClose={() => {
                        modals.setEditOpen(false);
                        updatePricingTier.resetUpdate();
                    }}
                    onSubmit={() => updatePricingTier.form.submit()}
                    title={{
                        create: "Créer un niveau tarifaire",
                        edit: "Modifier le niveau tarifaire"
                    }}
                    onSuccessClose={() => {
                        modals.setEditOpen(false);
                        updatePricingTier.resetUpdate();
                        list.reload();
                    }}
                >
                    <PricingTierForm
                        form={updatePricingTier.form}
                        error={updatePricingTier.error}
                        formContext="EDIT"
                        initialValues={modals.selectedEntity}
                        onSubmit={updatePricingTier.onSubmit}
                    />
                </CreateEditModal>
            )}

            <PricingTierActionModal
                open={modals.actionOpen}
                pricingTier={modals.selectedEntity}
                action={modals.currentAction}
                loading={actions.loading}
                error={actions.error}
                onConfirm={() =>
                    modals.handleActionConfirm({
                        activate: actions.onActivate,
                        deactivate: actions.onDeactivate
                    })
                }
                onCancel={() => modals.setActionOpen(false)}
            />
        </>
    );
};

export default PricingTiersListContainer;
