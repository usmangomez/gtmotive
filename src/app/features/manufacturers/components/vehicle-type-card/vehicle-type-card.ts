import { Component, input } from '@angular/core';
import { VehicleType } from '../../models/manufacturer';

@Component({
  selector: 'app-vehicle-type-card',
  imports: [],
  templateUrl: './vehicle-type-card.html',
  styleUrl: './vehicle-type-card.scss',
})
export class VehicleTypeCard {
  vehicleType = input<VehicleType | null>(null);
}
