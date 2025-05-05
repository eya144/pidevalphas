import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDemandeDashComponent } from './liste-demande-dash.component';

describe('ListeDemandeDashComponent', () => {
  let component: ListeDemandeDashComponent;
  let fixture: ComponentFixture<ListeDemandeDashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeDemandeDashComponent]
    });
    fixture = TestBed.createComponent(ListeDemandeDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
