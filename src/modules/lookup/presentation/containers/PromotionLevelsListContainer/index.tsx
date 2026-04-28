import { Table } from "antd";
import type { FC } from "react";
import { useAuthorization } from "@/modules/auth/presentation/hooks/UseAuthorization";
import type { IPromotionLevelEntity } from "@/modules/lookup/domain/entities/IPromotionLevelEntity";
import PromotionLevelForm from "@/modules/lookup/presentation/components/forms/PromotionLevelForm";
import type { PromotionLevelAction } from "@/modules/lookup/presentation/components/tables/PromotionLevelsTable/columns";
import { promotionLevelsTableColumns } from "@/modules/lookup/presentation/components/tables/PromotionLevelsTable/columns";
import PromotionLevelActionModal from "@/modules/lookup/presentation/components/ui/PromotionLevelActionModal";
import { PROMOTION_LEVEL_STATUS_OPTIONS } from "@/modules/lookup/presentation/constants/lookup.promotion-levels.status";
import { useCreatePromotionLevel } from "@/modules/lookup/presentation/hooks/UseCreatePromotionLevel";
import { useLookupModals } from "@/modules/lookup/presentation/hooks/UseLookupModals";
import { usePromotionLevelActions } from "@/modules/lookup/presentation/hooks/UsePromotionLevelActions";
import { usePromotionLevelsList } from "@/modules/lookup/presentation/hooks/UsePromotionLevelsList";
import { useUpdatePromotionLevel } from "@/modules/lookup/presentation/hooks/UseUpdatePromotionLevel";
import { useResizableColumns } from "@/shared/presentation/hooks/UseResizableColumns";
import CreateEditModal from "@/shared/presentation/ui/CreateEditModal";
import ErrorAlert from "@/shared/presentation/ui/ErrorAlert";
import { IconStarOutlined } from "@/shared/presentation/ui/Icons";
import PageHeader from "@/shared/presentation/ui/PageHeader";
import ResizableTitle from "@/shared/presentation/ui/ResizableTable";
import TableToolbar from "@/shared/presentation/ui/TableToolbar";

/**
 * Container for the promotion levels list tab.
 *
 * @component
 *
 * @description
 * Orchestrates the promotion levels table, create/edit modals, and action
 * confirmation modal. Wires all hooks and manages modal state.
 * Uses client-side status filtering with no pagination or search.
 */
const PromotionLevelsListContainer: FC = () => {
    const list = usePromotionLevelsList();
    const modals = useLookupModals<IPromotionLevelEntity, PromotionLevelAction>();
    const createPromotionLevel = useCreatePromotionLevel(list.reload);
    const updatePromotionLevel = useUpdatePromotionLevel(modals.selectedEntity, list.reload);
    const actions = usePromotionLevelActions(list.reload);
    const { isSuperAdmin } = useAuthorization();

    const { columns: tableColumns } = useResizableColumns(
        promotionLevelsTableColumns(modals.handleAction, isSuperAdmin)
    );

    return (
        <>
            <ErrorAlert banner showIcon closable error={list.error} onClose={list.reload} />

            <PageHeader
                title="Niveaux de promotion"
                subtitle="Gérer les niveaux de promotion disponibles."
                icon={<IconStarOutlined />}
                onCreate={isSuperAdmin ? () => modals.setCreateOpen(true) : undefined}
                createLabel="Créer une promotion"
            />

            <TableToolbar
                statusFilter={list.statusFilter}
                onStatusFilterChange={list.onStatusFilterChange}
                statusOptions={PROMOTION_LEVEL_STATUS_OPTIONS}
                searchValue={list.searchValue}
                onSearchChange={list.onSearchChange}
                onSearch={list.onSearch}
                searchLoading={list.loading}
            />

            <Table
                rowKey="id"
                dataSource={list.items}
                columns={tableColumns}
                loading={list.loading}
                components={{ header: { cell: ResizableTitle } }}
                rowSelection={{ type: "checkbox", columnWidth: 36 }}
                scroll={{ x: "max-content" }}
                pagination={{ showSizeChanger: true, defaultPageSize: 10 }}
            />

            {modals.createOpen && (
                <CreateEditModal
                    width={420}
                    formContext="CREATE"
                    open={modals.createOpen}
                    loading={createPromotionLevel.loading}
                    success={createPromotionLevel.success}
                    onClose={() => modals.setCreateOpen(false)}
                    onSubmit={() => createPromotionLevel.form.submit()}
                    afterClose={() => createPromotionLevel.resetCreate()}
                    title={{
                        create: "Créer un niveau de promotion",
                        edit: "Modifier le niveau de promotion"
                    }}
                    onSuccessClose={() => {
                        modals.setCreateOpen(false);
                        createPromotionLevel.resetCreate();
                        list.reload();
                    }}
                >
                    <PromotionLevelForm
                        form={createPromotionLevel.form}
                        error={createPromotionLevel.error}
                        formContext="CREATE"
                        onSubmit={createPromotionLevel.onSubmit}
                    />
                </CreateEditModal>
            )}

            {modals.editOpen && (
                <CreateEditModal
                    width={420}
                    formContext="EDIT"
                    open={modals.editOpen}
                    loading={updatePromotionLevel.loading}
                    success={updatePromotionLevel.success}
                    onClose={() => {
                        modals.setEditOpen(false);
                        updatePromotionLevel.resetUpdate();
                    }}
                    onSubmit={() => updatePromotionLevel.form.submit()}
                    afterClose={() => updatePromotionLevel.resetUpdate()}
                    title={{
                        create: "Créer un niveau de promotion",
                        edit: "Modifier le niveau de promotion"
                    }}
                    onSuccessClose={() => {
                        modals.setEditOpen(false);
                        updatePromotionLevel.resetUpdate();
                        list.reload();
                    }}
                >
                    <PromotionLevelForm
                        formContext="EDIT"
                        form={updatePromotionLevel.form}
                        error={updatePromotionLevel.error}
                        initialValues={modals.selectedEntity}
                        onSubmit={updatePromotionLevel.onSubmit}
                    />
                </CreateEditModal>
            )}

            <PromotionLevelActionModal
                open={modals.actionOpen}
                error={actions.error}
                action={modals.currentAction}
                loading={actions.loading}
                promotionLevel={modals.selectedEntity}
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

export default PromotionLevelsListContainer;
