import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { ManufacturersActions } from '../../store/manufacturers.actions';
import {
  selectManufacturersLoading,
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
export class ManufacturerDetail implements OnInit, OnDestroy {
  vehicleId = input<string>();

  private readonly store = inject(Store);

  public readonly manufacturer$ = this.store.select(selectSelectedManufacturer);
  public readonly model$ = this.store.select(selectSelectedManufacturerModel);
  public readonly loading$ = this.store.select(selectManufacturersLoading);

  ngOnInit() {
    const id = this.vehicleId();
    if (!id) return;

    this.store
      .select(selectSelectedManufacturer)
      .pipe(take(1))
      .subscribe((existing) => {
        if (!existing || existing.Mfr_ID.toString() !== id) {
          this.store.dispatch(ManufacturersActions.loadManufacturerDetail({ id }));
          this.store.dispatch(ManufacturersActions.loadManufacturerDetailModel({ id }));
        }
      });
  }

  ngOnDestroy() {
    this.store.dispatch(ManufacturersActions.cancelManufacturerDetail());
  }
}
