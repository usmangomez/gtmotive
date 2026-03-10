import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleModelCard } from './vehicle-model-card';

describe('VehicleModelCard', () => {
  let component: VehicleModelCard;
  let fixture: ComponentFixture<VehicleModelCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleModelCard],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleModelCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
