import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { InitializeDeviceUseCase } from "@/platform/session/application/usecases/initialize.device.usecase";
import { DeviceStorageDataSource } from "@/platform/session/infrastructure/data-sources/device.storage.datasource";
import { DeviceRepositoryImpl } from "@/platform/session/infrastructure/repositories/device.repository.impl";
import App from "./App.tsx";
import reportWebVitals from "./reportWebVitals";

import "@/shared/presentation/styles/nprogress.scss";
import "@/shared/presentation/styles/fonts.scss";
import "@/shared/presentation/styles/theme.scss";
import "@/shared/presentation/styles/main.scss";

// Initialize device ID before app renders
const deviceDataSource = new DeviceStorageDataSource();
const deviceRepository = new DeviceRepositoryImpl(deviceDataSource);
const initializeDeviceUseCase = new InitializeDeviceUseCase(deviceRepository);
initializeDeviceUseCase.execute();

const root = document.getElementById("root");

if (root) {
    createRoot(root).render(
        <StrictMode>
            <App />
        </StrictMode>
    );
}

// Start web vitals monitoring
reportWebVitals();
