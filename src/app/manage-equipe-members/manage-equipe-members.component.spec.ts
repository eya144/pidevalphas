import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEquipeMembersComponent } from './manage-equipe-members.component';

describe('ManageEquipeMembersComponent', () => {
  let component: ManageEquipeMembersComponent;
  let fixture: ComponentFixture<ManageEquipeMembersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageEquipeMembersComponent]
    });
    fixture = TestBed.createComponent(ManageEquipeMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
