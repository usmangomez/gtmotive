import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ManufacturersActions } from '../../store/manufacturers.actions';

@Component({
  selector: 'app-manufacturer-list',
  imports: [],
  templateUrl: './manufacturer-list.html',
  styleUrl: './manufacturer-list.scss',
})
export class ManufacturerList {
  private readonly store = inject(Store);

  ngOnInit() {
    this.store.dispatch(ManufacturersActions.loadManufacturers({page: 1}));
  }
}
