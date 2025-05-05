import { TestBed } from '@angular/core/testing';

import { RapportFinancierService } from './rapport-financier.service';

describe('RapportFinancierService', () => {
  let service: RapportFinancierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RapportFinancierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
