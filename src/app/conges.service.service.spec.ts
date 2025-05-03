import { TestBed } from '@angular/core/testing';

import { CongesServiceService } from './conges.service';

describe('CongesServiceService', () => {
  let service: CongesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CongesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
