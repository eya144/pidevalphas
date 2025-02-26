import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackFinanceComponent } from './back-finance.component';

describe('BackFinanceComponent', () => {
  let component: BackFinanceComponent;
  let fixture: ComponentFixture<BackFinanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackFinanceComponent]
    });
    fixture = TestBed.createComponent(BackFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
