import type { FC } from "react";
import type { ResizeCallbackData } from "react-resizable";
import { Resizable } from "react-resizable";

import styles from "./index.module.scss";

/**
 * Props for the ResizableTitle component.
 *
 * @interface IResizableTitleProps
 * @property {number} [width] - Current column width
 * @property {(e: React.SyntheticEvent, data: ResizeCallbackData) => void} [onResize] - Resize handler
 */
interface IResizableTitleProps extends React.HTMLAttributes<HTMLTableCellElement> {
    width?: number;
    onResize?: (e: React.SyntheticEvent, data: ResizeCallbackData) => void;
}

/**
 * Resizable table header cell.
 *
 * @component
 *
 * @description
 * Wraps a `<th>` element in a `Resizable` container from
 * `react-resizable`, allowing users to drag the right edge
 * to resize columns. Falls back to a plain `<th>` when no
 * width is provided.
 *
 * @param {IResizableTitleProps} props - Component props
 * @returns {JSX.Element} A resizable or plain table header cell
 */
const ResizableTitle: FC<IResizableTitleProps> = ({ width, onResize, ...rest }) => {
    if (!width) return <th {...rest} />;

    return (
        <Resizable
            axis="x"
            height={0}
            width={width}
            onResize={onResize}
            minConstraints={[80, 0]}
            maxConstraints={[800, 0]}
            draggableOpts={{ enableUserSelectHack: false }}
            handle={
                <button
                    type="button"
                    aria-label="Resize column"
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    className={styles.resizableTable__handle}
                />
            }
        >
            <th {...rest} />
        </Resizable>
    );
};

export default ResizableTitle;
