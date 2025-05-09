import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelabackComponent } from './helaback.component';

describe('HelabackComponent', () => {
  let component: HelabackComponent;
  let fixture: ComponentFixture<HelabackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelabackComponent]
    });
    fixture = TestBed.createComponent(HelabackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
