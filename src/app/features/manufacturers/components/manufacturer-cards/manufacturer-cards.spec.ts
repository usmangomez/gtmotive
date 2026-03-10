import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerCards } from './manufacturer-cards';

describe('ManufacturerCards', () => {
  let component: ManufacturerCards;
  let fixture: ComponentFixture<ManufacturerCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturerCards],
    }).compileComponents();

    fixture = TestBed.createComponent(ManufacturerCards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
