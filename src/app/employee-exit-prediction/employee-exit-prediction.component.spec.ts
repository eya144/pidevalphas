import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeExitPredictionComponent } from './employee-exit-prediction.component';

describe('EmployeeExitPredictionComponent', () => {
  let component: EmployeeExitPredictionComponent;
  let fixture: ComponentFixture<EmployeeExitPredictionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeExitPredictionComponent]
    });
    fixture = TestBed.createComponent(EmployeeExitPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
