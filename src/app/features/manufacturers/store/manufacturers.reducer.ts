import { createReducer, on } from '@ngrx/store';
import { ManufacturersActions } from './manufacturers.actions';
import { initialManufacturersState } from './manufacturers.state';

export const manufacturersReducer = createReducer(
  initialManufacturersState,

  on(ManufacturersActions.loadManufacturers, (state, { page }) => ({
    ...state,
    loading: true,
    error: null,
    currentPage: page,
  })),

  on(ManufacturersActions.loadManufacturersSuccess, (state, { manufacturers, total }) => ({
    ...state,
    manufacturers,
    total,
    loading: false,
  })),

  on(ManufacturersActions.loadManufacturersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ManufacturersActions.loadManufacturerDetail, (state) => ({
    ...state,
    loading: true,
    error: null,
    selectedManufacturer: null,
  })),

  on(ManufacturersActions.loadManufacturerDetailSuccess, (state, { manufacturer }) => ({
    ...state,
    selectedManufacturer: manufacturer,
    loading: false,
  })),

  on(ManufacturersActions.loadManufacturerDetailFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
