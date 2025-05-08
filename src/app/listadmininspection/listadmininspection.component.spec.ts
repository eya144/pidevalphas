import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadmininspectionComponent } from './listadmininspection.component';

describe('ListadmininspectionComponent', () => {
  let component: ListadmininspectionComponent;
  let fixture: ComponentFixture<ListadmininspectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadmininspectionComponent]
    });
    fixture = TestBed.createComponent(ListadmininspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
