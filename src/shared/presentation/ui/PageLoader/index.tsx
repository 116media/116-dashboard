import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { FC } from "react";
import skeleton from "@/assets/lottie/skeleton_anim.lottie";
import { LottieUtils } from "@/shared/presentation/utils/lottie/lottie.utils";

import styles from "./index.module.scss";

/**
 * Main page loader component for layouts.
 *
 * @component
 *
 * @description
 * Displays a skeleton loading animation during page transitions
 * and state rehydration. Used as Suspense fallback in layout shells
 * and Redux PersistGate loading state.
 *
 * @returns The loading skeleton animation
 */
export const PageLoader: FC = () => {
    const lottieOptions = LottieUtils.options(skeleton);

    return (
        <div className={styles.pageLoader}>
            <DotLottieReact className={styles.pageLoader__lottie} {...lottieOptions} />
        </div>
    );
};
