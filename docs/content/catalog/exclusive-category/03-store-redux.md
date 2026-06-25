# 03 — Redux Store

The catalog slice follows a strict pattern: one `ActionType`, one state key, one async thunk,
and three `addCase` entries (pending/fulfilled/rejected) per action. Add two new actions.

## 1. Action types

**File:** `src/modules/catalog/presentation/store/constants.ts`

```ts
SetExclusiveCategory: "catalog/setExclusiveCategory",
UploadCategoryPoster: "catalog/uploadCategoryPoster",
```

## 2. State shape

**File:** `src/modules/catalog/presentation/store/type.ts`

```ts
setExclusiveCategory: IBasicInitialState<ICategoryEntity>;
uploadCategoryPoster: IBasicInitialState<ICategoryEntity>;
```

**File:** `src/modules/catalog/presentation/store/state.ts`

```ts
setExclusiveCategory: createInitialState<ICategoryEntity>(),
uploadCategoryPoster: createInitialState<ICategoryEntity>(),
```

## 3. Async thunks

**Files:** `setexclusivecategory.action.ts`, `uploadcategoryposter.action.ts` (new, in `store/`)

```ts
export const setExclusiveCategoryAction = createAsyncThunk<ICategoryEntity, string, { rejectValue: Failure }>(
    ActionType.SetExclusiveCategory,
    async (id, { rejectWithValue }) => {
        const result = await container.cradle.setExclusiveCategoryUseCase.execute(id);
        if (!result.ok) return rejectWithValue(result.error);
        return result.value;
    },
);

export const uploadCategoryPosterAction = createAsyncThunk<
    ICategoryEntity,
    { id: string; data: IUploadCategoryPosterCredentials },
    { rejectValue: Failure }
>(ActionType.UploadCategoryPoster, async ({ id, data }, { rejectWithValue }) => {
    const result = await container.cradle.uploadCategoryPosterUseCase.execute({ id, data });
    if (!result.ok) return rejectWithValue(result.error);
    return result.value;
});
```

## 4. Slice reducers

**File:** `src/modules/catalog/presentation/store/index.ts`

Add the standard three cases per action, using the shared `ActionWrapper*` helpers:

```ts
.addCase(setExclusiveCategoryAction.pending, ActionWrapperPending)
.addCase(setExclusiveCategoryAction.fulfilled, ActionWrapperFulfilled)
.addCase(setExclusiveCategoryAction.rejected, ActionWrapperRejected)
.addCase(uploadCategoryPosterAction.pending, ActionWrapperPending)
.addCase(uploadCategoryPosterAction.fulfilled, ActionWrapperFulfilled)
.addCase(uploadCategoryPosterAction.rejected, ActionWrapperRejected)
```

> Add both new state keys to any `CatalogStateKey` union used by the `purge` reducer so the
> screens can reset them.

## TODO

- [ ] Add `SetExclusiveCategory` + `UploadCategoryPoster` to `ActionType`
- [ ] Add both keys to `ICatalogState` (`type.ts`) and `catalogInitialState` (`state.ts`)
- [ ] Create `setexclusivecategory.action.ts` and `uploadcategoryposter.action.ts` thunks
- [ ] Wire 6 `addCase` entries into the catalog slice
- [ ] Add both keys to the `purge` union
