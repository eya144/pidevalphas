import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDemandeByUserComponent } from './liste-demande-by-user.component';

describe('ListeDemandeByUserComponent', () => {
  let component: ListeDemandeByUserComponent;
  let fixture: ComponentFixture<ListeDemandeByUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeDemandeByUserComponent]
    });
    fixture = TestBed.createComponent(ListeDemandeByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
