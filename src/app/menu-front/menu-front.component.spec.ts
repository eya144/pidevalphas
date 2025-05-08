import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFrontComponent } from './menu-front.component';

describe('MenuFrontComponent', () => {
  let component: MenuFrontComponent;
  let fixture: ComponentFixture<MenuFrontComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuFrontComponent]
    });
    fixture = TestBed.createComponent(MenuFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
