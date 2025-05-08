import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CahiernavbarComponent } from './cahiernavbar.component';

describe('CahiernavbarComponent', () => {
  let component: CahiernavbarComponent;
  let fixture: ComponentFixture<CahiernavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CahiernavbarComponent]
    });
    fixture = TestBed.createComponent(CahiernavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
