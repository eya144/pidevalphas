import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectVehiculeComponent } from './affect-vehicule.component';

describe('AffectVehiculeComponent', () => {
  let component: AffectVehiculeComponent;
  let fixture: ComponentFixture<AffectVehiculeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffectVehiculeComponent]
    });
    fixture = TestBed.createComponent(AffectVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
