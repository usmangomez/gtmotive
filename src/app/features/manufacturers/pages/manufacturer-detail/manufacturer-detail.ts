import { Component, inject, input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ManufacturersActions } from '../../store/manufacturers.actions';
import {
  selectSelectedManufacturer,
  selectSelectedManufacturerModel,
} from '../../store/manufacturers.selectors';
import { AsyncPipe } from '@angular/common';
import { VehicleTypeCard } from '../../components/vehicle-type-card/vehicle-type-card';
import { VehicleModelCard } from '../../components/vehicle-model-card/vehicle-model-card';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-manufacturer-detail',
  imports: [AsyncPipe, VehicleTypeCard, VehicleModelCard, RouterLink, MatIcon],
  templateUrl: './manufacturer-detail.html',
  styleUrl: './manufacturer-detail.scss',
})
export class ManufacturerDetail implements OnInit {
  vehicleId = input<string>();

  private readonly store = inject(Store);

  public readonly manufacturer$ = this.store.select(selectSelectedManufacturer);
  public readonly model$ = this.store.select(selectSelectedManufacturerModel);

  ngOnInit() {
    if (this.vehicleId()) {
      this.store.dispatch(ManufacturersActions.loadManufacturerDetail({ id: this.vehicleId()! }));
      this.store.dispatch(
        ManufacturersActions.loadManufacturerDetailModel({ id: this.vehicleId()! }),
      );
    }
  }
}
