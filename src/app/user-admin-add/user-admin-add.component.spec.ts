import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdminADDComponent } from './user-admin-add.component';

describe('UserAdminADDComponent', () => {
  let component: UserAdminADDComponent;
  let fixture: ComponentFixture<UserAdminADDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAdminADDComponent]
    });
    fixture = TestBed.createComponent(UserAdminADDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
