import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeCard } from './vehicle-type-card';

describe('VehicleTypeCard', () => {
  let component: VehicleTypeCard;
  let fixture: ComponentFixture<VehicleTypeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleTypeCard],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleTypeCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
