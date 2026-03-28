import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import fr from "dayjs/locale/fr";
import relativeTime from "dayjs/plugin/relativeTime";
import { type FC, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, useRoutes } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/core/presentation/store/store";
import { Theme } from "@/shared/lib/constants/theme";
import { NavigationProgress } from "@/shared/ui/NavigationProgress";
import { PageLoader } from "@/shared/ui/PageLoader";
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
                        <AppRoutes />
                    </BrowserRouter>
                </ConfigProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;
