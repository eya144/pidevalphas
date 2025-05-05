import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichedepaieComptableComponent } from './fichedepaie-comptable.component';

describe('FichedepaieComptableComponent', () => {
  let component: FichedepaieComptableComponent;
  let fixture: ComponentFixture<FichedepaieComptableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FichedepaieComptableComponent]
    });
    fixture = TestBed.createComponent(FichedepaieComptableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
