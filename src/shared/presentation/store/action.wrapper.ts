import type { PayloadAction } from "@reduxjs/toolkit";
import type { IUnknownObject } from "@/shared/domain/entities/IUnknownObject";
import type { IApiProblemDetails } from "@/shared/infrastructure/api/type";

/**
 * Standard state shape for async operations returning a single object.
 *
 * @interface IBasicInitialState
 *
 * @template T - The type of data returned by the async operation
 *
 * @property {T} data - The fetched data object
 * @property {boolean} loading - True when async operation is in progress
 * @property {boolean} fetched - True when operation completed successfully at least once
 * @property {IApiProblemDetails | null} error - Error details if operation failed
 */
export interface IBasicInitialState<T = IUnknownObject> {
    data: T;
    loading: boolean;
    fetched: boolean;
    error?: IApiProblemDetails | null;
}

/**
 * Standard state shape for async operations returning a list/array.
 *
 * @interface IBasicInitialStateList
 *
 * @template T - The type of items in the data array
 *
 * @property {T[]} data - The fetched data array
 * @property {boolean} loading - True when async operation is in progress
 * @property {boolean} fetched - True when operation completed successfully at least once
 * @property {Error | null} error - Error details if operation failed
 */
export interface IBasicInitialStateList<T = IUnknownObject> {
    data: T[];
    loading: boolean;
    fetched: boolean;
    error?: Error | null;
}

/**
 * Default initial state for single-object async operations.
 *
 * @constant
 */
export const BasicInitialState: IBasicInitialState = {
    data: {},
    loading: false,
    fetched: false,
    error: null
};

/**
 * Default initial state for list/array async operations.
 *
 * @constant
 */
export const BasicInitialStateList: IBasicInitialStateList = {
    data: [],
    loading: false,
    fetched: false,
    error: null
};

/**
 * Creates a type-safe initial state for async operations.
 *
 * @template T - The type of data returned by the async operation
 * @returns {IBasicInitialState<T>} Type-safe initial state
 *
 * @example
 * ```typescript
 * const authInitialState = {
 *   login: createInitialState<IAuthResponse>(),
 *   logout: createInitialState<IUnknownObject>()
 * };
 * ```
 */
export const createInitialState = <T = IUnknownObject>(): IBasicInitialState<T> => ({
    data: {} as T,
    loading: false,
    fetched: false,
    error: null
});

/**
 * Creates a type-safe initial state for async list operations.
 *
 * @template T - The type of items in the data array
 * @returns {IBasicInitialStateList<T>} Type-safe initial state for lists
 *
 * @example
 * ```typescript
 * const usersInitialState = {
 *   list: createInitialStateList<IUser>()
 * };
 * ```
 */
export const createInitialStateList = <T = IUnknownObject>(): IBasicInitialStateList<T> => ({
    data: [] as T[],
    loading: false,
    fetched: false,
    error: null
});

/**
 * Resets state flags to default values (preserves data).
 *
 * @param {IBasicInitialState} state - The state slice to reset
 */
const resetState = (state: IBasicInitialState): void => {
    state.error = null;
    state.loading = false;
    state.fetched = false;
};

/**
 * Extracts the child store from parent state based on action type.
 *
 * @param {IUnknownObject} state - The parent state object
 * @param {PayloadAction<unknown>} action - The Redux action
 * @returns {IBasicInitialState} The child state slice
 *
 * @remarks
 * Assumes action type format: "sliceName/actionName"
 * Extracts the actionName and uses it as the child store key
 */
const getChildStore = (
    state: IUnknownObject,
    action: PayloadAction<unknown>
): IBasicInitialState => {
    const childStore = action.type.split("/")[1];
    return state[childStore] as IBasicInitialState;
};

/**
 * Reducer handler for async action pending state.
 *
 * @param {IBasicInitialState} state - The state slice to update
 *
 * @remarks
 * Sets loading to true and clears errors.
 * Use with createSlice extraReducers for asyncThunk.pending
 */
export const BasicActionPending = (state: IBasicInitialState): void => {
    resetState(state);
    state.loading = true;
};

/**
 * Reducer handler for async action fulfilled state.
 *
 * @param {IBasicInitialState} state - The state slice to update
 * @param {PayloadAction<IUnknownObject>} action - The action containing response data
 *
 * @remarks
 * Sets fetched to true, clears loading/errors, and stores the payload.
 * Use with createSlice extraReducers for asyncThunk.fulfilled
 */
export const BasicActionFulfilled = (
    state: IBasicInitialState,
    action: PayloadAction<IUnknownObject>
): void => {
    resetState(state);
    state.fetched = true;
    state.data = action.payload;
};

/**
 * Reducer handler for async action rejected state.
 *
 * @param {IBasicInitialState} state - The state slice to update
 * @param {PayloadAction<IUnknownObject>} action - The action containing error details
 *
 * @remarks
 * Stores error payload and clears loading state.
 * Use with createSlice extraReducers for asyncThunk.rejected
 */
export const BasicActionRejected = (
    state: IBasicInitialState,
    action: PayloadAction<IUnknownObject>
): void => {
    resetState(state);
    state.error = action.payload;
};

/**
 * Reducer handler for resetting state to initial values.
 *
 * @param {IBasicInitialState} state - The state slice to reset
 *
 * @remarks
 * Resets all flags and clears data object.
 */
export const BasicResetAction = (state: IBasicInitialState): void => {
    resetState(state);
    state.data = {};
};

/**
 * Wrapper reducer handler for async action pending state in nested slices.
 *
 * @param {IUnknownObject} state - The parent state object
 * @param {PayloadAction<unknown>} action - The action being handled
 *
 * @remarks
 * Automatically extracts child store from action type and sets loading to true.
 * Use this for slices with nested action states (e.g., auth.login, auth.logout).
 *
 * @example
 * ```typescript
 * .addCase(loginAction.pending, ActionWrapperPending)
 * ```
 */
export const ActionWrapperPending = (
    state: IUnknownObject,
    action: PayloadAction<unknown>
): void => {
    const store = getChildStore(state, action);
    resetState(store);
    store.loading = true;
};

/**
 * Wrapper reducer handler for async action fulfilled state in nested slices.
 *
 * @param {IUnknownObject} state - The parent state object
 * @param {PayloadAction<unknown>} action - The action containing response data
 *
 * @remarks
 * Automatically extracts child store and updates it with payload data.
 *
 * @example
 * ```typescript
 * .addCase(loginAction.fulfilled, ActionWrapperFulfilled)
 * ```
 */
export const ActionWrapperFulfilled = (
    state: IUnknownObject,
    action: PayloadAction<unknown>
): void => {
    const store = getChildStore(state, action);
    resetState(store);
    store.fetched = true;
    store.data = action.payload as IUnknownObject;
};

/**
 * Wrapper reducer handler for async action rejected state in nested slices.
 *
 * @param {IUnknownObject} state - The parent state object
 * @param {PayloadAction<unknown>} action - The action containing error details
 *
 * @remarks
 * Automatically extracts child store and updates it with error payload.
 *
 * @example
 * ```typescript
 * .addCase(loginAction.rejected, ActionWrapperRejected)
 * ```
 */
export const ActionWrapperRejected = (
    state: IUnknownObject,
    action: PayloadAction<unknown>
): void => {
    const store = getChildStore(state, action);
    resetState(store);
    store.error = action.payload as Error | IUnknownObject;
};

/**
 * Wrapper reducer handler for resetting a specific child slice.
 *
 * @param {IUnknownObject} state - The parent state object
 * @param {PayloadAction<IUnknownObject>} action - The action with context payload
 *
 * @remarks
 * Expects action.payload.context in format "sliceName/actionName".
 * Resets the child store identified by the action name.
 * Preserves array/object type when clearing data.
 *
 * @example
 * ```typescript
 * // In slice
 * clear: ActionWrapperReset
 *
 * // Usage
 * dispatch(authSlice.actions.clear({ context: 'auth/login' }))
 * ```
 */
export const ActionWrapperReset = (
    state: IUnknownObject,
    action: PayloadAction<IUnknownObject>
): void => {
    const childStore = (action?.payload?.context as string)?.split("/")?.[1];
    if (!childStore || !state[childStore]) return;

    const store = state[childStore] as IBasicInitialState;
    resetState(store);
    store.data = Array.isArray(store.data) ? ([] as unknown as IUnknownObject) : {};
};
