import { inject, Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import {
  ManufacturerDetailResponse,
  ManufacturerResponse,
} from '../../features/manufacturers/models/manufacturer';

@Injectable({
  providedIn: 'root',
})
export class Manufacturers {
  private readonly apiUrl: string = `${environments.apiUrl}/vehicles`;

  private readonly http = inject(HttpClient);

  getManufacturers(page: number = 1) {
    return this.http.get<ManufacturerResponse>(
      `${this.apiUrl}/GetAllManufacturers?format=json&page=${page}`,
    );
  }

  getManufacturerDetail(id: string) {
    return this.http.get<ManufacturerDetailResponse>(
      `${this.apiUrl}/GetManufacturerDetails/${id}?format=json`,
    );
  }
}
