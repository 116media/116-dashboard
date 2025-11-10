import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import logger from "redux-logger";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    persistReducer,
    persistStore,
    REGISTER,
    REHYDRATE
} from "redux-persist";
import storage from "redux-persist/es/storage";
import { rootReducer } from "./root.reducer";
import type { AppDispatch } from "./thunk.type";

const isDevMode = import.meta.env.DEV;

/**
 * Redux Persist configuration object.
 *
 * @remarks
 * - Persists only whitelisted reducers to browser localStorage
 * - Uses version 1 for migration compatibility
 * - Currently whitelisted: ["users"]
 * - Other slices are transient and reset on page reload
 */
const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ["auth"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Configured Redux store instance.
 *
 * @remarks
 * Features:
 * - Redux DevTools enabled in development mode only
 * - Redux Logger middleware active in development
 * - Serializable check configured to ignore redux-persist actions
 * - Supports async thunks and middleware chaining
 */
export const store = configureStore({
    devTools: isDevMode,
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat(isDevMode ? [logger] : [])
});

/**
 * Redux Persistor instance for managing persistence lifecycle.
 *
 * @remarks
 * Used with PersistGate component to delay app rendering until
 * persisted state is rehydrated from localStorage.
 *
 * @see {@link https://github.com/rt2zz/redux-persist#persistgate}
 */
export const persistor = persistStore(store);

/**
 * Type-safe dispatch hook for Redux actions.
 *
 * @returns {AppDispatch} Typed dispatch function that supports async thunks
 *
 * @example
 * ```typescript
 * function LoginComponent() {
 *   const dispatch = useAppDispatch();
 *
 *   const handleLogin = async () => {
 *     const result = await dispatch(loginAction(credentials));
 *     if (loginAction.fulfilled.match(result)) {
 *       // Handle success
 *     }
 *   };
 * }
 * ```
 */
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
