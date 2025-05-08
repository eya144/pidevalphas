import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonConformityDetailComponent } from './non-conformity-detail.component';

describe('NonConformityDetailComponent', () => {
  let component: NonConformityDetailComponent;
  let fixture: ComponentFixture<NonConformityDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NonConformityDetailComponent]
    });
    fixture = TestBed.createComponent(NonConformityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
