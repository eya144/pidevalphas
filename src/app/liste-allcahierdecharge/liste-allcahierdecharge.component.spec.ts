import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAllcahierdechargeComponent } from './liste-allcahierdecharge.component';

describe('ListeAllcahierdechargeComponent', () => {
  let component: ListeAllcahierdechargeComponent;
  let fixture: ComponentFixture<ListeAllcahierdechargeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeAllcahierdechargeComponent]
    });
    fixture = TestBed.createComponent(ListeAllcahierdechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
