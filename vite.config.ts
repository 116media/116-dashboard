import path from "path";
import checker from "vite-plugin-checker";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        react(),
        checker({
            typescript: { tsconfigPath: "./tsconfig.app.json" },
            biome: { command: "check" }
        })
    ],
    assetsInclude: ["**/*.lottie"],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    },
    build: {
        rolldownOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules/react") || id.includes("node_modules/react-dom") || id.includes("node_modules/react-router")) {
                        return "vendor-react";
                    }
                    if (id.includes("node_modules/antd") || id.includes("node_modules/@ant-design")) {
                        return "vendor-antd";
                    }
                    if (id.includes("node_modules/@reduxjs") || id.includes("node_modules/react-redux")) {
                        return "vendor-redux";
                    }
                    if (id.includes("node_modules/@tiptap")) {
                        return "vendor-editor";
                    }
                    if (id.includes("node_modules/plyr")) {
                        return "vendor-plyr";
                    }
                    if (id.includes("node_modules/google-libphonenumber")) {
                        return "vendor-phone";
                    }
                }
            }
        }
    }
});
