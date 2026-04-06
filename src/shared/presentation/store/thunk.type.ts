import type { Action, ThunkAction } from "@reduxjs/toolkit";
import type { IRootState } from "./root.reducer";
import type { store } from "./store";

/**
 * Type-safe dispatch function that supports async thunks.
 *
 * @remarks
 * Inferred from the store instance to ensure type safety with all middleware.
 * Use this type with useDispatch hook for proper TypeScript inference.
 *
 * @example
 * ```typescript
 * const dispatch: AppDispatch = useDispatch();
 * ```
 */
export type AppDispatch = typeof store.dispatch;

/**
 * Base type for Redux Thunk actions.
 *
 * @remarks
 * - Returns void by default
 * - Has access to IRootState
 * - Can dispatch any Action
 *
 * @example
 * ```typescript
 * const myThunk: AppThunk = () => (dispatch, getState) => {
 *   const state = getState();
 *   dispatch(someAction());
 * };
 * ```
 */
export type AppThunk = ThunkAction<void, IRootState, null, Action>;
