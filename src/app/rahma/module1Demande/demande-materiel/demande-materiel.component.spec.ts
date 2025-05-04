import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeMaterielComponent } from './demande-materiel.component';

describe('DemandeMaterielComponent', () => {
  let component: DemandeMaterielComponent;
  let fixture: ComponentFixture<DemandeMaterielComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandeMaterielComponent]
    });
    fixture = TestBed.createComponent(DemandeMaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
