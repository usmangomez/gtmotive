import { Component, inject, input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ManufacturersActions } from '../../store/manufacturers.actions';
import { selectSelectedManufacturer } from '../../store/manufacturers.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-manufacturer-detail',
  imports: [AsyncPipe],
  templateUrl: './manufacturer-detail.html',
  styleUrl: './manufacturer-detail.scss',
})
export class ManufacturerDetail implements OnInit {
  vehicleId = input<string>();

  private readonly store = inject(Store);

  public readonly manufacturer$ = this.store.select(selectSelectedManufacturer);

  ngOnInit() {
    if (this.vehicleId()) {
      this.store.dispatch(ManufacturersActions.loadManufacturerDetail({ id: this.vehicleId()! }));
    }
  }
}
