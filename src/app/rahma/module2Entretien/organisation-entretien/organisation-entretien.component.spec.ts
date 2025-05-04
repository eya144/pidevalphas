import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationEntretienComponent } from './organisation-entretien.component';

describe('OrganisationEntretienComponent', () => {
  let component: OrganisationEntretienComponent;
  let fixture: ComponentFixture<OrganisationEntretienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganisationEntretienComponent]
    });
    fixture = TestBed.createComponent(OrganisationEntretienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
