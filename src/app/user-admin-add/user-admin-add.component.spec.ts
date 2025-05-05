import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdminAddComponent } from './user-admin-add.component';

describe('UserAdminAddComponent', () => {
  let component: UserAdminAddComponent;
  let fixture: ComponentFixture<UserAdminAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAdminAddComponent]
    });
    fixture = TestBed.createComponent(UserAdminAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
