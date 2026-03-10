import {
  Manufacturer,
  ManufacturerDetail,
  ModelDetail,
} from '../models/manufacturer';

export interface ManufacturersState {
  manufacturers: Manufacturer[];
  selectedManufacturer: ManufacturerDetail | null;
  selectedManufacturerModel: ModelDetail[] | null;
  total: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
  hasMore?: boolean;
}

export const initialManufacturersState: ManufacturersState = {
  manufacturers: [],
  selectedManufacturer: null,
  selectedManufacturerModel: null,
  total: 0,
  currentPage: 1,
  loading: false,
  error: null,
  hasMore: true,
};
