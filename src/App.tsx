import { App as AntApp, ConfigProvider, Empty } from "antd";
import dayjs from "dayjs";
import fr from "dayjs/locale/fr";
import relativeTime from "dayjs/plugin/relativeTime";
import { type FC, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, useRoutes } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import { Theme } from "@/shared/presentation/constants/theme";
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
                <ConfigProvider
                    theme={Theme}
                    renderEmpty={() => <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} />}
                >
                    <AntApp>
                        <BrowserRouter>
                            <NavigationProgress />
                            <SessionExpiredModal />
                            <AppRoutes />
                        </BrowserRouter>
                    </AntApp>
                </ConfigProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;
