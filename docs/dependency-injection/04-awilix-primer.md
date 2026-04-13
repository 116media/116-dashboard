# Awilix Primer — Key Concepts Applied to This Project

## What Is Awilix?

Awilix is a DI container for JavaScript/TypeScript. You **register** classes or
factories into it, and then **resolve** them when needed. Awilix handles instantiation
and injects the right dependencies automatically based on constructor parameter names.

No decorators. No annotations. No `reflect-metadata`. Just plain classes and functions.

---

## Core Concepts

### 1. The Container

```ts
import { createContainer } from "awilix";

const container = createContainer({ injectionMode: "PROXY" });
```

The container is a registry. You tell it what exists and how to create it.
It does not create anything until you ask for it.

---

### 2. Registration

You register a class with `asClass`, a factory function with `asFunction`,
or a plain value with `asValue`.

```ts
import { asClass, asValue } from "awilix";

container.register({
  authRepository:    asClass(AuthRepositoryImpl).singleton(),
  loginUseCase:      asClass(LoginUseCase).transient(),
  apiUrl:            asValue("https://api.example.com"),
});
```

---

### 3. Resolution

You ask the container for a registered name and it returns a fully-wired instance.

```ts
const useCase = container.cradle.loginUseCase;
// Awilix instantiates LoginUseCase and injects authRepository automatically
```

The `cradle` is a proxy — accessing any property on it triggers a `resolve()` call.

---

### 4. Injection Modes

**PROXY mode** (what we use): Awilix passes a single proxy object to the constructor.
The class destructures the dependencies it needs by name.

```ts
// LoginUseCase receives the cradle proxy as its constructor argument
class LoginUseCase {
  constructor({ authRepository }) {   // ← name must match registration key
    this.authRepository = authRepository;
  }
}
```

This is already how the use cases work — they accept a repository via constructor.
The only change is that Awilix provides the repository instead of the action file doing
`new LoginUseCase(new AuthRepositoryImpl())`.

---

### 5. Lifetimes

| Lifetime | Behavior | Use for |
|----------|----------|---------|
| `SINGLETON` | Created once, cached forever | Repositories, data sources |
| `TRANSIENT` | New instance every resolve | Use cases |
| `SCOPED` | One per scope (not used here) | Request-scoped values in servers |

```ts
asClass(AuthRepositoryImpl).singleton()   // cached after first resolve
asClass(LoginUseCase).transient()         // new instance every time
```

---

### 6. Why PROXY Breaks the Circular Dependency

With `PROXY` injection mode, Awilix passes a **lazy proxy** to the constructor — not
the actual resolved value. The repository is only pulled from the proxy when the use
case method is actually called, not when the use case is instantiated.

More importantly: the `container.ts` file imports all the classes at the top, but
**`createContainer()` and `register()` do not call `new` on anything**. The actual
`new AuthRepositoryImpl()` only happens the first time something calls
`container.cradle.authRepository`.

This means the cycle:

```
action.ts → AuthRepositoryImpl → apiClient → interceptor → SessionRepositoryImpl → apiClient
```

...no longer forms at **module evaluation time**. By the time `container.cradle` is
first accessed (inside a Redux thunk, when a user clicks something), all modules are
fully loaded and initialized. The cycle is effectively deferred past the point where
it would cause a `ReferenceError`.

---

## How Awilix Fits Clean Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Domain Layer                                           │
│  (entities, errors, interfaces)                         │
│  → No Awilix dependency                                 │
├─────────────────────────────────────────────────────────┤
│  Application Layer                                      │
│  (use cases, repository ports)                          │
│  → Use cases accept deps via constructor                │
│  → No Awilix dependency                                 │
├─────────────────────────────────────────────────────────┤
│  Infrastructure Layer                                   │
│  (repository impls, API client, storage)                │
│  → Impls may accept deps via constructor                │
│  → No Awilix dependency                                 │
├─────────────────────────────────────────────────────────┤
│  Composition Root  ← This is where Awilix lives         │
│  src/shared/infrastructure/container.ts                 │
│  → Only file that imports Awilix                        │
│  → Only file that imports concrete classes              │
│  → Wires everything together                            │
├─────────────────────────────────────────────────────────┤
│  Presentation Layer                                     │
│  (Redux actions, React components)                      │
│  → Imports container, resolves use cases by name        │
│  → Never imports concrete repository/use case classes   │
└─────────────────────────────────────────────────────────┘
```

The key principle: **only the composition root knows about concrete implementations**.
Everything else depends on interfaces or resolves from the container by name.

---

## Before vs After — Import Comparison

### Action file — before

```ts
import { AuthRepositoryImpl } from "@/modules/auth/.../auth.repository.impl";
import { ForgotPasswordUseCase } from "@/modules/auth/.../forgotpassword.usecase";
// ↑ imports two concrete classes — couples presentation to infrastructure
```

### Action file — after

```ts
import container from "@/shared/infrastructure/container";
// ↑ imports only the container — presentation layer is fully decoupled
```

---

## Installing Awilix

```bash
npm install awilix
```

No additional packages needed. Awilix ships with TypeScript declarations built in.
No `reflect-metadata` or `tsconfig` decorators required.
