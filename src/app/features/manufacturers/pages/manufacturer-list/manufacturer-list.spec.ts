import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerList } from './manufacturer-list';

describe('ManufacturerList', () => {
  let component: ManufacturerList;
  let fixture: ComponentFixture<ManufacturerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturerList],
    }).compileComponents();

    fixture = TestBed.createComponent(ManufacturerList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
