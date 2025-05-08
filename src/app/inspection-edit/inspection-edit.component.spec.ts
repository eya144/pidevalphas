import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionEditComponent } from './inspection-edit.component';

describe('InspectionEditComponent', () => {
  let component: InspectionEditComponent;
  let fixture: ComponentFixture<InspectionEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InspectionEditComponent]
    });
    fixture = TestBed.createComponent(InspectionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
