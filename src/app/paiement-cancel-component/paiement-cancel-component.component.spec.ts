import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementCancelComponentComponent } from './paiement-cancel-component.component';

describe('PaiementCancelComponentComponent', () => {
  let component: PaiementCancelComponentComponent;
  let fixture: ComponentFixture<PaiementCancelComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaiementCancelComponentComponent]
    });
    fixture = TestBed.createComponent(PaiementCancelComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
