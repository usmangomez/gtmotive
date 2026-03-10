import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { manufacturersReducer } from './features/manufacturers/store/manufacturers.reducer';
import { provideEffects } from '@ngrx/effects';
import { ManufacturersEffects } from './features/manufacturers/store/manufacturers.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({ manufacturers: manufacturersReducer }),
    provideEffects(ManufacturersEffects),
  ],
};
