import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  Manufacturer,
  ManufacturerDetail,
  ModelDetail,
} from '../models/manufacturer';

export const ManufacturersActions = createActionGroup({
  source: 'Manufacturers',
  events: {
    'Load Manufacturers': props<{ page: number }>(),
    'Load Manufacturers Success': props<{ manufacturers: Manufacturer[]; total: number }>(),
    'Load Manufacturers Failure': props<{ error: string }>(),

    'Load Manufacturer Detail': props<{ id: string }>(),
    'Load Manufacturer Detail Success': props<{ manufacturer: ManufacturerDetail }>(),
    'Load Manufacturer Detail Failure': props<{ error: string }>(),

    'Load Manufacturer Detail Model': props<{ id: string }>(),
    'Load Manufacturer Detail Model Success': props<{ model: ModelDetail[] }>(),
    'Load Manufacturer Detail Model Failure': props<{ error: string }>(),

    'Cancel Manufacturer Detail': emptyProps(),
  },
});
