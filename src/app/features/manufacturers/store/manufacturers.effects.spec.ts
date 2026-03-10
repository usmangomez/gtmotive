import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, Subject, throwError } from 'rxjs';
import { ManufacturersEffects } from './manufacturers.effects';
import { ManufacturersActions } from './manufacturers.actions';
import { Manufacturers } from '../../../core/services/manufacturers';
import { Action } from '@ngrx/store';

describe('ManufacturersEffects', () => {
  let effects: ManufacturersEffects;
  let actions$: Subject<Action>;
  let manufacturersService: {
    getManufacturers: ReturnType<typeof vi.fn>;
    getManufacturerDetail: ReturnType<typeof vi.fn>;
    getManufacturerDetailModel: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    actions$ = new Subject<Action>();
    manufacturersService = {
      getManufacturers: vi.fn(),
      getManufacturerDetail: vi.fn(),
      getManufacturerDetailModel: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        ManufacturersEffects,
        provideMockActions(() => actions$),
        { provide: Manufacturers, useValue: manufacturersService },
      ],
    });

    effects = TestBed.inject(ManufacturersEffects);
  });

  describe('loadManufacturers$', () => {
    it('should dispatch loadManufacturersSuccess on success', () => {
      const mockResponse = { Results: [{ Mfr_ID: 1 }], Count: 100 };
      manufacturersService.getManufacturers.mockReturnValue(of(mockResponse));

      const results: Action[] = [];
      effects.loadManufacturers$.subscribe((action) => results.push(action));

      actions$.next(ManufacturersActions.loadManufacturers({ page: 1 }));

      expect(results).toHaveLength(1);
      expect(results[0]).toEqual(
        ManufacturersActions.loadManufacturersSuccess({
          manufacturers: mockResponse.Results as any,
          total: 100,
        }),
      );
    });

    it('should dispatch loadManufacturersFailure on error', () => {
      manufacturersService.getManufacturers.mockReturnValue(
        throwError(() => new Error('Network error')),
      );

      const results: Action[] = [];
      effects.loadManufacturers$.subscribe((action) => results.push(action));

      actions$.next(ManufacturersActions.loadManufacturers({ page: 1 }));

      expect(results).toHaveLength(1);
      expect(results[0]).toEqual(
        ManufacturersActions.loadManufacturersFailure({ error: 'Network error' }),
      );
    });
  });

  describe('loadManufacturerDetail$', () => {
    it('should dispatch success on API response', () => {
      const mockManufacturer = { Mfr_ID: 1, Mfr_Name: 'Test' };
      manufacturersService.getManufacturerDetail.mockReturnValue(
        of({ Results: [mockManufacturer] }),
      );

      const results: Action[] = [];
      effects.loadManufacturerDetail$.subscribe((action) => results.push(action));

      actions$.next(ManufacturersActions.loadManufacturerDetail({ id: '1' }));

      expect(results).toHaveLength(1);
      expect(results[0]).toEqual(
        ManufacturersActions.loadManufacturerDetailSuccess({
          manufacturer: mockManufacturer as any,
        }),
      );
    });

    it('should cancel HTTP request when cancelManufacturerDetail is dispatched', () => {
      const httpSubject = new Subject<any>();
      manufacturersService.getManufacturerDetail.mockReturnValue(httpSubject.asObservable());

      const results: Action[] = [];
      effects.loadManufacturerDetail$.subscribe((action) => results.push(action));

      actions$.next(ManufacturersActions.loadManufacturerDetail({ id: '1' }));

      actions$.next(ManufacturersActions.cancelManufacturerDetail());

      httpSubject.next({ Results: [{ Mfr_ID: 1 }] });
      httpSubject.complete();

      expect(results).toHaveLength(0);
    });
  });

  describe('loadManufacturerDetailModel$', () => {
    it('should dispatch success on API response', () => {
      const mockModels = [{ Model_ID: 1, Model_Name: 'Civic' }];
      manufacturersService.getManufacturerDetailModel.mockReturnValue(
        of({ Results: mockModels }),
      );

      const results: Action[] = [];
      effects.loadManufacturerDetailModel$.subscribe((action) => results.push(action));

      actions$.next(ManufacturersActions.loadManufacturerDetailModel({ id: '1' }));

      expect(results).toHaveLength(1);
      expect(results[0]).toEqual(
        ManufacturersActions.loadManufacturerDetailModelSuccess({ model: mockModels as any }),
      );
    });

    it('should cancel HTTP request when cancelManufacturerDetail is dispatched', () => {
      const httpSubject = new Subject<any>();
      manufacturersService.getManufacturerDetailModel.mockReturnValue(httpSubject.asObservable());

      const results: Action[] = [];
      effects.loadManufacturerDetailModel$.subscribe((action) => results.push(action));

      actions$.next(ManufacturersActions.loadManufacturerDetailModel({ id: '1' }));
      actions$.next(ManufacturersActions.cancelManufacturerDetail());

      httpSubject.next({ Results: [{ Model_ID: 1 }] });
      httpSubject.complete();

      expect(results).toHaveLength(0);
    });
  });
});
