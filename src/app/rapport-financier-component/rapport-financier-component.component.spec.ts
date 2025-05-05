import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportFinancierComponentComponent } from './rapport-financier-component.component';

describe('RapportFinancierComponentComponent', () => {
  let component: RapportFinancierComponentComponent;
  let fixture: ComponentFixture<RapportFinancierComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RapportFinancierComponentComponent]
    });
    fixture = TestBed.createComponent(RapportFinancierComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
