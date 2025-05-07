import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportProjetComponent } from './rapport-projet.component';

describe('RapportProjetComponent', () => {
  let component: RapportProjetComponent;
  let fixture: ComponentFixture<RapportProjetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RapportProjetComponent]
    });
    fixture = TestBed.createComponent(RapportProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
