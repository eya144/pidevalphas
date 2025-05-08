import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonConformityEditComponent } from './non-conformity-edit.component';

describe('NonConformityEditComponent', () => {
  let component: NonConformityEditComponent;
  let fixture: ComponentFixture<NonConformityEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NonConformityEditComponent]
    });
    fixture = TestBed.createComponent(NonConformityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
