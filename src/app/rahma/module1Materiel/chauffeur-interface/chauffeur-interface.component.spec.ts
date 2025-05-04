import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChauffeurInterfaceComponent } from './chauffeur-interface.component';

describe('ChauffeurInterfaceComponent', () => {
  let component: ChauffeurInterfaceComponent;
  let fixture: ComponentFixture<ChauffeurInterfaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChauffeurInterfaceComponent]
    });
    fixture = TestBed.createComponent(ChauffeurInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
