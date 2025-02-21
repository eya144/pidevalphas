import { TestBed } from '@angular/core/testing';

import { IdGeneratorServiceService } from './id-generator-service.service';

describe('IdGeneratorServiceService', () => {
  let service: IdGeneratorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdGeneratorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
