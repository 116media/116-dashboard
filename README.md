# 116-dashboard

116 (Cent-Seize) is a bold digital platform that promotes music and hip-hop culture in DR and beyond. Through articles, video shows, and exclusive behind-the-scenes content, it connects fans with artists, highlights emerging talent, and tells the stories shaping the culture.

This is the admin dashboard built with React 19, TypeScript, Vite, Ant Design 6, and Redux Toolkit.

## Getting Started

### Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- IDE: [Visual Studio Code](https://code.visualstudio.com/)

### Quick Setup

```bash
# Install dependencies
yarn install

# Start the dev server
yarn dev
```

### Available Scripts

| Command              | Description                          |
| -------------------- | ------------------------------------ |
| `yarn dev`           | Start the development server         |
| `yarn build`         | Build for production                 |
| `yarn preview`       | Preview the production build locally |
| `yarn lint:code`     | Lint code with Biome                 |
| `yarn lint:code:fix` | Lint and auto-fix with Biome         |
| `yarn lint:types`    | Type-check with TypeScript           |
| `yarn api:generate`  | Regenerate API types from Swagger    |

## Development Workflow

1. Create a feature branch following the [naming conventions](#branch-naming)
2. Make your changes, code will be auto-formatted on save
3. Commit changes following [conventional commit](https://www.conventionalcommits.org/) format
4. Push to remote and create a pull request

## Code Formatting

This project uses [Biome](https://biomejs.dev/) for linting and formatting.

### Biome Configuration

Biome handles formatting and general linting with these settings:

- Indentation: 4 spaces
- Line endings: LF
- Line width: 100 characters
- Double quotes
- Semicolons always
- No trailing commas
- Auto organize imports on save

### VS Code Setup

The project includes `.vscode/settings.json` with auto-format on save enabled. Install the [Biome extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) for the best experience.

### Manual Commands

```bash
# Lint and fix all files
yarn lint:code:fix

# Type-check without emitting
yarn lint:types
```

## Architecture

The dashboard follows Clean Architecture with feature-based module organization:

```text
src/
  modules/
    articles/        # Article management
    videos/          # Video management
    shorts/          # Short video (reels) management
    lyrics/          # Lyrics management
    commerce/        # Orders, payments, packages
    auth/            # Authentication
    ...
  shared/
    domain/          # Shared entities, types, results
    application/     # Shared use cases, interfaces
    infrastructure/  # API client, mappers, service locator
    presentation/    # Shared UI components, hooks, store
```

Each module follows the same layered structure:

- **domain/** : Entities, enums, value objects
- **application/** : Use cases, repository ports
- **infrastructure/** : Repository implementations, mappers, DI registration
- **presentation/** : Components, hooks, store (Redux), constants, validators

## Code Style Standards

The project enforces:

- Indentation: 4 spaces
- Line endings: LF (Unix-style)
- Encoding: UTF-8
- Trailing whitespace: Automatically trimmed
- Final newline: Automatically added
- Import organization: Automatic via Biome

## Git Workflow

This project follows the same branching strategy as the rest of the 116 platform. See the [backend README](../backend/README.md) for the full workflow documentation.

### Branch Naming

Pattern: `^(feat|chore|bug|fix|doc|docs|style|refactor|perf|test|build|ci|revert)-[a-z]+(-[a-z]+)*$`

Examples:

- `feat-lyrics-delete`
- `fix-file-uploader`
- `chore-update-dependencies`

## Tech Stack

| Category         | Technology             |
| ---------------- | ---------------------- |
| Framework        | React 19               |
| Language         | TypeScript 5           |
| Build Tool       | Vite                   |
| UI Library       | Ant Design 6           |
| State Management | Redux Toolkit          |
| DI Container     | Awilix                 |
| Linting          | Biome                  |
| API Client       | Axios (generated)      |
| Package Manager  | Yarn                   |
