import { combineReducers } from "@reduxjs/toolkit";
import articlesReducer from "@/modules/articles/presentation/store";
import authReducer from "@/modules/auth/presentation/store";
import catalogReducer from "@/modules/catalog/presentation/store";
import commerceReducer from "@/modules/commerce/presentation/store";
import lookupReducer from "@/modules/lookup/presentation/store";
import lyricsReducer from "@/modules/lyrics/presentation/store";
import permissionsReducer from "@/modules/permissions/presentation/store";
import rolesReducer from "@/modules/roles/presentation/store";
import shortsReducer from "@/modules/shorts/presentation/store";
import videosReducer from "@/modules/videos/presentation/store";
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
    catalog: catalogReducer,
    commerce: commerceReducer,
    articles: articlesReducer,
    videos: videosReducer,
    shorts: shortsReducer,
    lyrics: lyricsReducer
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
