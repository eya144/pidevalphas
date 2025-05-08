import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardaComponent } from './dashboarda.component';

describe('DashboardaComponent', () => {
  let component: DashboardaComponent;
  let fixture: ComponentFixture<DashboardaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardaComponent]
    });
    fixture = TestBed.createComponent(DashboardaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
