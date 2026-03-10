import { Routes } from '@angular/router';

export const MANUFACTURERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/manufacturer-list/manufacturer-list').then((m) => m.ManufacturerList),
  },
  {
    path: ':vehicleId',
    loadComponent: () =>
      import('./pages/manufacturer-detail/manufacturer-detail').then((m) => m.ManufacturerDetail),
  },
];
