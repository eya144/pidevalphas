import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLogistiqueComponent } from './dashboard-logistique.component';

describe('DashboardLogistiqueComponent', () => {
  let component: DashboardLogistiqueComponent;
  let fixture: ComponentFixture<DashboardLogistiqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardLogistiqueComponent]
    });
    fixture = TestBed.createComponent(DashboardLogistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
