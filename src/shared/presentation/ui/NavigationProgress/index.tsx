import nprogress from "nprogress";
import { useEffect } from "react";

/**
 * Navigation progress bar component for route transitions.
 *
 * @component
 *
 * @description
 * Displays an nprogress loading bar during route navigation.
 * Automatically starts the progress bar when navigation begins
 * and completes it when navigation finishes.
 *
 * @remarks
 * - Uses react-router's useLocation hook to detect route changes
 * - Works with BrowserRouter (not data routers)
 * - nprogress must be imported in main.tsx for styling
 *
 */
export const NavigationProgress = () => {
    useEffect(() => {
        nprogress.configure({
            speed: 800,
            easing: "ease",
            trickle: false,
            showSpinner: true,
            trickleSpeed: 200
        });
    }, []);

    useEffect(() => {
        nprogress.start();

        const timer = setTimeout(() => {
            nprogress.done();
        }, 300);

        return () => {
            clearTimeout(timer);
            nprogress.done();
        };
    }, []);

    return null;
};
