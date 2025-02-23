import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDemandeEmploiComponent } from './details-demande-emploi.component';

describe('DetailsDemandeEmploiComponent', () => {
  let component: DetailsDemandeEmploiComponent;
  let fixture: ComponentFixture<DetailsDemandeEmploiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsDemandeEmploiComponent]
    });
    fixture = TestBed.createComponent(DetailsDemandeEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
