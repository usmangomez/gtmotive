import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ManufacturerDetail } from './manufacturer-detail';
import { initialManufacturersState } from '../../store/manufacturers.state';
import { RouterModule } from '@angular/router';

describe('ManufacturerDetail', () => {
  let component: ManufacturerDetail;
  let fixture: ComponentFixture<ManufacturerDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturerDetail, RouterModule.forRoot([])],
      providers: [
        provideMockStore({
          initialState: { manufacturers: initialManufacturersState },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ManufacturerDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
