import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import fr from "dayjs/locale/fr";
import relativeTime from "dayjs/plugin/relativeTime";
import { type FC, Suspense, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import { AuthLayoutLoading } from "@/core/presentation/layouts/AuthLayout/AuthLayout.Loading";
import { NotFoundPage } from "@/core/presentation/pages/NotFoundPage";
import { persistor, store } from "@/core/presentation/store/store";
import ForgotPasswordPage from "@/modules/auth/presentation/pages/ForgotPasswordPage";
import LoginPage from "@/modules/auth/presentation/pages/LoginPage";
import { FORGOT_PASSWORD_PATH, LOGIN_PATH } from "@/shared/lib/constants/paths";
import { Theme } from "@/shared/lib/constants/theme";
import { NavigationProgress } from "@/shared/ui/NavigationProgress";

const App: FC = () => {
    /**
     * Initialize Day.js configuration on mount.
     *
     * @remarks
     * Sets French as default locale and enables relative time formatting
     * (e.g., "il y a 2 heures", "dans 3 jours").
     */
    useEffect(() => {
        dayjs.locale(fr);
        dayjs.extend(relativeTime);
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={<AuthLayoutLoading />} persistor={persistor}>
                <ConfigProvider theme={Theme}>
                    <BrowserRouter>
                        <NavigationProgress />
                        <Suspense fallback={<AuthLayoutLoading />}>
                            <Routes>
                                <Route path={LOGIN_PATH} element={<LoginPage />} />
                                <Route
                                    path={FORGOT_PASSWORD_PATH}
                                    element={<ForgotPasswordPage />}
                                />
                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                        </Suspense>
                    </BrowserRouter>
                </ConfigProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;
