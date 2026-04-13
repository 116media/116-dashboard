import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import fr from "dayjs/locale/fr";
import relativeTime from "dayjs/plugin/relativeTime";
import { type FC, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, useRoutes } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import { Theme } from "@/shared/infrastructure/constants/theme";
import { persistor, store } from "@/shared/presentation/store/store";
import { NavigationProgress } from "@/shared/presentation/ui/NavigationProgress";
import { PageLoader } from "@/shared/presentation/ui/PageLoader";
import SessionExpiredModal from "@/shared/presentation/ui/SessionExpiredModal";
import { routes } from "./routes";

const AppRoutes: FC = () => useRoutes(routes);

const App: FC = () => {
    useEffect(() => {
        dayjs.locale(fr);
        dayjs.extend(relativeTime);
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={<PageLoader />} persistor={persistor}>
                <ConfigProvider theme={Theme}>
                    <BrowserRouter>
                        <NavigationProgress />
                        <SessionExpiredModal />
                        <AppRoutes />
                    </BrowserRouter>
                </ConfigProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;
