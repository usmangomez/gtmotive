import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ManufacturersState } from './manufacturers.state';

export const selectManufacturersState = createFeatureSelector<ManufacturersState>('manufacturers');

export const selectManufacturers = createSelector(
  selectManufacturersState,
  (state) => state.manufacturers,
);

export const selectSelectedManufacturer = createSelector(
  selectManufacturersState,
  (state) => state.selectedManufacturer,
);

export const selectManufacturersLoading = createSelector(
  selectManufacturersState,
  (state) => state.loading,
);

export const selectManufacturersError = createSelector(
  selectManufacturersState,
  (state) => state.error,
);

export const selectManufacturersTotal = createSelector(
  selectManufacturersState,
  (state) => state.total,
);

export const selectManufacturersCurrentPage = createSelector(
  selectManufacturersState,
  (state) => state.currentPage,
);

export const selectManufacturersHasMore = createSelector(
  selectManufacturersState,
  (state) => state.hasMore,
);
