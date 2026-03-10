import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ManufacturerList } from './manufacturer-list';
import { initialManufacturersState } from '../../store/manufacturers.state';
import { RouterModule } from '@angular/router';

globalThis.IntersectionObserver = class {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor() {}
} as any;

describe('ManufacturerList', () => {
  let component: ManufacturerList;
  let fixture: ComponentFixture<ManufacturerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturerList, RouterModule.forRoot([])],
      providers: [
        provideMockStore({
          initialState: { manufacturers: initialManufacturersState },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ManufacturerList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
