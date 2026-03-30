# The Problem — Why We Need a DI Container

## The Root Issue: Module-Level Instantiation

Every action file in the dashboard currently instantiates its repository and use case
**at module load time**, before any function is called:

```ts
// modules/auth/presentation/store/forgotpassword.action.ts
import { AuthRepositoryImpl } from "@/modules/auth/infrastructure/repositories/auth.repository.impl";
import { ForgotPasswordUseCase } from "@/modules/auth/application/usecases/forgotpassword.usecase";

// ❌ Instantiated when the file is first imported — not when the action runs
const authRepository = new AuthRepositoryImpl();
const forgotPasswordUseCase = new ForgotPasswordUseCase(authRepository);
```

This pattern has two serious consequences.

---

## Problem 1: Circular Dependencies → Runtime Crash

The module import graph forms a cycle:

```
forgotpassword.action.ts
  └─ imports AuthRepositoryImpl
       └─ imports apiClient  (from client.ts)
            └─ imports accessTokenExpiryInterceptor
                 └─ imports SessionRepositoryImpl
                      └─ imports apiClient  (from client.ts)  ← CYCLE
```

JavaScript's module system evaluates files in order. When a cycle exists, some modules
are not fully initialized when another module tries to use them. The result:

```
Uncaught ReferenceError: Cannot access 'AuthRepositoryImpl' before initialization
    at forgotpassword.action.ts:10:24
```

This crash happens whenever a page imports an action file that is part of this cycle —
which includes the Settings page, any Auth page, and any page that touches Sessions.

---

## Problem 2: Duplicate Repository Instances

Because each action file creates its own `new AuthRepositoryImpl()`, the app ends up with
**7 separate instances** of `AuthRepositoryImpl` — one per auth action file. The same
problem applies to `SettingsRepositoryImpl` (instantiated twice).

These instances all point to the same `apiClient`, so functionally they work, but:

- There is no single source of truth for the repository instance
- It is impossible to swap out an implementation (e.g. for testing) without touching
  every action file
- Any state held in a repository instance would not be shared across actions

---

## Problem 3: Untestable Architecture

Because dependencies are created inside the module scope (not injected), unit testing
an action thunk requires either:

1. Mocking the entire module (`vi.mock(...)`) — fragile and couples tests to internals
2. Reaching into module internals — not possible cleanly with TypeScript

With a DI container the repository can be swapped for a mock by re-registering it in
the container before the test runs — no module mocking required.

---

## Summary

| Problem | Current state | After Awilix |
|---------|--------------|--------------|
| Circular deps crash | `ReferenceError` at runtime | Resolved — lazy resolution breaks the cycle |
| Duplicate instances | 7× `AuthRepositoryImpl`, 2× `SettingsRepositoryImpl` | 1 singleton each |
| Testability | Requires `vi.mock` at module level | Swap in the container per test |
| Wiring scattered | 11 action files each wire their own deps | One container file owns all wiring |
