import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { manufacturersReducer } from './features/manufacturers/store/manufacturers.reducer';
import { provideEffects } from '@ngrx/effects';
import { ManufacturersEffects } from './features/manufacturers/store/manufacturers.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideStore({ manufacturers: manufacturersReducer }),
    provideEffects(ManufacturersEffects),
  ],
};
