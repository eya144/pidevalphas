import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecahierComponent } from './updatecahier.component';

describe('UpdatecahierComponent', () => {
  let component: UpdatecahierComponent;
  let fixture: ComponentFixture<UpdatecahierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatecahierComponent]
    });
    fixture = TestBed.createComponent(UpdatecahierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
