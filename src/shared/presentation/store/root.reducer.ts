import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/modules/auth/presentation/store";
import catalogReducer from "@/modules/catalog/presentation/store";
import lookupReducer from "@/modules/lookup/presentation/store";
import permissionsReducer from "@/modules/permissions/presentation/store";
import rolesReducer from "@/modules/roles/presentation/store";
import sessionReducer from "@/platform/session/presentation/store";
import settingsReducer from "@/platform/settings/presentation/store";

/**
 * Root reducer combining all feature slices.
 *
 * @remarks
 * Combines all module-specific reducers into a single root reducer.
 * Add new feature reducers here as the application grows.
 *
 */
export const rootReducer = combineReducers({
    auth: authReducer,
    session: sessionReducer,
    settings: settingsReducer,
    roles: rolesReducer,
    permissions: permissionsReducer,
    lookup: lookupReducer,
    catalog: catalogReducer
});

/**
 * Type representing the complete application state tree.
 *
 * @remarks
 * Automatically inferred from the rootReducer.
 * Use this type for:
 * - Typing selectors
 * - Typing thunk getState return value
 * - Accessing state in Redux DevTools
 */
export type IRootState = ReturnType<typeof rootReducer>;
