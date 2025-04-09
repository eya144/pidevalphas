import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementSuccessComponentComponent } from './paiement-success-component.component';

describe('PaiementSuccessComponentComponent', () => {
  let component: PaiementSuccessComponentComponent;
  let fixture: ComponentFixture<PaiementSuccessComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaiementSuccessComponentComponent]
    });
    fixture = TestBed.createComponent(PaiementSuccessComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
