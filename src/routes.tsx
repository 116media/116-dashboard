import { lazy } from "react";
import type { RouteObject } from "react-router";
import { Navigate } from "react-router";
import {
    ADMIN_PATH,
    ADS_BANNER_PATH,
    ADS_POPUP_PATH,
    ARTICLE_PATH,
    CONTENT_PATH,
    FORGOT_PASSWORD_PATH,
    LOGIN_PATH,
    NOT_FOUND_PATH,
    OVERVIEW_PATH,
    PERMISSIONS_PATH,
    REFERENCES_PATH,
    ROLES_PATH,
    SETTING_PATH,
    USER_PATH,
    VIDEO_PATH
} from "@/shared/presentation/constants/paths";
import { PermissionRoute } from "@/shared/presentation/guards/PermissionRoute";
import { RouteGuard } from "@/shared/presentation/guards/RouteGuard";
import { AuthLayout } from "@/shared/presentation/layouts/AuthLayout";
import { DashboardLayout } from "@/shared/presentation/layouts/DashboardLayout";
import { NotFoundPage } from "@/shared/presentation/pages/NotFoundPage";

const LoginPage = lazy(() => import("@/modules/auth/presentation/pages/LoginPage"));
const ForgotPasswordPage = lazy(
    () => import("@/modules/auth/presentation/pages/ForgotPasswordPage")
);
const OverviewPage = lazy(() => import("@/modules/overview/presentation/pages/OverviewPage"));
const SettingsPage = lazy(() => import("@/platform/settings/presentation/pages/SettingsPage"));
const ContentsPage = lazy(() => import("@/modules/contents/presentation/pages/ContentsPage"));
const VideosPage = lazy(() => import("@/modules/videos/presentation/pages/VideosPage"));
const ArticlesPage = lazy(() => import("@/modules/articles/presentation/pages/ArticlesPage"));
const AdsBannerPage = lazy(() => import("@/modules/ads/presentation/pages/AdsBannerPage"));
const AdsPopupPage = lazy(() => import("@/modules/ads/presentation/pages/AdsPopupPage"));
const AdminsPage = lazy(() => import("@/modules/users/presentation/pages/AdminsPage"));
const UsersPage = lazy(() => import("@/modules/users/presentation/pages/UsersPage"));
const RolesPage = lazy(() => import("@/modules/roles/presentation/pages/RolesPage"));
const PermissionsPage = lazy(
    () => import("@/modules/permissions/presentation/pages/PermissionsPage")
);
const LookupPage = lazy(() => import("@/modules/lookup/presentation/pages/LookupPage"));

const guestRoutes: RouteObject[] = [
    {
        element: <RouteGuard type="guest" />,
        children: [
            {
                element: <AuthLayout />,
                children: [
                    { path: LOGIN_PATH, element: <LoginPage /> },
                    { path: FORGOT_PASSWORD_PATH, element: <ForgotPasswordPage /> }
                ]
            }
        ]
    }
];

const protectedRoutes: RouteObject[] = [
    {
        element: <RouteGuard type="protected" />,
        children: [
            {
                element: <DashboardLayout />,
                children: [
                    { path: OVERVIEW_PATH, element: <OverviewPage /> },
                    { path: `${SETTING_PATH}/:tab?`, element: <SettingsPage /> },
                    {
                        element: (
                            <PermissionRoute
                                permissions={[{ resource: "contents", action: "read" }]}
                            />
                        ),
                        children: [{ path: CONTENT_PATH, element: <ContentsPage /> }]
                    },
                    {
                        element: (
                            <PermissionRoute
                                permissions={[{ resource: "videos", action: "read" }]}
                            />
                        ),
                        children: [{ path: VIDEO_PATH, element: <VideosPage /> }]
                    },
                    {
                        element: (
                            <PermissionRoute
                                permissions={[{ resource: "articles", action: "read" }]}
                            />
                        ),
                        children: [{ path: ARTICLE_PATH, element: <ArticlesPage /> }]
                    },
                    {
                        element: (
                            <PermissionRoute permissions={[{ resource: "ads", action: "read" }]} />
                        ),
                        children: [
                            { path: ADS_BANNER_PATH, element: <AdsBannerPage /> },
                            { path: ADS_POPUP_PATH, element: <AdsPopupPage /> }
                        ]
                    },
                    {
                        element: (
                            <PermissionRoute
                                permissions={[{ resource: "admins", action: "read" }]}
                            />
                        ),
                        children: [{ path: ADMIN_PATH, element: <AdminsPage /> }]
                    },
                    {
                        element: (
                            <PermissionRoute
                                permissions={[{ resource: "users", action: "read" }]}
                            />
                        ),
                        children: [{ path: USER_PATH, element: <UsersPage /> }]
                    },
                    {
                        element: (
                            <PermissionRoute
                                permissions={[{ resource: "roles", action: "read" }]}
                            />
                        ),
                        children: [{ path: ROLES_PATH, element: <RolesPage /> }]
                    },
                    {
                        element: (
                            <PermissionRoute
                                permissions={[{ resource: "permissions", action: "read" }]}
                            />
                        ),
                        children: [{ path: PERMISSIONS_PATH, element: <PermissionsPage /> }]
                    },
                    {
                        element: (
                            <PermissionRoute
                                permissions={[{ resource: "content-types", action: "read" }]}
                                mode="some"
                            />
                        ),
                        children: [{ path: `${REFERENCES_PATH}/:tab?`, element: <LookupPage /> }]
                    }
                ]
            }
        ]
    }
];

const errorRoutes: RouteObject[] = [
    { path: NOT_FOUND_PATH, element: <NotFoundPage /> },
    { path: "*", element: <Navigate to={NOT_FOUND_PATH} replace /> }
];

export const routes: RouteObject[] = [...guestRoutes, ...protectedRoutes, ...errorRoutes];
