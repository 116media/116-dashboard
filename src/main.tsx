import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import container from "@/shared/infrastructure/service.locator.ts";
import App from "./App.tsx";
import reportWebVitals from "./reportWebVitals";

import "@/shared/presentation/styles/nprogress.scss";
import "@/shared/presentation/styles/fonts.scss";
import "@/shared/presentation/styles/theme.scss";
import "@/shared/presentation/styles/main.scss";

// Initialize device ID before app renders
container.cradle.initializeDeviceUseCase.execute();

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
