import type { DotLottieReactProps } from "@lottiefiles/dotlottie-react";

/**
 * Lottie animation utility functions.
 *
 * @description
 * Helper functions for configuring DotLottie React animations.
 */
export const LottieUtils = {
    /**
     * Creates standard Lottie animation configuration.
     *
     * @param {string} animationPath - Path to the .lottie animation file
     * @returns {DotLottieReactProps} Configuration object for DotLottieReact component
     *
     * @description
     * Returns a configuration with:
     * - Looping enabled
     * - Autoplay enabled
     * - Freeze on offscreen for performance
     * - Auto-resize enabled
     * - Fill layout mode
     */
    options: (animationPath: string): DotLottieReactProps => ({
        loop: true,
        autoplay: true,
        src: animationPath,
        backgroundColor: "transparent",
        renderConfig: {
            freezeOnOffscreen: true,
            autoResize: true,
            quality: 5
        },
        layout: {
            fit: "fill"
        }
    })
};
