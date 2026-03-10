import { createReducer, on } from '@ngrx/store';
import { ManufacturersActions } from './manufacturers.actions';
import { initialManufacturersState } from './manufacturers.state';

export const manufacturersReducer = createReducer(
  initialManufacturersState,

  on(ManufacturersActions.loadManufacturers, (state, { page }) => ({
    ...state,
    loading: state.loading + 1,
    error: null,
    currentPage: page,
  })),

  on(ManufacturersActions.loadManufacturersSuccess, (state, { manufacturers, total }) => ({
    ...state,
    manufacturers:
      state.currentPage === 1 ? manufacturers : [...state.manufacturers, ...manufacturers],
    total,
    loading: state.loading > 0 ? state.loading - 1 : state.loading,
    hasMore: total === 100,
  })),

  on(ManufacturersActions.loadManufacturersFailure, (state, { error }) => ({
    ...state,
    loading: state.loading > 0 ? state.loading - 1 : state.loading,
    error,
  })),

  on(ManufacturersActions.loadManufacturerDetail, (state) => ({
    ...state,
    loading: state.loading + 1,
    error: null,
    selectedManufacturer: null,
  })),

  on(ManufacturersActions.loadManufacturerDetailSuccess, (state, { manufacturer }) => ({
    ...state,
    selectedManufacturer: manufacturer,
    loading: state.loading > 0 ? state.loading - 1 : state.loading,
  })),

  on(ManufacturersActions.loadManufacturerDetailFailure, (state, { error }) => ({
    ...state,
    loading: state.loading > 0 ? state.loading - 1 : state.loading,
    error,
  })),

  on(ManufacturersActions.loadManufacturerDetailModel, (state) => ({
    ...state,
    loading: state.loading + 1,
    error: null,
    selectedManufacturerModel: null,
  })),

  on(ManufacturersActions.loadManufacturerDetailModelSuccess, (state, { model }) => ({
    ...state,
    selectedManufacturerModel: model,
    loading: state.loading > 0 ? state.loading - 1 : state.loading,
  })),

  on(ManufacturersActions.loadManufacturerDetailModelFailure, (state, { error }) => ({
    ...state,
    loading: state.loading > 0 ? state.loading - 1 : state.loading,
    error,
  })),

  on(ManufacturersActions.cancelManufacturerDetail, (state) => ({
    ...state,
    loading: 0,
    error: null,
  })),
);
