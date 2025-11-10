import type { FC } from "react";
import { APP_NAME } from "@/shared/lib/constants/common";
import { DASHBOARD_PATH } from "@/shared/lib/constants/paths";

/**
 * Props for the Logo component.
 *
 * @interface ILogoProps
 * @property {boolean} canRedirect - Whether the logo should redirect to dashboard when clicked
 * @property {string | undefined} className - CSS class name for styling the logo
 */
interface ILogoProps {
    canRedirect?: boolean;
    className: string | undefined;
}

/**
 * Application logo component with optional navigation.
 *
 * @component
 *
 * @description
 * Renders the application logo as a styled div. Can optionally wrap
 * the logo in a link to navigate to the dashboard.
 *
 * @returns The logo element, optionally wrapped in a link
 */
export const Logo: FC<ILogoProps> = ({ className, canRedirect = false }) =>
    canRedirect ? (
        <a aria-label={`${APP_NAME}-logo`} href={DASHBOARD_PATH}>
            <div className={className} />
        </a>
    ) : (
        <div className={className} />
    );
