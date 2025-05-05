import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFichedepaieComponent } from './add-fichedepaie.component';

describe('AddFichedepaieComponent', () => {
  let component: AddFichedepaieComponent;
  let fixture: ComponentFixture<AddFichedepaieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFichedepaieComponent]
    });
    fixture = TestBed.createComponent(AddFichedepaieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
