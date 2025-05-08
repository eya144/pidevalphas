import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowinspectionsComponent } from './showinspections.component';

describe('ShowinspectionsComponent', () => {
  let component: ShowinspectionsComponent;
  let fixture: ComponentFixture<ShowinspectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowinspectionsComponent]
    });
    fixture = TestBed.createComponent(ShowinspectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
