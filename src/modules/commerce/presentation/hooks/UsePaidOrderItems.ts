import { useCallback, useState } from "react";
import type { IOrderDetailEntity } from "@/modules/commerce/domain/entities/IOrderDetailEntity";
import type { IOrderItemEntity } from "@/modules/commerce/domain/entities/IOrderItemEntity";
import { getOrderByIdAction } from "@/modules/commerce/presentation/store/getorderbyid.action";
import { listOrdersAction } from "@/modules/commerce/presentation/store/listorders.action";
import { OrderStatus } from "@/shared/domain/enums/order-status.enum";
import { useAppDispatch } from "@/shared/presentation/store/store";

export interface IOrderItemOption {
    value: string;
    label: string;
    code: string;
    secondary: string;
    isArticleType: boolean;
    isVideoType: boolean;
    categoryName: string;
    socialBoost: boolean;
    hasPromotion: boolean;
}

export interface IUsePaidOrderItems {
    options: IOrderItemOption[];
    loading: boolean;
    fetchByCustomer: (customerId?: string) => void;
}

export type ContentKindFilter = "article" | "video";

const formatItemOption = (item: IOrderItemEntity, order: IOrderDetailEntity): IOrderItemOption => ({
    value: item.id,
    code: item.id.slice(0, 8),
    secondary: order.customerName,
    isArticleType: item.isArticleType,
    isVideoType: item.isVideoType,
    categoryName: item.categoryName,
    socialBoost: item.socialBoost,
    hasPromotion: !!item.promotionLevelId,
    label: `${item.categoryName} · ${item.isArticleType ? "Article" : "Vidéo"}`
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
export const usePaidOrderItems = (contentKind?: ContentKindFilter): IUsePaidOrderItems => {
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
                    status: OrderStatus.Paid,
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
                    return detail.items
                        .filter((item) => {
                            if (contentKind === "article") return item.isArticleType;
                            if (contentKind === "video") return item.isVideoType;
                            return true;
                        })
                        .map((item) => formatItemOption(item, detail));
                });

            setOptions(flatItems);
            setLoading(false);
        },
        [dispatch, contentKind]
    );

    return { options, loading, fetchByCustomer };
};
