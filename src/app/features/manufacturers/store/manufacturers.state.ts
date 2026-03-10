import { Manufacturer, ManufacturerDetail } from '../models/manufacturer';

export interface ManufacturersState {
  manufacturers: Manufacturer[];
  selectedManufacturer: ManufacturerDetail | null;
  total: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
}

export const initialManufacturersState: ManufacturersState = {
  manufacturers: [],
  selectedManufacturer: null,
  total: 0,
  currentPage: 1,
  loading: false,
  error: null,
};
