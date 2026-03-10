import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Manufacturer, ManufacturerDetail } from '../models/manufacturer';

export const ManufacturersActions = createActionGroup({
  source: 'Manufacturers',
  events: {
    'Load Manufacturers': props<{ page: number }>(),
    'Load Manufacturers Success': props<{ manufacturers: Manufacturer[]; total: number }>(),
    'Load Manufacturers Failure': props<{ error: string }>(),

    'Load Manufacturer Detail': props<{ id: number }>(),
    'Load Manufacturer Detail Success': props<{ manufacturer: ManufacturerDetail }>(),
    'Load Manufacturer Detail Failure': props<{ error: string }>(),
  },
});
