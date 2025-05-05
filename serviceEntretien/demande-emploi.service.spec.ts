import { TestBed } from '@angular/core/testing';

import { DemandeEmploiService } from './demande-emploi.service';

describe('DemandeEmploiService', () => {
  let service: DemandeEmploiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeEmploiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
