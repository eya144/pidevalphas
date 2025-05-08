import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonConformityListComponent } from './non-conformity-list.component';

describe('NonConformityListComponent', () => {
  let component: NonConformityListComponent;
  let fixture: ComponentFixture<NonConformityListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NonConformityListComponent]
    });
    fixture = TestBed.createComponent(NonConformityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
