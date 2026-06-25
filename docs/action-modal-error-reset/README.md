# Action Modal — error reset on close

How every confirmation modal clears its backend error when dismissed, so a failure from one
action never leaks into the next modal that opens.

---

## The problem

Every confirmation dialog in the dashboard wraps the shared
[`ActionModal`](../../../src/shared/presentation/ui/ActionModal/index.tsx) and shows a backend
`Failure` via `ErrorAlert`. That `error` comes from a **Redux** slice (e.g.
`catalog.setExclusiveCategory.error`), not from local state.

Redux state outlives the modal. So after an action fails:

1. The slice keeps `error` set.
2. The user closes the modal.
3. The user opens **any** confirm modal backed by the same hook (a different row, even a
   different action) — and the **stale error is still there**, shown immediately.

This affects all confirm modals because they share the same component and the same
"error-from-redux" wiring.

## The fix

Clear the Redux error **at the source** when the modal finishes closing, using antd `Modal`'s
[`afterClose`](https://ant.design/components/modal#api) lifecycle callback.

- `afterClose` fires once, after the close animation completes — the right moment to reset.
- We reset in Redux (not by hiding the error in the view) so the source of truth is clean and
  nothing can re-surface it.
- The error stays visible while the modal is open (a real failure is still shown); it is cleared
  only after dismissal.

### 1. Shared mechanism — `ActionModal` (one place)

`ActionModal` exposes an optional `onAfterClose` and forwards it to antd:

```tsx
export interface IActionModalProps {
    // ...existing...
    onAfterClose?: () => void;
}

<Modal
    centered
    open={open}
    title={title}
    footer={null}
    onCancel={onCancel}
    afterClose={onAfterClose}
>
    <ErrorAlert error={error} banner showIcon closable={false} />
    {/* ... */}
</Modal>
```

### 2. Per-module reset — the actions hook

Each module's actions hook exposes a `resetActionError` that dispatches the existing
`reset*Action` thunks for the slices it aggregates into `error`:

```ts
// e.g. UseCategoryActions.ts
const resetActionError = () => {
    dispatch(resetActivateCategoryAction());
    dispatch(resetDeactivateCategoryAction());
    dispatch(resetSetExclusiveCategoryAction());
};

return { loading, error, onActivate, onDeactivate, onSetExclusive, resetActionError };
```

> The hook resets exactly the slices it reads for `error`. Workflow hooks
> (`useArticleWorkflow`, `useVideoWorkflow`) reset all their workflow action slices.

### 3. Per-module passthrough — the wrapper modal

The module's `*ActionModal` / `*WorkflowModal` accepts `onAfterClose` and forwards it:

```tsx
interface ICategoryActionModalProps {
    // ...
    onAfterClose?: () => void;
}

<ActionModal /* ... */ onAfterClose={onAfterClose} />
```

### 4. Per-module wiring — the container

```tsx
<CategoryActionModal
    /* ... */
    onCancel={() => modals.setActionOpen(false)}
    onAfterClose={actions.resetActionError}
/>
```

## Flow

```
close modal → antd afterClose → resetActionError() → slice error = null → next open is clean
```

## Why not gate the error in the view?

A purely local "only show errors that arrived after open" gate works, but it leaves the stale
error sitting in Redux and re-implements lifecycle logic the modal already has. Resetting the
source via `afterClose` is simpler to reason about and keeps the store consistent for anything
else observing that slice.

## Where this is applied (every `ActionModal` consumer)

| Module | Wrapper | Actions/workflow hook |
| --- | --- | --- |
| Catalog | `CategoryActionModal`, `PackageActionModal` | `UseCategoryActions`, `UsePackageActions` |
| Shorts | `ShortActionModal` | `UseShortActions` |
| Articles | `ArticleWorkflowModal` | `UseArticleWorkflow` |
| Videos | `VideoWorkflowModal` | `UseVideoWorkflow` |
| Roles | `RoleActionModal` | `UseRoleActions` |
| Permissions | `PermissionActionModal` | `UsePermissionActions` |
| Lookup | `ContentTypeActionModal`, `PromotionLevelActionModal`, `PricingTierActionModal`, `TagActionModal` | respective lookup action hooks |
| Lyrics | `LyricsActionModal` | `UseLyricsActions` |
| Commerce | `OrderActionModal` | `UseOrderActions` |

## Checklist when adding a new action modal

1. Render it through the shared `ActionModal`.
2. Add `onAfterClose?` to the wrapper and forward it to `ActionModal`.
3. Expose `resetActionError` from the actions hook (dispatch the slice `reset*Action`s).
4. Wire `onAfterClose={actions.resetActionError}` in the container.
