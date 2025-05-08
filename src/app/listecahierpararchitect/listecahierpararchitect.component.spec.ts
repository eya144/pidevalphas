import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListecahierpararchitectComponent } from './listecahierpararchitect.component';

describe('ListecahierpararchitectComponent', () => {
  let component: ListecahierpararchitectComponent;
  let fixture: ComponentFixture<ListecahierpararchitectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListecahierpararchitectComponent]
    });
    fixture = TestBed.createComponent(ListecahierpararchitectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
