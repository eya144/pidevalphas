import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportListComponent } from './rapport-list.component';

describe('RapportListComponent', () => {
  let component: RapportListComponent;
  let fixture: ComponentFixture<RapportListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RapportListComponent]
    });
    fixture = TestBed.createComponent(RapportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
