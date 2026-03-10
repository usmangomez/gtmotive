import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Manufacturers } from '../../../core/services/manufacturers';
import { ManufacturersActions } from './manufacturers.actions';

@Injectable()
export class ManufacturersEffects {
  private readonly actions$ = inject(Actions);
  private readonly manufacturersService = inject(Manufacturers);

  loadManufacturers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ManufacturersActions.loadManufacturers),
      switchMap(({ page }) =>
        this.manufacturersService.getManufacturers(page).pipe(
          map((response) =>
            ManufacturersActions.loadManufacturersSuccess({
              manufacturers: response.Results,
              total: response.Count,
            }),
          ),
          catchError((error) =>
            of(ManufacturersActions.loadManufacturersFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  loadManufacturerDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ManufacturersActions.loadManufacturerDetail),
      switchMap(({ id }) =>
        this.manufacturersService.getManufacturerDetail(id).pipe(
          map((response) =>
            ManufacturersActions.loadManufacturerDetailSuccess({
              manufacturer: response.Results[0],
            }),
          ),
          catchError((error) =>
            of(ManufacturersActions.loadManufacturerDetailFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
}
