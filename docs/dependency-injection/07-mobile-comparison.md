# Mobile get_it vs Dashboard Awilix — Comparison & Findings

This document compares how DI is handled in the **mobile app** (Flutter / get_it)
and evaluates whether the same modular pattern can be achieved in the
**dashboard** (TypeScript / Awilix).

---

## How the Mobile App Organises DI

The mobile app uses [get_it](https://pub.dev/packages/get_it) v9.2.0 with a
**per-module registration** pattern.

### Per-module registration functions

Each feature module exports a function that registers its own dependencies:

```
lib/
  modules/auth/infrastructure/dependencies/auth.dependencies.dart
  platform/session/infrastructure/dependencies/session.dependencies.dart
  modules/settings/infrastructure/dependencies/settings.dependencies.dart
  modules/preferences/infrastructure/dependencies/preferences.dependencies.dart
  platform/device-info/infrastructure/dependencies/device-info.dependencies.dart
  platform/country/infrastructure/dependencies/country.dependencies.dart
  platform/connectivity/infrastructure/dependencies/connectivity.dependencies.dart
```

Each file follows the same signature:

```dart
Future<void> registerAuthDependencies(GetIt sl) async {
  // Data sources
  sl.registerSingleton<IAuthRemoteDataSource>(AuthRemoteDataSource(sl<Api116>()));

  // Repositories
  sl.registerSingleton<IAuthCachedRepository>(AuthCachedRepository(...));

  // Use cases (factory = fresh instance per resolve)
  sl.registerFactory<SignInUseCase>(() => SignInUseCase(sl<IAuthCachedRepository>()));

  // BLoCs (factory)
  sl.registerFactory<SignInBloc>(() => SignInBloc(sl<SignInUseCase>(), ...));
}
```

### Shared container linking all modules

`ServiceLocator.initialize()` in `service.locator.dart` acts as the composition
root. It creates the global `GetIt` instance, registers core infrastructure, then
calls each module's registration function **in dependency order**:

```dart
final GetIt sl = GetIt.instance;

class ServiceLocator {
  static Future<void> initialize() async {
    // 1. Core infrastructure (storage, local data sources)
    // 2. Session dependencies (secure storage, token repos)
    // 3. Device info dependencies
    // 4. HTTP client + interceptors (uses resolved data sources)
    // 5. Auth dependencies
    // 6. Settings dependencies
    // 7. Preferences dependencies
    // 8. Country dependencies
    // 9. Connectivity dependencies
  }
}
```

### Lifetime strategy in mobile

| Registration method | Lifetime | Used for |
|---|---|---|
| `registerSingleton()` | Eager singleton | Data sources, repositories, HTTP client |
| `registerLazySingleton()` | Lazy singleton | Expensive plugins (DeviceInfoPlugin) |
| `registerFactory()` | Transient (new each time) | Use cases, BLoCs |

### Decorator pattern

The mobile app uses repository decoration for caching:

```
AuthRemoteRepository  (hits API)
       |
AuthCachedRepository  (wraps remote, adds cache layer)
       |
Registered as IAuthCachedRepository
```

---

## Can We Achieve the Same Pattern with Awilix?

**Yes.** Every get_it concept has a direct Awilix equivalent.

### Concept mapping

| Mobile (get_it) | Dashboard (Awilix) |
|---|---|
| `GetIt.instance` | `createContainer()` — single root container |
| `sl.registerSingleton<T>(instance)` | `asClass(Class).singleton()` or `asValue(instance)` |
| `sl.registerLazySingleton<T>(() => ...)` | `asFunction(fn).singleton()` — Awilix singletons are lazy by default |
| `sl.registerFactory<T>(() => ...)` | `asClass(Class).transient()` or `asFunction(fn).transient()` |
| `sl<IAuthRepository>()` (type-based) | `container.cradle.authRepository` (name-based) |
| Per-module `registerXxxDependencies(sl)` | Per-module `registerXxxDependencies(container)` |
| `ServiceLocator.initialize()` | Root `container.ts` calling all module functions |

### Lifetime parity

| Mobile | Awilix | Notes |
|---|---|---|
| `registerSingleton` | `.singleton()` | Awilix singletons are lazy (resolved on first access), not eager |
| `registerLazySingleton` | `.singleton()` | Same as above — no distinction needed |
| `registerFactory` | `.transient()` | Fresh instance every resolve |
| _(no equivalent)_ | `.scoped()` | Awilix adds scoped lifetime for request-level caching |

### Resolution difference

get_it resolves by **type**: `sl<IAuthRepository>()`.
Awilix resolves by **name**: `container.cradle.authRepository`.

This is not a limitation — TypeScript provides full type safety via cradle type
inference:

```ts
const container = createContainer().register({
  authRepository: asClass(AuthRepositoryImpl).singleton(),
});

container.cradle.authRepository  // TypeScript knows this is AuthRepositoryImpl
container.cradle.typo            // TypeScript error
```

### Circular dependency advantage

Awilix's PROXY injection mode resolves dependencies lazily through the cradle
proxy. Dependencies are not instantiated during registration — only when first
accessed. This naturally breaks the circular dependency chain documented in
[01-problem.md](./01-problem.md), without requiring manual ordering.

get_it requires careful registration order to avoid resolving unregistered
dependencies.

---

## Proposed Modular Structure for the Dashboard

Mirror the mobile pattern by splitting registrations into per-module files:

```
src/shared/infrastructure/di/
  container.ts                    ← composition root (like ServiceLocator)
  auth.dependencies.ts            ← auth data sources, repos, use cases
  session.dependencies.ts         ← session data sources, repos, use cases
  settings.dependencies.ts        ← settings data sources, repos, use cases
```

### Per-module registration file

```ts
// src/shared/infrastructure/di/auth.dependencies.ts
import { AwilixContainer, asClass } from "awilix";
import { AuthRepositoryImpl } from "@/modules/auth/infrastructure/repositories/auth.repository";
import { LoginUseCase } from "@/modules/auth/application/use-cases/login.use-case";
// ...other imports

export function registerAuthDependencies(container: AwilixContainer): void {
  container.register({
    // Repositories
    authRepository: asClass(AuthRepositoryImpl).singleton(),

    // Use cases
    loginUseCase:          asClass(LoginUseCase).transient(),
    forgotPasswordUseCase: asClass(ForgotPasswordUseCase).transient(),
    verifyOtpUseCase:      asClass(VerifyOtpUseCase).transient(),
    resendOtpUseCase:      asClass(ResendOtpUseCase).transient(),
    resetPasswordUseCase:  asClass(ResetPasswordUseCase).transient(),
    signOutUseCase:        asClass(SignOutUseCase).transient(),
    signOutAllUseCase:     asClass(SignOutAllUseCase).transient(),
  });
}
```

### Composition root

```ts
// src/shared/infrastructure/di/container.ts
import { createContainer, InjectionMode } from "awilix";
import { registerAuthDependencies } from "./auth.dependencies";
import { registerSessionDependencies } from "./session.dependencies";
import { registerSettingsDependencies } from "./settings.dependencies";

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
  strict: true,
});

// Core infrastructure (data sources)
// registered first, just like ServiceLocator.initialize()
registerCoreDependencies(container);

// Feature modules — order does not matter thanks to lazy PROXY resolution
registerAuthDependencies(container);
registerSessionDependencies(container);
registerSettingsDependencies(container);

export default container;
```

---

## Summary

| Aspect | Feasible? | Notes |
|---|---|---|
| Per-module registration files | Yes | Functions that accept the container, same as get_it |
| Shared root container linking modules | Yes | Single `container.ts` calls all module registrations |
| Singleton repositories | Yes | `.singleton()` — lazy by default |
| Transient use cases | Yes | `.transient()` — new instance per resolve |
| Decorator pattern (cached repos) | Yes | Manual wiring via `.inject()` or factory functions |
| Type-safe resolution | Yes | Cradle type inference with `InferCradleFromResolvers` |
| Circular dependency handling | Better | PROXY mode breaks cycles that get_it cannot |
| Scoped lifetime (per-request) | Bonus | Awilix adds `createScope()` which get_it lacks |

**Conclusion:** Awilix can replicate the mobile get_it modular DI pattern
one-to-one, with the added benefits of lazy proxy resolution (breaking circular
dependencies) and scoped lifetimes.
