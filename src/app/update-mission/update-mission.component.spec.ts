import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMissionComponent } from './update-mission.component';

describe('UpdateMissionComponent', () => {
  let component: UpdateMissionComponent;
  let fixture: ComponentFixture<UpdateMissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMissionComponent]
    });
    fixture = TestBed.createComponent(UpdateMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
