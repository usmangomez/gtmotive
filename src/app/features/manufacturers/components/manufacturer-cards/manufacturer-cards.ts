import { Component, input } from '@angular/core';
import { Manufacturer } from '../../models/manufacturer';

@Component({
  selector: 'app-manufacturer-cards',
  imports: [],
  templateUrl: './manufacturer-cards.html',
  styleUrl: './manufacturer-cards.scss',
})
export class ManufacturerCards {
  manufacturer = input<Manufacturer | null>(null)
}
