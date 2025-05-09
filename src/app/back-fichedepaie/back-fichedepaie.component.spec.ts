import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackFichedepaieComponent } from './back-fichedepaie.component';

describe('BackFichedepaieComponent', () => {
  let component: BackFichedepaieComponent;
  let fixture: ComponentFixture<BackFichedepaieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackFichedepaieComponent]
    });
    fixture = TestBed.createComponent(BackFichedepaieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
