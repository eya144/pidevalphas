import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportDetailComponent } from './rapport-detail.component';

describe('RapportDetailComponent', () => {
  let component: RapportDetailComponent;
  let fixture: ComponentFixture<RapportDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RapportDetailComponent]
    });
    fixture = TestBed.createComponent(RapportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
