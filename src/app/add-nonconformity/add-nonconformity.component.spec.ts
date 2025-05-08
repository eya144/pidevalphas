import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNonconformityComponent } from './add-nonconformity.component';

describe('AddNonconformityComponent', () => {
  let component: AddNonconformityComponent;
  let fixture: ComponentFixture<AddNonconformityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNonconformityComponent]
    });
    fixture = TestBed.createComponent(AddNonconformityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
