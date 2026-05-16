import { useCallback, useEffect, useState } from "react";
import type { IOrderDetailEntity } from "@/modules/commerce/domain/entities/IOrderDetailEntity";
import type { IOrderItemEntity } from "@/modules/commerce/domain/entities/IOrderItemEntity";
import { getOrderByIdAction } from "@/modules/commerce/presentation/store/getorderbyid.action";
import { listOrdersAction } from "@/modules/commerce/presentation/store/listorders.action";
import { EnumOrderStatus } from "@/shared/infrastructure/api/generated/116.api";
import { useAppDispatch } from "@/shared/presentation/store/store";

export interface IOrderItemOption {
    value: string;
    label: string;
    code: string;
    secondary: string;
    contentKind: string;
    categoryName: string;
}

interface IUsePaidOrderItems {
    options: IOrderItemOption[];
    loading: boolean;
    fetchByCustomer: (customerId?: string) => void;
}

const formatItemOption = (item: IOrderItemEntity, order: IOrderDetailEntity): IOrderItemOption => ({
    value: item.id,
    code: item.id.slice(0, 8),
    secondary: order.customerName,
    contentKind: item.contentKind,
    categoryName: item.categoryName,
    label: `${item.categoryName} · ${item.contentKind}`
});

/**
 * Fetches paid order items as a flat selectable list.
 *
 * @description
 * Loads all paid orders, fetches each order's detail in parallel,
 * and flattens all items into a single list. Each option includes
 * a short ID prefix, category, and content type for display.
 * Customer name is available for optionRender.
 */
export const usePaidOrderItems = (): IUsePaidOrderItems => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<IOrderItemOption[]>([]);

    const fetchByCustomer = useCallback(
        async (customerId?: string) => {
            setLoading(true);
            setOptions([]);

            const ordersResult = await dispatch(
                listOrdersAction({
                    pageIndex: 0,
                    pageSize: 100,
                    status: EnumOrderStatus.Paid,
                    customerId
                })
            );

            if (!listOrdersAction.fulfilled.match(ordersResult)) {
                setLoading(false);
                return;
            }

            const orders = ordersResult.payload.items ?? [];
            if (orders.length === 0) {
                setLoading(false);
                return;
            }

            const detailResults = await Promise.all(
                orders.map((order) => dispatch(getOrderByIdAction(order.id)))
            );

            const flatItems = detailResults
                .filter(getOrderByIdAction.fulfilled.match)
                .flatMap((result) => {
                    const detail = result.payload as IOrderDetailEntity;
                    return detail.items.map((item) => formatItemOption(item, detail));
                });

            setOptions(flatItems);
            setLoading(false);
        },
        [dispatch]
    );

    useEffect(() => {
        fetchByCustomer();
    }, [fetchByCustomer]);

    return { options, loading, fetchByCustomer };
};
