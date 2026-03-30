import { Empty } from "antd";
import type { ReactNode } from "react";

/**
 * Props for the StateRenderer component.
 *
 * @interface IStateRendererProps
 * @template T - The type of items in the data array
 * @property {boolean} loading - Whether the data is currently loading
 * @property {T[]} data - The data array to render
 * @property {ReactNode} skeleton - Skeleton placeholder shown during loading
 * @property {ReactNode} [empty] - Content shown when data is empty (defaults to Ant Design Empty)
 * @property {(data: T[]) => ReactNode} render - Render function called with the data when available
 */
interface IStateRendererProps<T> {
    loading: boolean;
    data: T[];
    skeleton: ReactNode;
    empty?: ReactNode;
    render: (data: T[]) => ReactNode;
}

/**
 * Generic render-props component for handling loading, empty, and data states.
 *
 * @component
 *
 * @description
 * Eliminates nested ternaries by mapping async data states to the
 * appropriate UI: skeleton during loading, empty state when no data,
 * or the render function when data is available.
 *
 * @template T - The type of items in the data array
 *
 * @example
 * ```tsx
 * <StateRenderer
 *     loading={loading}
 *     data={items}
 *     skeleton={<Skeleton active />}
 *     empty={<Empty description="No items" />}
 *     render={(items) => items.map(item => <ItemCard key={item.id} item={item} />)}
 * />
 * ```
 */
function StateRenderer<T>({ loading, data, skeleton, empty, render }: IStateRendererProps<T>) {
    if (loading) return skeleton;
    if (data.length === 0) return empty ?? <Empty />;

    return render(data);
}

export default StateRenderer;
