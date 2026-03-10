# GT Motive — Vehicle Manufacturers Explorer

Angular 21 application that consumes the [NHTSA Vehicle API](https://vpic.nhtsa.dot.gov/api/) to browse and inspect vehicle manufacturers, their details, and vehicle models.

## Tech Stack

| Layer         | Technology                          |
|---------------|-------------------------------------|
| Framework     | Angular 21 (standalone components)  |
| Build         | Vite                                |
| State         | NgRx (Store + Effects)              |
| UI            | Angular Material 3                  |
| Testing       | Vitest 4 + Angular TestBed          |
| Styling       | SCSS                                |

## Project Structure

```
src/app/
├── core/                              # Singleton services & layout shell
│   ├── layout/
│   │   ├── header/                    # Top navigation bar
│   │   └── main-layout/              # Shell component (header + router-outlet)
│   └── services/
│       └── manufacturers.ts           # HTTP calls to NHTSA API
│
├── features/
│   └── manufacturers/                 # Manufacturers feature
│       ├── components/
│       │   ├── manufacturer-cards/    # Card grid for manufacturer list
│       │   ├── vehicle-type-card/     # Vehicle type display card
│       │   └── vehicle-model-card/    # Vehicle model display card
│       ├── models/                    # TypeScript interfaces (API contracts)
│       ├── pages/
│       │   ├── manufacturer-list/     # Paginated list with search & infinite scroll
│       │   └── manufacturer-detail/   # Single manufacturer view with models
│       └── store/                     # NgRx state management
│           ├── manufacturers.actions.ts
│           ├── manufacturers.state.ts
│           ├── manufacturers.reducer.ts
│           ├── manufacturers.selectors.ts
│           └── manufacturers.effects.ts
│
├── shared/
│   └── components/
│       └── input/                     # Reusable Material input component
│
└── environments/
    └── environments.ts                # API base URL configuration
```

## Architecture Decisions

- **Standalone components** — no NgModules; each component declares its own imports.
- **Lazy-loaded features** — routes and components are loaded on demand via `loadChildren` / `loadComponent`.
- **Core/Features/Shared separation** — `core/` holds app-wide singletons (services, layout). `features/` holds domain-specific code scoped by feature. `shared/` holds reusable UI components.
- **NgRx Redux pattern** — unidirectional data flow: components dispatch actions → effects handle side effects (HTTP) → reducer updates state → selectors expose state slices.
- **Counter-based loading** — a numeric `loading` counter in state tracks concurrent HTTP requests, converted to a boolean via selector. A `cancelManufacturerDetail` action resets the counter and aborts in-flight requests on navigation away, preventing stale loading states.
- **Route param binding** — uses `withComponentInputBinding()` so route params are passed directly as component inputs.
- **Infinite scroll** — `IntersectionObserver` triggers pagination when the scroll anchor becomes visible.

## Routing

| Path                        | Component            | Loading |
|-----------------------------|----------------------|---------|
| `/`                         | → redirects to `/manufacturers` | — |
| `/manufacturers`            | ManufacturerList     | Lazy    |
| `/manufacturers/:vehicleId` | ManufacturerDetail   | Lazy    |

All routes render inside `MainLayout`, which provides the header and content container.

## API

All requests go through the `Manufacturers` service pointing to:

```
https://vpic.nhtsa.dot.gov/api/vehicles
```

| Method                           | Endpoint                                          |
|----------------------------------|---------------------------------------------------|
| `getManufacturers(page)`         | `GET /GetAllManufacturers?format=json&page={n}`   |
| `getManufacturerDetail(id)`      | `GET /GetManufacturerDetails/{id}?format=json`    |
| `getManufacturerDetailModel(id)` | `GET /GetModelsForMakeId/{id}?format=json`        |

## State Management

The manufacturers feature uses a single NgRx store slice:

```typescript
{
  manufacturers: Manufacturer[]        // loaded list (accumulated across pages)
  selectedManufacturer: ManufacturerDetail | null
  selectedManufacturerModel: ModelDetail[] | null
  total: number
  currentPage: number
  loading: number                      // concurrent request counter
  error: string | null
  hasMore: boolean
}
```

**Actions:** `loadManufacturers`, `loadManufacturerDetail`, `loadManufacturerDetailModel` (each with Success/Failure variants), and `cancelManufacturerDetail`.

**Effects** use `switchMap` for request deduplication and `takeUntil(cancelDetail$)` on detail/model effects to abort HTTP calls when the user navigates away.

## Testing

Tests use **Vitest 4** with Angular TestBed. Coverage includes:

- **Reducer tests** — loading counter increment/decrement, cancel reset, pagination logic, edge cases (never below zero)
- **Effects tests** — success/failure dispatching, HTTP cancellation on `cancelManufacturerDetail`
- **Component smoke tests** — creation tests for all components with proper mocks (MockStore, IntersectionObserver, FormControl host)

```bash
npm test              # run all tests
npm test -- --watch   # watch mode
```

## Getting Started

```bash
npm install
npm start             # dev server at http://localhost:4200
npm run build         # production build
npm test              # run unit tests
```
