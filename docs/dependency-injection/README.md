# Dependency Injection — Overview

This directory documents the migration from **manual dependency wiring** to a proper
**Awilix-based DI container** in the dashboard application.

## Documents

| File | Description |
|------|-------------|
| [01-problem.md](./01-problem.md) | The problem we are solving — circular deps, module-level instantiation |
| [02-current-state.md](./02-current-state.md) | How dependencies are wired today |
| [03-target-state.md](./03-target-state.md) | How it will look after Awilix is introduced |
| [04-awilix-primer.md](./04-awilix-primer.md) | Awilix concepts applied to this project |
| [05-container-design.md](./05-container-design.md) | Container structure, registration strategy, lifetime decisions |
| [06-awilix-package.md](./06-awilix-package.md) | Awilix package documentation (full API reference) |
| [07-mobile-comparison.md](./07-mobile-comparison.md) | Mobile get_it vs Awilix — comparison & feasibility findings |
| [PROGRESS.md](./PROGRESS.md) | Migration TODO tracker |
