import { type FC, Suspense } from "react";
import { Outlet } from "react-router";
import { PageLoader } from "@/shared/presentation/ui/PageLoader";

/**
 * Layout shell for guest (unauthenticated) pages.
 *
 * @component
 *
 * @description
 * Provides a Suspense boundary for lazy-loaded auth pages (login, forgot password).
 * Renders child routes via Outlet with a loading spinner fallback.
 *
 * @returns The auth layout shell
 */
export const AuthLayout: FC = () => (
    <Suspense fallback={<PageLoader />}>
        <Outlet />
    </Suspense>
);
