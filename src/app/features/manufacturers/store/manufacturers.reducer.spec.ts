import { describe, it, expect } from 'vitest';
import { manufacturersReducer } from './manufacturers.reducer';
import { ManufacturersActions } from './manufacturers.actions';
import { initialManufacturersState, ManufacturersState } from './manufacturers.state';

describe('manufacturersReducer', () => {
  describe('loading counter', () => {
    it('should increment loading on loadManufacturers', () => {
      const state = manufacturersReducer(
        initialManufacturersState,
        ManufacturersActions.loadManufacturers({ page: 1 }),
      );
      expect(state.loading).toBe(1);
    });

    it('should increment loading on loadManufacturerDetail', () => {
      const state = manufacturersReducer(
        initialManufacturersState,
        ManufacturersActions.loadManufacturerDetail({ id: '1' }),
      );
      expect(state.loading).toBe(1);
    });

    it('should increment loading on loadManufacturerDetailModel', () => {
      const state = manufacturersReducer(
        initialManufacturersState,
        ManufacturersActions.loadManufacturerDetailModel({ id: '1' }),
      );
      expect(state.loading).toBe(1);
    });

    it('should track multiple concurrent requests', () => {
      let state: ManufacturersState = initialManufacturersState;
      state = manufacturersReducer(state, ManufacturersActions.loadManufacturerDetail({ id: '1' }));
      state = manufacturersReducer(
        state,
        ManufacturersActions.loadManufacturerDetailModel({ id: '1' }),
      );
      expect(state.loading).toBe(2);
    });

    it('should decrement loading on success', () => {
      const loadedState: ManufacturersState = { ...initialManufacturersState, loading: 2 };

      const state = manufacturersReducer(
        loadedState,
        ManufacturersActions.loadManufacturerDetailSuccess({
          manufacturer: { Mfr_ID: 1, Mfr_Name: 'Test' } as any,
        }),
      );
      expect(state.loading).toBe(1);
    });

    it('should decrement loading on failure', () => {
      const loadedState: ManufacturersState = { ...initialManufacturersState, loading: 2 };

      const state = manufacturersReducer(
        loadedState,
        ManufacturersActions.loadManufacturerDetailFailure({ error: 'error' }),
      );
      expect(state.loading).toBe(1);
    });

    it('should never go below zero on success', () => {
      const state = manufacturersReducer(
        initialManufacturersState,
        ManufacturersActions.loadManufacturerDetailSuccess({
          manufacturer: { Mfr_ID: 1, Mfr_Name: 'Test' } as any,
        }),
      );
      expect(state.loading).toBe(0);
    });

    it('should never go below zero on failure', () => {
      const state = manufacturersReducer(
        initialManufacturersState,
        ManufacturersActions.loadManufacturerDetailFailure({ error: 'error' }),
      );
      expect(state.loading).toBe(0);
    });
  });

  describe('cancelManufacturerDetail', () => {
    it('should reset loading to 0', () => {
      const loadedState: ManufacturersState = { ...initialManufacturersState, loading: 2 };

      const state = manufacturersReducer(
        loadedState,
        ManufacturersActions.cancelManufacturerDetail(),
      );
      expect(state.loading).toBe(0);
    });

    it('should clear error', () => {
      const errorState: ManufacturersState = {
        ...initialManufacturersState,
        loading: 1,
        error: 'some error',
      };

      const state = manufacturersReducer(
        errorState,
        ManufacturersActions.cancelManufacturerDetail(),
      );
      expect(state.error).toBeNull();
    });

    it('should be safe to call when loading is already 0', () => {
      const state = manufacturersReducer(
        initialManufacturersState,
        ManufacturersActions.cancelManufacturerDetail(),
      );
      expect(state.loading).toBe(0);
      expect(state.error).toBeNull();
    });

    it('should simulate: detail page load then cancel before completion', () => {
      let state: ManufacturersState = initialManufacturersState;

      state = manufacturersReducer(state, ManufacturersActions.loadManufacturerDetail({ id: '1' }));
      state = manufacturersReducer(
        state,
        ManufacturersActions.loadManufacturerDetailModel({ id: '1' }),
      );
      expect(state.loading).toBe(2);

      state = manufacturersReducer(state, ManufacturersActions.cancelManufacturerDetail());
      expect(state.loading).toBe(0);
    });
  });

  describe('loadManufacturersSuccess', () => {
    it('should replace manufacturers on page 1', () => {
      const existing: ManufacturersState = {
        ...initialManufacturersState,
        manufacturers: [{ Mfr_ID: 1 } as any],
        currentPage: 1,
        loading: 1,
      };

      const state = manufacturersReducer(
        existing,
        ManufacturersActions.loadManufacturersSuccess({
          manufacturers: [{ Mfr_ID: 2 } as any],
          total: 100,
        }),
      );

      expect(state.manufacturers).toHaveLength(1);
      expect(state.manufacturers[0].Mfr_ID).toBe(2);
    });

    it('should append manufacturers on page > 1', () => {
      const existing: ManufacturersState = {
        ...initialManufacturersState,
        manufacturers: [{ Mfr_ID: 1 } as any],
        currentPage: 2,
        loading: 1,
      };

      const state = manufacturersReducer(
        existing,
        ManufacturersActions.loadManufacturersSuccess({
          manufacturers: [{ Mfr_ID: 2 } as any],
          total: 100,
        }),
      );

      expect(state.manufacturers).toHaveLength(2);
    });
  });
});
