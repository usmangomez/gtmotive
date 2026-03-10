# GT Motive — Vehicle Manufacturers Explorer

Angular 21 application that consumes the [NHTSA Vehicle API](https://vpic.nhtsa.dot.gov/api/) to browse and inspect vehicle manufacturers.

## Tech Stack

| Layer         | Technology                          |
|---------------|-------------------------------------|
| Framework     | Angular 21 (standalone components)  |
| Build         | Vite                                |
| State         | NgRx (Store + Effects)              |
| UI            | Angular Material 3                  |
| Testing       | Vitest                              |
| Styling       | SCSS                                |

## Project Structure

```
src/app/
├── core/                          # Singleton services & layout shell
│   ├── layout/
│   │   ├── header/                # Top navigation bar
│   │   └── main-layout/          # Shell component (header + router-outlet)
│   └── services/
│       └── manufacturers.ts       # HTTP calls to NHTSA API
│
├── features/
│   └── manufacturers/             # Manufacturers feature
│       ├── models/                # TypeScript interfaces (API contracts)
│       ├── pages/
│       │   ├── manufacturer-list/     # Paginated list view
│       │   └── manufacturer-detail/   # Single manufacturer view
│       └── store/                 # NgRx state management
│           ├── manufacturers.actions.ts
│           ├── manufacturers.state.ts
│           ├── manufacturers.reducer.ts
│           ├── manufacturers.selectors.ts
│           └── manufacturers.effects.ts
│
└── environments/
    └── environments.ts            # API base URL configuration
```

## Architecture Decisions

- **Standalone components** — no NgModules; each component declares its own imports.
- **Lazy-loaded features** — routes and components are loaded on demand via `loadChildren` / `loadComponent`.
- **Core/Features separation** — `core/` holds app-wide singletons (services, layout). `features/` holds domain-specific code scoped by feature.
- **NgRx Redux pattern** — unidirectional data flow: components dispatch actions → effects handle side effects (HTTP) → reducer updates state → selectors expose state slices.
- **Feature-scoped models** — API interfaces live inside the feature that owns them.

## Routing

| Path                      | Component            | Loading    |
|---------------------------|----------------------|------------|
| `/`                       | → redirects to `/manufacturers` | —  |
| `/manufacturers`          | ManufacturerList     | Lazy       |
| `/manufacturers/:id`      | ManufacturerDetail   | Lazy       |

All routes render inside `MainLayout`, which provides the header and content container.

## API

All requests go through the `Manufacturers` service pointing to:

```
https://vpic.nhtsa.dot.gov/api/vehicles
```

| Method                      | Endpoint                                        |
|-----------------------------|------------------------------------------------|
| `getManufacturers(page)`    | `GET /GetAllManufacturers?format=json&page={n}` |
| `getManufacturerDetail(id)` | `GET /GetManufacturerDetails/{id}?format=json`   |

## Getting Started

```bash
npm install
npm start        # dev server at http://localhost:4200
npm run build    # production build
npm test         # run unit tests
```
