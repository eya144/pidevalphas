import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiqueadminComponent } from './statistiqueadmin.component';

describe('StatistiqueadminComponent', () => {
  let component: StatistiqueadminComponent;
  let fixture: ComponentFixture<StatistiqueadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatistiqueadminComponent]
    });
    fixture = TestBed.createComponent(StatistiqueadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
