import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationEntretienComponent } from './notification-entretien.component';

describe('NotificationEntretienComponent', () => {
  let component: NotificationEntretienComponent;
  let fixture: ComponentFixture<NotificationEntretienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationEntretienComponent]
    });
    fixture = TestBed.createComponent(NotificationEntretienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
