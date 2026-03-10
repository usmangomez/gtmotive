import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, takeUntil } from 'rxjs';
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

  private readonly cancelDetail$ = this.actions$.pipe(
    ofType(ManufacturersActions.cancelManufacturerDetail),
  );

  loadManufacturerDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ManufacturersActions.loadManufacturerDetail),
      switchMap(({ id }) =>
        this.manufacturersService.getManufacturerDetail(id).pipe(
          takeUntil(this.cancelDetail$),
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

  loadManufacturerDetailModel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ManufacturersActions.loadManufacturerDetailModel),
      switchMap(({ id }) =>
        this.manufacturersService.getManufacturerDetailModel(id).pipe(
          takeUntil(this.cancelDetail$),
          map((response) =>
            ManufacturersActions.loadManufacturerDetailModelSuccess({
              model: response.Results,
            }),
          ),
          catchError((error) =>
            of(ManufacturersActions.loadManufacturerDetailModelFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
}
