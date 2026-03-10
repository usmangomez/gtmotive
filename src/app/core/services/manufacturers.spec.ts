import { TestBed } from '@angular/core/testing';

import { Manufacturers } from './manufacturers';

describe('Manufacturers', () => {
  let service: Manufacturers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Manufacturers);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
