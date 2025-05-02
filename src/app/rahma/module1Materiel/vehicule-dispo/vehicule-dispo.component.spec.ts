import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeDispoComponent } from './vehicule-dispo.component';

describe('VehiculeDispoComponent', () => {
  let component: VehiculeDispoComponent;
  let fixture: ComponentFixture<VehiculeDispoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehiculeDispoComponent]
    });
    fixture = TestBed.createComponent(VehiculeDispoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
