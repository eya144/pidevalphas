import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateadmininspectionComponent } from './updateadmininspection.component';

describe('UpdateadmininspectionComponent', () => {
  let component: UpdateadmininspectionComponent;
  let fixture: ComponentFixture<UpdateadmininspectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateadmininspectionComponent]
    });
    fixture = TestBed.createComponent(UpdateadmininspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
