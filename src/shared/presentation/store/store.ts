import { configureStore } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
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
import { encryptTransform } from "redux-persist-transform-encrypt";
import { LOGIN_PATH } from "@/shared/presentation/constants/paths";
import type { IRootState } from "./root.reducer";
import { rootReducer } from "./root.reducer";
import type { AppDispatch } from "./thunk.type";

const isDevMode = import.meta.env.DEV;

/**
 * AES-256 encryption transform for redux-persist.
 *
 * @description
 * Encrypts persisted state before writing to localStorage and decrypts on rehydration.
 * If decryption fails (tampered data), clears all auth data and redirects to login.
 */
const encryptor = encryptTransform({
    secretKey: import.meta.env.VITE_PERSIST_SECRET_KEY,
    onError: () => {
        persistor.purge();
        window.location.href = LOGIN_PATH;
    }
});

/**
 * Redux Persist configuration object.
 *
 * @remarks
 * - Persists only whitelisted reducers to browser localStorage
 * - Uses AES-256 encryption via redux-persist-transform-encrypt
 * - Uses version 1 for migration compatibility
 * - Currently whitelisted: ["auth"]
 * - Other slices are transient and reset on page reload
 */
const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ["auth", "session"],
    transforms: [encryptor]
};

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer);

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

/**
 * Type-safe selector hook for accessing Redux state.
 *
 * @returns Typed selector with IRootState inference
 *
 * @example
 * ```typescript
 * const user = useAppSelector((state) => state.session.currentUser.data);
 * ```
 */
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
