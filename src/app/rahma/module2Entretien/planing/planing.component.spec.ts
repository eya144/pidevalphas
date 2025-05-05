import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaningComponent } from './planing.component';

describe('PlaningComponent', () => {
  let component: PlaningComponent;
  let fixture: ComponentFixture<PlaningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaningComponent]
    });
    fixture = TestBed.createComponent(PlaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
