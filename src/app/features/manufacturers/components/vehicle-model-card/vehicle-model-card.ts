import { Component, input } from '@angular/core';
import { ModelDetail, VehicleType } from '../../models/manufacturer';

@Component({
  selector: 'app-vehicle-model-card',
  imports: [],
  templateUrl: './vehicle-model-card.html',
  styleUrl: './vehicle-model-card.scss',
})
export class VehicleModelCard {
  vehicleModel = input<ModelDetail | null>(null);
}
