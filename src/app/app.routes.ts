import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/layout/main-layout/main-layout').then((m) => m.MainLayout),
    children: [
      { path: '', redirectTo: 'manufacturers', pathMatch: 'full' },
      {
        path: 'manufacturers',
        loadChildren: () =>
          import('./features/manufacturers/manufacturers.routes').then(
            (m) => m.MANUFACTURERS_ROUTES,
          ),
      },
    ],
  },
];
