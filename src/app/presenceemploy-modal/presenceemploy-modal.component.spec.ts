import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenceemployModalComponent } from './presenceemploy-modal.component';

describe('PresenceemployModalComponent', () => {
  let component: PresenceemployModalComponent;
  let fixture: ComponentFixture<PresenceemployModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresenceemployModalComponent]
    });
    fixture = TestBed.createComponent(PresenceemployModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
